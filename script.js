/* Общие стили для body */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f4f4f4;
    overflow-y: auto; /* Разрешаем прокрутку всей страницы */
    min-height: 100vh; /* Минимальная высота страницы */
}

/* Контейнер для текста и изображений */
.container {
    text-align: center;
    width: 80%;
    max-width: 1200px; /* Увеличил максимальную ширину для лучшего отображения */
    margin: 0 auto; /* Центрирование по горизонтали */
    /* Убираем overflow: hidden, чтобы не блокировать прокрутку */
}

/* Стили для кнопок */
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    background-color: #e0e0e0; /* Серый цвет по умолчанию */
    color: black;
}

button:hover {
    background-color: #d1d1d1; /* При наведении чуть темнее */
}

/* Стили для кнопок "Ответить" и "Начать тестирование" */
#submitBtn, #startTestBtn {
    padding: 15px 30px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    margin: 20px auto 0;
    display: block;
}

#submitBtn:hover, #startTestBtn:hover {
    background-color: #0056b3;
}

/* Стили для изображений */
#topicImage {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
}

.topic-image {
    max-width: 100%;
    height: auto;
    margin: 20px auto;
    display: block;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Стили для заголовка темы */
.topic-header {
    margin-top: 20px; /* Отступ сверху */
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #333;
}

/* Стили для контейнера текста */
#topicTextContainer {
    max-width: 800px; /* Максимальная ширина для удобства чтения */
    margin: 20px auto; /* Отступ сверху и снизу */
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    line-height: 1.6;
    text-align: justify;
    /* Убираем max-height и overflow-y, чтобы текст мог растягиваться */
}

/* Стили для абзацев текста */
#topicTextContainer p {
    margin-bottom: 15px;
    font-size: 16px;
}

/* Стили для гиперссылок */
#topicTextContainer a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

#topicTextContainer a:hover {
    text-decoration: underline;
}
