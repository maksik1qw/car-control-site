// app.js

// Инициализация. Эту функцию вызывает Telegram, когда загрузится страница.
Telegram.WebApp.ready();

// Получаем данные о пользователе из Telegram
const user = Telegram.WebApp.initDataUnsafe?.user;

// Если пользователь есть, покажем его имя
if (user) {
    document.getElementById('user-name').textContent = user.first_name;
}

// Пример функции отправки данных обратно боту
function sendDataToBot() {
    // Закрываем Mini App, передавая данные
    Telegram.WebApp.sendData("Данные, которые я хочу отправить боту!");
    // После отправки данных Mini App закроется
}

// Можно изменить внешний вид интерфейса Telegram
Telegram.WebApp.setHeaderColor('#6C47FF'); // Цвет заголовка
Telegram.WebApp.expand(); // Развернуть приложение на весь экран
