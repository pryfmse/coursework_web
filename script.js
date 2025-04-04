// Глобальные переменные состояния
let name = "гость";
let sign = false;
let registered = {}; // Хранилище зарегистрированных пользователей

// Элементы интерфейса
const username = document.getElementById("name");
username.textContent = name;
const div = document.querySelector(".list");
const div_habits = document.querySelector(".list_habits");

// Функция выхода из системы
function logout() {
    window.location.href = "enter.html";
}

// Обработчик входа
function Sign_in(event) {
    event.preventDefault();
    
    const login = document.getElementById("email");
    const password = document.getElementById("password");
    
    if (login.value in registered && password.value === registered[login.value][0]) {
        sign = true;
        window.location.href = "index.html";
    } else {
        alert("Неверный логин или пароль");
    }
    
    login.value = "";
    password.value = "";
}

// Обработчик регистрации
function Sign_up(event) {
    event.preventDefault();

    const username = document.getElementById("username_reg");
    const login = document.getElementById("email_reg");
    const password = document.getElementById("password_reg");

    if (login.value in registered) {
        alert("Пользователь уже зарегистрирован");
    } else {
        registered[login.value] = [password.value, username.value];
        alert("Успешная регистрация");
    }
    
    username.value = "";
    login.value = "";
    password.value = "";
}

// Переход на страницу о планировании
function go() {
    window.location.href = "about_planning.html";
}

// Удаление элемента
const Delete = (event) => {
    event.target.parentNode.remove();
}

// Отметка выполнения привычки
const Notice = (event) => {
    const habitBlock = event.target.closest('.block');
    const daysContainer = habitBlock.querySelectorAll('.gor')[1];
    const todayElement = daysContainer.querySelector('.h4-now');
    todayElement.classList.replace('h4-now', 'h4-green');
}

// Добавление новой задачи
function add_task() {
    const task = prompt("Введите задачу:");
    if (!task) return;
    
    const date = prompt("Введите дату (DD-MM-YYYY):");
    if (!date) return;

    if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
        alert("Некорректная дата! Используйте формат DD-MM-YYYY");
        return;
    }

    const newTask = document.createElement("div");
    newTask.innerHTML += `
        <div class="block">
            <h3>${task}</h3>
            <p>${date}</p>
            <button onclick="Delete(event)">удалить</button>
        </div>`;
    div.append(newTask);
}

// Работа с датами
const date = new Date();
const hours = date.getHours();
const dayIndex = date.getDay();
const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const dayName = daysOfWeek[dayIndex]
document.getElementById("day").textContent = dayName;

// Добавление новой привычки
function add_habit() {
    const task = prompt("Введите привычку:");
    if (!task) return;

    const newTask = document.createElement("div");
    let flag = false;
    const a = [];
    
    // Формирование классов для дней недели
    const reorderedDays = [...daysOfWeek.slice(1), ...daysOfWeek.slice(0, 1)];
    for (const day of reorderedDays) {
        if (!flag && dayName !== day) {
            a.push("h4-red");
        } else if (dayName === day) {
            flag = true;
            a.push("h4-now");
        } else {
            a.push("h4-future");
        }
    }

    newTask.innerHTML += `
        <div class="block">
            <div class="gor">
                <h3 style="margin-bottom: -15px;">${task}</h3>
                <button style="background-color: #fff; color: black; margin-left: 4%;" 
                        onclick="Notice(event)">
                    отметить выполнение
                </button>
            </div>
            <div class="gor" style="justify-content: space-between;">
                ${a.map((cls, i) => `<h4 class="${cls}">${['пн','вт','ср','чт','пт','сб','вс'][i]}</h4>`).join('')}
            </div>
            <button onclick="Delete(event)">удалить</button>
        </div>`;
    div_habits.append(newTask);
}

// Определение приветствия
const greetings = {
    morning: "Доброе утро",
    night: "Доброй ночи",
    afternoon: "Добрый день",
    evening: "Добрый вечер"
};

let greetingText;
if (hours < 6) {
    greetingText = greetings.night;
} else if (hours < 12) {
    greetingText = greetings.morning;
} else if (hours < 16) {
    greetingText = greetings.afternoon;
} else if (hours < 22) {
    greetingText = greetings.evening;
} else {
    greetingText = greetings.night;
}
document.getElementById("greeting").textContent = greetingText;

// Генерация календаря
const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();
const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

document.getElementById('month').innerText = `${monthNames[month]} ${year}`;

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const daysContainer = document.getElementById('days');

// Очистка предыдущего календаря
daysContainer.innerHTML = '';

// Заполнение пустых ячеек
for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    daysContainer.innerHTML += '<div class="day"></div>';
}

// Заполнение днями месяца
for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.innerText = day;
    daysContainer.appendChild(dayCell);
}