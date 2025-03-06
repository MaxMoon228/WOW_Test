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
    // Вопросы на разные темы
    const questionsByTopic = {
        battle_of_moscow: [
            { question: 'Когда началась Битва за Москву?', options: ['22 июня 1941 года', '30 сентября 1941 года', '7 ноября 1941 года', '5 декабря 1941 года'], correct: '30 сентября 1941 года' },
            { question: 'Как назывался немецкий план захвата Москвы?', options: ['Тайфун', 'Барбаросса', 'Багратион', 'Цитадель'], correct: 'Тайфун' },
            { question: 'Кто командовал Западным фронтом в период Битвы за Москву?', options: ['Г. К. Жуков', 'К. К. Рокоссовский', 'Л. А. Говоров', 'Ф. И. Толбухин'], correct: 'Г. К. Жуков' },
            { question: 'Какой город стал ключевым узлом обороны на подступах к Москве?', options: ['Тула', 'Смоленск', 'Брянск', 'Калуга'], correct: 'Тула' },
            { question: 'Когда началось советское контрнаступление под Москвой?', options: ['30 сентября 1941 года', '19 ноября 1942 года', '5 декабря 1941 года', '23 февраля 1942 года'], correct: '5 декабря 1941 года' },
            { question: 'Какой фактор особенно осложнил наступление немцев на Москву?', options: ['Весеннее половодье', 'Сильные морозы и распутица', 'Проблемы с боеприпасами', 'Нехватка личного состава'], correct: 'Сильные морозы и распутица' },
            { question: 'Какие армии СССР участвовали в контрнаступлении?', options: ['Западный, Калининский и Брянский фронты', 'Северо-Западный и Волховский', '1-й и 2-й Белорусские фронты', 'Южный и Юго-Западный фронты'], correct: 'Западный, Калининский и Брянский фронты' },
            { question: 'Какая немецкая армия несла основную нагрузку в операции «Тайфун»?', options: ['Группа армий «Центр»', 'Группа армий «Север»', 'Группа армий «Юг»', '6-я армия'], correct: 'Группа армий «Центр»' },
            { question: 'Какое событие 7 ноября 1941 года стало символом сопротивления Москвы?', options: ['Разгром немецких войск', 'Военный парад на Красной площади', 'Взятие Тулы', 'Введение карточной системы'], correct: 'Военный парад на Красной площади' },
            { question: 'Какой город удостоен звания «Город-герой» за подвиг в Битве за Москву?', options: ['Тула', 'Смоленск', 'Калуга', 'Брянск'], correct: 'Тула' },
            { question: 'Какой был основной результат Битвы за Москву?', options: ['Окружение немецких войск', 'Полный разгром Вермахта', 'Срыв плана молниеносной войны', 'Открытие второго фронта'], correct: 'Срыв плана молниеносной войны' },
            { question: 'Какая советская техника впервые широко использовалась под Москвой?', options: ['Танк Т-34', 'Самолёт ИЛ-2', 'Танк КВ-1', 'Катюша'], correct: 'Танк Т-34' },
            { question: 'Какова была максимальная дистанция, на которую немецкие войска приблизились к Москве?', options: ['30 км', '50 км', '10 км', '70 км'], correct: '50 км' },
            { question: 'Какое было главное стратегическое значение победы под Москвой?', options: ['Открытие второго фронта', 'Деморализация немецкой армии', 'Вступление США в войну', 'Окружение немецких войск'], correct: 'Деморализация немецкой армии' },
            { question: 'Когда завершилась Битва за Москву?', options: ['7 января 1942 года', '5 мая 1942 года', '9 мая 1945 года', '23 февраля 1942 года'], correct: '7 января 1942 года' }
        ],
        kursk_battle: [
            { question: 'Какое главное танковое сражение произошло во время Курской битвы?', options: ['У Прохоровки', 'У Харькова', 'У Брянска', 'У Тулы'], correct: 'У Прохоровки' },
            { question: 'Как назывался немецкий план наступления в Курской битве?', options: ['Цитадель', 'Тайфун', 'Искра', 'Уран'], correct: 'Цитадель' },
            { question: 'В каком месяце началась Курская битва?', options: ['Май', 'Июнь', 'Июль', 'Август'], correct: 'Июль' },
            { question: 'Какой фронт возглавлял К. К. Рокоссовский в Курской битве?', options: ['Воронежский', 'Брянский', 'Центральный', 'Западный'], correct: 'Центральный' },
            { question: 'Какие два фронта участвовали в оборонительной фазе Курской битвы?', options: ['Центральный и Воронежский', 'Ленинградский и Карельский', 'Западный и Брянский', 'Степной и Белорусский'], correct: 'Центральный и Воронежский' },
            { question: 'Какое немецкое подразделение активно использовало танки «Тигр» и «Пантера»?', options: ['2-я танковая армия', '4-я танковая армия', '9-я армия', '6-я армия'], correct: '4-я танковая армия' },
            { question: 'Какое оружие стало символом Курской битвы?', options: ['Катюша', 'Танк Т-34', 'Пистолет ТТ', 'Автомат ППШ'], correct: 'Танк Т-34' },
            { question: 'Когда завершилась Курская битва?', options: ['23 августа 1943 года', '9 мая 1945 года', '2 февраля 1943 года', '5 июля 1943 года'], correct: '23 августа 1943 года' },
            { question: 'Какой фронт возглавлял Н. Ф. Ватутин?', options: ['Центральный', 'Воронежский', 'Ленинградский', 'Брянский'], correct: 'Воронежский' },
            { question: 'Какой город был освобождён в ходе Курской битвы?', options: ['Орёл', 'Киев', 'Минск', 'Ленинград'], correct: 'Орёл' },
            { question: 'Как назывался этап контрнаступления советских войск после Курской битвы?', options: ['Операция «Багратион»', 'Операция «Полководец Румянцев»', 'Операция «Искра»', 'Операция «Тайфун»'], correct: 'Операция «Полководец Румянцев»' },
            { question: 'Какие силы СССР противостояли Вермахту?', options: ['Центральный и Воронежский фронты', 'Ленинградский и Карельский', 'Западный и Белорусский', 'Степной и Южный'], correct: 'Центральный и Воронежский фронты' },
            { question: 'Как назывался этап контрнаступления советских войск после Курской битвы?', options: ['Операция «Багратион»', 'Операция «Полководец Румянцев»', 'Операция «Искра»', 'Операция «Тайфун»'], correct: 'Операция «Полководец Румянцев»' },
            { question: 'Какие силы СССР противостояли Вермахту?', options: ['Центральный и Воронежский фронты', 'Ленинградский и Карельский', 'Западный и Белорусский', 'Степной и Южный'], correct: 'Центральный и Воронежский фронты' },
            { question: 'Какое стратегическое значение имела Курская битва?', options: ['Окончательный переход инициативы к СССР', 'Срыв блокады Ленинграда', 'Разгром немецкой группы армий «Север»', 'Захват Берлина'], correct: 'Окончательный переход инициативы к СССР' },
            { question: 'Как назывался южный участок Курской дуги, где шли особенно ожесточенные бои?', options: ['Белгород', 'Смоленск', 'Тула', 'Вязьма'], correct: 'Белгород' },
            { question: 'Какие страны были союзниками Германии в Курской битве?', options: ['Италия и Венгрия', 'Венгрия и Румыния', 'Франция и Финляндия', 'Болгария и Япония'], correct: 'Венгрия и Румыния' }
        ],
        stalingrad_battle: [
            { question: 'Когда началась Сталинградская битва?', options: ['17 июля 1942 года', '19 ноября 1942 года', '2 февраля 1943 года', '22 июня 1941 года'], correct: '17 июля 1942 года' },
            { question: 'Как назывался немецкий план наступления на южном направлении?', options: ['Цитадель', 'Барбаросса', 'Тайфун', 'Блау'], correct: 'Блау' },
            { question: 'Какая немецкая армия была окружена в Сталинграде?', options: ['4-я танковая', '6-я армия', '9-я армия', '1-я горная'], correct: '6-я армия' },
            { question: 'Как называлась советская операция по окружению немцев?', options: ['Багратион', 'Искра', 'Уран', 'Кольцо'], correct: 'Уран' },
            { question: 'Кто командовал 6-й армией Вермахта, попавшей в окружение?', options: ['Эрвин Роммель', 'Фридрих Паулюс', 'Гейнц Гудериан', 'Вальтер Модель'], correct: 'Фридрих Паулюс' },
            { question: 'Какая операция завершила разгром немецких войск в Сталинграде?', options: ['Искра', 'Кольцо', 'Цитадель', 'Барбаросса'], correct: 'Кольцо' },
            { question: 'Когда капитулировали остатки 6-й армии в Сталинграде?', options: ['19 ноября 1942 года', '5 декабря 1941 года', '2 февраля 1943 года', '23 августа 1942 года'], correct: '2 февраля 1943 года' },
            { question: 'Какие армии СССР участвовали в Сталинградской битве?', options: ['62-я и 64-я', '1-я и 2-я гвардейские', '8-я и 10-я танковые', '16-я и 17-я воздушные'], correct: '62-я и 64-я' },
            { question: 'Как называлась стратегическая высота в центре Сталинградской битвы?', options: ['Сапун-гора', 'Пулковские высоты', 'Мамаев курган', 'Холм Славы'], correct: 'Мамаев курган' },
            { question: 'Какое соединение особенно отличилось при обороне города?', options: ['316-я стрелковая дивизия', '13-я гвардейская дивизия', '11-я танковая бригада', '50-й кавалерийский корпус'], correct: '13-я гвардейская дивизия' },
            { question: 'Какая страна-союзник Германии понесла большие потери под Сталинградом?', options: ['Италия', 'Румыния', 'Финляндия', 'Франция'], correct: 'Румыния' },
            { question: 'Какой завод в Сталинграде стал ареной ожесточённых боев?', options: ['ЗИС', 'Красный Октябрь', 'ГАЗ', 'Путиловский завод'], correct: 'Красный Октябрь' },
            { question: 'Какое значение имела победа в Сталинградской битве?', options: ['Разгром главных сил Вермахта на юге', 'Открытие второго фронта', 'Полный переход к обороне', 'Начало войны на Тихом океане'], correct: 'Разгром главных сил Вермахта на юге' },
            { question: 'Какое сообщение передал Гитлер Паулюсу перед его капитуляцией?', options: ['Держаться до последнего', 'Выходить из окружения', 'Начать переговоры', 'Сдавать город'], correct: 'Держаться до последнего' },
            { question: 'Какое звание было присвоено Ф. Паулюсу перед капитуляцией?', options: ['Генерал-лейтенант', 'Фельдмаршал', 'Генерал-полковник', 'Майор'], correct: 'Фельдмаршал' }
        ]
    };

    // Выбираем вопросы для текущей темы
    quizQuestions = questionsByTopic[topic];
    shuffleArray(quizQuestions); // Перемешать вопросы
    currentQuiz = topic;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('quizSection').style.display = 'block';
    document.getElementById('practiceSection').style.display = 'none';

    // Начинаем тест сразу, без кнопки "Начать тестирование"
    showNextQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let selectedOption = null;

function showNextQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('quizQuestion').textContent = question.question;
    document.getElementById('quizCounter').textContent = `Вопрос ${currentQuestionIndex + 1}/${quizQuestions.length}`;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = ''; // Очистить предыдущие варианты ответов

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn'); // Добавляем класс для стилей
        btn.dataset.index = index; // Сохраняем индекс варианта ответа
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });

    // Сбрасываем выбранный ответ
    selectedOption = null;

    // Скрываем кнопку "Ответить"
    document.getElementById('submitBtn').style.display = 'none';
}

function selectOption(selectedIndex, button) {
    if (selectedOption !== null) {
        selectedOption.style.backgroundColor = '#e0e0e0'; // Возвращаем стандартный серый цвет
    }

    selectedOption = button; // Сохраняем выбранный вариант
    selectedOption.style.backgroundColor = '#d1d1d1'; // Подсвечиваем выбранный ответ серым цветом

    // Показываем кнопку "Ответить", если выбран ответ
    if (selectedOption !== null) {
        document.getElementById('submitBtn').style.display = 'block';
    }
}

function submitAnswer() {
    if (selectedOption === null) return; // Если не выбран ответ, ничего не делаем

    const question = quizQuestions[currentQuestionIndex];
    if (question.options[selectedOption.dataset.index] === question.correct) {
        score++;
    }

    currentQuestionIndex++;
    showNextQuestion();
}

function showResults() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultsMessage').textContent = `Ваш результат: ${score}/${quizQuestions.length} правильных ответов`;
}

function restartQuiz() {
    // Скрываем результаты и показываем главный экран теста
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';

    // Обнуляем переменные
    currentQuestionIndex = 0;
    score = 0;
    shuffleArray(quizQuestions); // Перемешиваем вопросы заново

    // Начинаем тест сразу, без кнопки "Начать тестирование"
    showNextQuestion();
}

function goToTheory() {
    showSection('theory');
}

function backToMainMenu() {
    // Скрываем все секции и показываем главное меню
    document.getElementById('mainMenu').style.display = 'block';
    document.getElementById('theorySection').style.display = 'none';
    document.getElementById('practiceSection').style.display = 'none';
    document.getElementById('topicContent').style.display = 'none';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
}
