// script.js

function showSection(section) {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('theorySection').style.display = 'none';
    document.getElementById('practiceSection').style.display = 'none';
    document.getElementById(section + 'Section').style.display = 'block';
}

function backToMainMenu() {
    document.getElementById('mainMenu').style.display = 'block';
    document.getElementById('theorySection').style.display = 'none';
    document.getElementById('practiceSection').style.display = 'none';
    document.getElementById('topicContent').style.display = 'none';
}

function showTopic(topic) {
    const topics = {
        battle_of_moscow: {
            title: 'Битва за Москву',
            text: 'Текст о битве за Москву...'
        },
        leningrad_blockade: {
            title: 'Блокада Ленинграда',
            text: 'Текст о блокаде Ленинграда...'
        },
        stalingrad_battle: {
            title: 'Сталинградская битва',
            text: 'Текст о Сталинградской битве...'
        },
        kursk_battle: {
            title: 'Курская битва',
            text: 'Текст о Курской битве...'
        }
    };

    document.getElementById('topicTitle').textContent = topics[topic].title;
    document.getElementById('topicText').textContent = topics[topic].text;
    document.getElementById('topicContent').style.display = 'block';
    document.getElementById('theorySection').style.display = 'none';
}

function backToTheory() {
    document.getElementById('theorySection').style.display = 'block';
    document.getElementById('topicContent').style.display = 'none';
}

function startQuiz(topic) {
    alert('Начинается тест по теме: ' + topic);
    // Здесь можно добавить логику для тестирования
}