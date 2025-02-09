// script.js

// Данные для раздела "Теория"
const topics = {
    battle_of_moscow: {
        title: 'Битва за Москву',
        text: 'Текст о битве за Москву...',
        image: 'https://example.com/battle_of_moscow.jpg'
    },
    leningrad_blockade: {
        title: 'Блокада Ленинграда',
        text: 'Текст о блокаде Ленинграда...',
        image: 'https://example.com/leningrad_blockade.jpg'
    },
    stalingrad_battle: {
        title: 'Сталинградская битва',
        text: 'Текст о Сталинградской битве...',
        image: 'https://example.com/stalingrad_battle.jpg'
    },
    kursk_battle: {
        title: 'Курская битва',
        text: 'Текст о Курской битве...',
        image: 'https://example.com/kursk_battle.jpg'
    }
};

// Функции для управления интерфейсом
function showSection(section) {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('theorySection').style.display = 'none';
    document.getElementById('practiceSection').style.display = 'none';
    document.getElementById('topicContent').style.display = 'none';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById(section + 'Section').style.display = 'block';
}

function backToMainMenu() {
    showSection('main');
}

function showTopic(topic) {
    const topicData = topics[topic];
    document.getElementById('topicTitle').textContent = topicData.title;
    document.getElementById('topicText').textContent = topicData.text;
    document.getElementById('topicImage').src = topicData.image;
    document.getElementById('topicContent').style.display = 'block';
    document.getElementById('theorySection').style.display = 'none';
}

function backToTheory() {
    showSection('theory');
}

// Тестирование
let currentQuiz = null;
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(topic) {
    // Вопросы на тему "Блокада Ленинграда"
    quizQuestions = [
        { question: 'Когда началась блокада Ленинграда?', options: ['8 сентября 1941 года', '22 июня 1941 года', '18 января 1943 года', '9 мая 1945 года'], correct: '8 сентября 1941 года' },
        { question: 'Какова продолжительность блокады Ленинграда?', options: ['872 дня', '1000 дней', '600 дней', '500 дней'], correct: '872 дня' },
        { question: 'Как назывался маршрут, по которому доставлялись продукты в блокадный город?', options: ['Дорога Победы', 'Дорога Надежды', 'Дорога жизни', 'Дорога фронта'], correct: 'Дорога жизни' },
        { question: 'Через какое озеро проходила Дорога жизни?', options: ['Байкал', 'Онего', 'Ладожское', 'Чудское'], correct: 'Ладожское' },
        { question: 'Какова минимальная норма выдачи хлеба на человека в блокадном Ленинграде зимой 1941 года?', options: ['500 граммов', '300 граммов', '250 граммов', '125 граммов'], correct: '125 граммов' },
        { question: 'Когда была окончательно снята блокада Ленинграда?', options: ['9 мая 1945 года', '27 января 1944 года', '18 января 1943 года', '1 февраля 1944 года'], correct: '27 января 1944 года' },
        { question: 'Как называлась операция по прорыву блокады Ленинграда в январе 1943 года?', options: ['Багратион', 'Искра', 'Уран', 'Цитадель'], correct: 'Искра' },
        { question: 'Как назывался знаменитый дневник девочки, ставший символом блокады?', options: ['Дневник Тани Савичевой', 'Дневник Анны Франк', 'Дневник Марины Цветаевой', 'Дневник Ольги Берггольц'], correct: 'Дневник Тани Савичевой' },
        { question: 'Кто был командующим Ленинградским фронтом в период блокады?', options: ['Г. К. Жуков', 'Л. А. Говоров', 'И. С. Конев', 'К. К. Рокоссовский'], correct: 'Л. А. Говоров' },
        { question: 'Какие немецкие войска осуществляли блокаду Ленинграда?', options: ['Группа армий «Север»', 'Группа армий «Центр»', 'Группа армий «Юг»', 'Вермахт-Запад'], correct: 'Группа армий «Север»' },
        { question: 'Какой символ стал знаком памяти о жертвах блокады Ленинграда?', options: ['Красная звезда', 'Черный хлеб', 'Ленточка цвета блокады', 'Синий платок'], correct: 'Черный хлеб' },
        { question: 'Как назывался мемориальный комплекс, посвященный блокаде Ленинграда?', options: ['Пискарёвское кладбище', 'Холм Славы', 'Мамаев курган', 'Брестская крепость'], correct: 'Пискарёвское кладбище' },
        { question: 'Какой композитор создал знаменитую «Седьмую симфонию», известную как «Ленинградская»?', options: ['Сергей Рахманинов', 'Дмитрий Шостакович', 'Игорь Стравинский', 'Сергей Прокофьев'], correct: 'Дмитрий Шостакович' },
        { question: 'Какой лозунг был популярен среди жителей блокадного Ленинграда?', options: ['Всё для фронта, всё для победы!', 'Работай, Ленинград!', 'Ни шагу назад!', 'За Родину, за Сталина!'], correct: 'Работай, Ленинград!' },
        { question: 'Какая улица в Ленинграде стала символом блокады, где был размещен знаменитый плакат об артобстреле?', options: ['Невский проспект', 'Литейный проспект', 'Московский проспект', 'Каменноостровский проспект'], correct: 'Невский проспект' }
    ];

    shuffleArray(quizQuestions); // Перемешать вопросы
    currentQuiz = topic;
    currentQuestionIndex = 0;
    score = 0;

    showNextQuestion();
    document.getElementById('quizSection').style.display = 'block';
    document.getElementById('practiceSection').style.display = 'none';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showNextQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('quizQuestion').textContent = question.question;
    document.getElementById('quizCounter').textContent = `Вопрос ${currentQuestionIndex + 1}/${quizQuestions.length}`;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('submitBtn').style.display = 'none';
}

function selectOption(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    if (question.options[selectedIndex] === question.correct) {
        score++;
    }

    document.getElementById('submitBtn').style.display = 'block';
}

function submitAnswer() {
    currentQuestionIndex++;
    showNextQuestion();
}

function showResults() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsMessage').textContent = `Ваш результат: ${score}/${quizQuestions.length} правильных ответов`;
}

function restartQuiz() {
    startQuiz(currentQuiz);
}

function goToTheory() {
    showSection('theory');
}
