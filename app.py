from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select
from datetime import datetime, timedelta
import random
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kremlebot.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Инициализация базы данных
db = SQLAlchemy(app)

# Конфигурация тестов
TESTS_CONFIG = {
    'Битва за Москву': 'БитвазаМосквутест.txt',
    'Блокада Ленинграда': 'БлокадаЛенинградатест.txt',
    'Сталинградская Битва': 'Сталинградскаябитватест.txt',
    'Курская Битва': 'Курскаябитватест.txt'
}

THEORY_FILES = {
    'Битва за Москву': 'БИТВАЗАМОСКВУ.txt',
    'Блокада Ленинграда': 'ОБОРОНАЛЕНИНГРАДА.txt',
    'Сталинградская Битва': 'СТАЛИНГРАДСКАЯБИТВА.txt',
    'Курская Битва': 'КУРСКАЯБИТВА.txt'
}

# Проверка существования файлов при запуске
for topic, filename in list(TESTS_CONFIG.items()):
    filepath = os.path.join('tests', filename)
    if not os.path.exists(filepath):
        print(f"Warning: Test file not found - {filepath}. Removing topic {topic}.")
        TESTS_CONFIG.pop(topic)

for topic, filename in list(THEORY_FILES.items()):
    filepath = os.path.join('theory', filename)
    if not os.path.exists(filepath):
        print(f"Warning: Theory file not found - {filepath}. Removing topic {topic}.")
        THEORY_FILES.pop(topic)

# Модели
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), nullable=False)
    test_results = db.relationship('TestResult', back_populates='user')


class TestResult(db.Model):
    __tablename__ = 'test_results'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    user = db.relationship('User', back_populates='test_results')


# Создание таблиц
with app.app_context():
    db.create_all()


# Вспомогательные функции
def load_questions(topic):
    """Загрузка вопросов из файла с альтернативным форматом"""
    if topic not in TESTS_CONFIG:
        print(f"Topic {topic} not found in configuration")
        return []

    filename = TESTS_CONFIG[topic]
    filepath = os.path.join('tests', filename)

    if not os.path.exists(filepath):
        print(f"Test file not found: {filepath}")
        return []

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = [line.strip() for line in f.readlines() if line.strip()]

        questions = []
        current_question = None
        question_number = 1

        for line in lines:
            # Если строка начинается с варианта ответа (А), Б) и т.д.)
            if line.startswith(('А)', 'Б)', 'В)', 'Г)', 'а)', 'б)', 'в)', 'г)')):
                if current_question is None:
                    # Создаем вопрос с автоматическим текстом, если нет явного вопроса
                    current_question = {
                        'text': f"Вопрос {question_number}",
                        'options': [],
                        'correct': None
                    }
                    question_number += 1

                # Обработка варианта ответа
                option_text = line[2:].strip()
                is_correct = '✔️' in option_text or '(верный ответ)' in option_text.lower()

                if is_correct:
                    option_text = option_text.replace('✔️', '').replace('(верный ответ)', '').strip()
                    current_question['correct'] = len(current_question['options'])

                current_question['options'].append(option_text)

                # Если это последний вариант в вопросе (Г))
                if line.startswith(('Г)', 'г)')):
                    if len(current_question['options']) >= 2:
                        questions.append(current_question)
                    current_question = None

            # Если строка не является вариантом ответа и не пустая, считаем ее вопросом
            elif current_question is None:
                current_question = {
                    'text': line,
                    'options': [],
                    'correct': None
                }

        # Проверяем последний вопрос
        if current_question and len(current_question['options']) >= 2:
            questions.append(current_question)

        if not questions:
            print(f"No valid questions found in {filepath}")
            return []

        # Перемешиваем вопросы
        random.shuffle(questions)
        return questions

    except Exception as e:
        print(f"Error loading questions from {filepath}: {str(e)}")
        return []
# Роуты
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/history')
def history():
    return render_template('history.html')


@app.route('/history/<topic>')
def history_item(topic):
    try:
        filename = THEORY_FILES[topic]
        with open(f'theory/{filename}', 'r', encoding='utf-8') as f:
            content = f.read()
        return render_template('history_item.html', topic=topic, content=content)
    except Exception as e:
        print(f"Error loading history item: {e}")
        return redirect(url_for('history'))


@app.route('/tests')
def tests():
    return render_template('tests.html')


@app.route('/tests/<topic>', methods=['GET', 'POST'])
def test_confirmation(topic):
    if topic not in TESTS_CONFIG:
        return redirect(url_for('tests'))

    if request.method == 'POST':
        questions = load_questions(topic)
        if not questions:
            return render_template('test_confirmation.html',
                                   topic=topic,
                                   error="Не удалось загрузить вопросы для теста")

        session['test_data'] = {
            'topic': topic,
            'questions': questions,
            'current_question': 0,
            'answers': [],
            'start_time': datetime.now().isoformat(),
            'time_limit': 5 * 60  # 5 минут
        }
        return redirect(url_for('show_question'))

    return render_template('test_confirmation.html', topic=topic)


@app.route('/test/question', methods=['GET', 'POST'])
def show_question():
    if 'test_data' not in session:
        return redirect(url_for('tests'))

    test_data = session['test_data']

    # Проверка наличия вопросов
    if not test_data.get('questions'):
        print("No questions loaded - redirecting to tests")
        return redirect(url_for('tests'))

    # Обработка ответа
    if request.method == 'POST':
        try:
            answer = int(request.form.get('answer', -1))
            test_data['answers'].append(answer)
            test_data['current_question'] += 1
            session['test_data'] = test_data
            session.modified = True
        except (ValueError, KeyError) as e:
            print(f"Error processing answer: {e}")

    # Проверка завершения теста
    if test_data['current_question'] >= len(test_data['questions']):
        return redirect(url_for('test_result'))

    # Получение текущего вопроса
    try:
        question = test_data['questions'][test_data['current_question']]
    except IndexError:
        print(f"Question index out of range: {test_data['current_question']}")
        return redirect(url_for('test_result'))

    # Проверка времени
    elapsed = (datetime.now() - datetime.fromisoformat(test_data['start_time'])).total_seconds()
    remaining_time = max(0, test_data['time_limit'] - elapsed)

    return render_template('test_question.html',
                           question=question,
                           current=test_data['current_question'] + 1,
                           total=len(test_data['questions']),
                           remaining_time=remaining_time)


@app.route('/test/result')
def test_result():
    if 'test_data' not in session:
        return redirect(url_for('tests'))

    test_data = session['test_data']

    # Подсчет правильных ответов
    correct = sum(1 for i, answer in enumerate(test_data['answers'])
                  if answer == test_data['questions'][i]['correct'])

    # Расчет времени
    elapsed = (datetime.now() - datetime.fromisoformat(test_data['start_time'])).total_seconds()
    elapsed_time = str(timedelta(seconds=int(elapsed)))[2:]  # MM:SS

    # Сохранение результатов
    is_new_record = False
    if 'user_id' in session:
        user = db.session.get(User, session['user_id'])
        if user:
            stmt = select(TestResult).where(
                (TestResult.user_id == user.id) &
                (TestResult.topic == test_data['topic'])
            )
            existing_result = db.session.execute(stmt).scalar_one_or_none()

            if existing_result:
                if correct > existing_result.score:
                    existing_result.score = correct
                    existing_result.time = elapsed_time
                    is_new_record = True
            else:
                new_result = TestResult(
                    user_id=user.id,
                    topic=test_data['topic'],
                    score=correct,
                    time=elapsed_time
                )
                db.session.add(new_result)
                is_new_record = True

            db.session.commit()

    # Очистка сессии
    session.pop('test_data', None)

    return render_template('test_result.html',
                           topic=test_data['topic'],
                           correct=correct,
                           total=len(test_data['questions']),
                           elapsed_time=elapsed_time,
                           is_new_record=is_new_record)


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if 'user_id' not in session:
        if request.method == 'POST':
            username = request.form.get('username', '')[:10]
            if username:
                with db.session.begin():
                    user = User(username=username)
                    db.session.add(user)
                    db.session.commit()
                session['user_id'] = user.id
                return redirect(url_for('profile'))
            return render_template('profile_setup.html')
        return render_template('profile_setup.html')

    user = db.session.get(User, session['user_id'])

    # Получение всех результатов пользователя
    stmt = select(TestResult).where(TestResult.user_id == user.id)
    user_results = db.session.execute(stmt).scalars().all()

    # Создание структуры для отображения
    results_dict = {result.topic: result for result in user_results}
    all_topics = TESTS_CONFIG.keys()

    results = []
    for topic in all_topics:
        if topic in results_dict:
            results.append({
                'topic': topic,
                'score': results_dict[topic].score,
                'time': results_dict[topic].time
            })
        else:
            results.append({
                'topic': topic,
                'score': 0,
                'time': '0:00'
            })

    # Заглушка для достижений
    achievements = [
        {'title': 'Первый тест', 'description': 'Пройдите любой тест', 'unlocked': any(r['score'] > 0 for r in results),
         'icon': '🏆'},
        {'title': 'Отличник', 'description': 'Наберите 15/15 в любом тесте',
         'unlocked': any(r['score'] == 15 for r in results), 'icon': '⭐'},
        {'title': 'Историк', 'description': 'Пройдите все тесты', 'unlocked': all(r['score'] > 0 for r in results),
         'icon': '📚'},
        {'title': 'Скоростник', 'description': 'Пройдите тест быстрее 2 минут', 'unlocked': False, 'icon': '⏱️'},
        {'title': 'Мастер', 'description': 'Наберите 15/15 во всех тестах',
         'unlocked': all(r['score'] == 15 for r in results), 'icon': '👑'}
    ]

    return render_template('profile.html',
                           username=user.username,
                           results=results,
                           achievements=achievements)


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)