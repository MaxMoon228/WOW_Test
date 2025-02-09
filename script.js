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
    // Пример данных для теста
    quizQuestions = [
        { question: 'Какой год началась Битва за Москву?', options: ['1941', '1942', '1943', '1944'], correct: '1941' },
        { question: 'Кто командовал Красной Армией в Сталинградской битве?', options: ['Жуков', 'Маршалл', 'Эйзенхауэр', 'Роммель'], correct: 'Жуков' },
        // Добавьте больше вопросов...
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
