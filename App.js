// Инициализация Telegram Web App
Telegram.WebApp.ready();
Telegram.WebApp.expand();
Telegram.WebApp.setHeaderColor('#2E2E2E');
Telegram.WebApp.setBackgroundColor('#f0f0f0');

// Получаем информацию о пользователе
const user = Telegram.WebApp.initDataUnsafe?.user;
const initData = Telegram.WebApp.initData;

// Обновляем приветствие если есть данные пользователя
if (user) {
    const welcomeElement = document.querySelector('.header h1');
    if (welcomeElement) {
        welcomeElement.innerHTML = `🚗 Добро пожаловать, ${user.first_name}!`;
    }
}

// Обновляем timestamp
function updateTimestamp() {
    const now = new Date();
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.textContent = `Последнее обновление: ${now.toLocaleString('ru-RU')}`;
    }
}

// Функция отправки команды
function sendCommand(command) {
    const commandNames = {
        'start': '🚀 Запуск двигателя',
        'open': '🔓 Открыть замок',
        'close': '🔒 Закрыть замок',
        'status': '📊 Сигнал статуса',
        'trunk': '🚗 Открыть багажник',
        'sensor': '🌡️ Температура и влажность'
    };

    const commandName = commandNames[command] || command;
    addLogEntry(`📤 Отправка команды: ${commandName}`);
    
    // Показываем анимацию загрузки
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    // Имитация отправки команды (в реальном приложении здесь будет API запрос)
    setTimeout(() => {
        buttons.forEach(btn => btn.disabled = false);
        addLogEntry(`✅ Команда "${commandName}" выполнена успешно`);
        updateCarStatus(command);
        updateTimestamp();
        
        // В реальном приложении здесь будет отправка данных боту
        // Telegram.WebApp.sendData(JSON.stringify({command: command}));
        
    }, getCommandDelay(command));
}

// Задержки для разных команд
function getCommandDelay(command) {
    const delays = {
        'start': 700,
        'open': 300,
        'close': 300,
        'status': 300,
        'trunk': 700,
        'sensor': 100
    };
    return delays[command] || 500;
}

// Обновление статуса автомобиля
function updateCarStatus(command) {
    const statusText = document.querySelector('.status-text');
    const sensors = document.querySelectorAll('.sensor');
    
    switch(command) {
        case 'start':
            statusText.textContent = 'Двигатель запущен';
            statusText.style.color = '#00C851';
            sensors[1].textContent = '🚗 Двигатель: запущен';
            break;
        case 'open':
            sensors[0].textContent = '🔓 Замки: открыты';
            break;
        case 'close':
            sensors[0].textContent = '🔒 Замки: закрыты';
            break;
        case 'trunk':
            addLogEntry('🚗 Багажник открыт');
            break;
        case 'sensor':
            // Генерация случайных данных датчиков
            const temp = Math.floor(Math.random() * 40) - 10;
            const humidity = Math.floor(Math.random() * 50) + 30;
            sensors[2].textContent = `🌡️ Температура: ${temp}°C, Влажность: ${humidity}%`;
            break;
    }
}

// Добавление записи в лог
function addLogEntry(message) {
    const logContainer = document.getElementById('log-container');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = message;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Обработка данных от Telegram
Telegram.WebApp.onEvent('webAppDataReceived', (event) => {
    console.log('Data received:', event);
});

// Закрытие приложения
function closeApp() {
    Telegram.WebApp.close();
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    addLogEntry('🟢 Система запущена и готова к работе');
    
    // Обновляем температуру каждые 30 секунд
    setInterval(() => {
        if (Math.random() > 0.7) { // Случайное обновление
            sendCommand('sensor');
        }
    }, 30000);
});

// Обработчики для кнопок (для дополнительной функциональности)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('control-btn')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});
