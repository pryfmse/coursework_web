let name = "гость";
let sign = false;

document.getElementById("name").textContent = name;
const div = document.querySelector(".list");
const div_habits = document.querySelector(".list_habits");
 

function logout() {
    if (sign){
        alert("Вы вышли из системы.");
        name = "гость";
    } else {
        window.location.href = "enter.html";
    }
}

function go() {
    window.location.href = "about_planning.html";
}

const Delete = (event) => {
    event.target.parentNode.remove();
}

const Notice = (event) => {
        // Находим ближайший родительский блок с привычкой
        const habitBlock = event.target.closest('.block');
    
        // Находим контейнер с днями недели (второй элемент с классом 'gor')
        const daysContainer = habitBlock.querySelectorAll('.gor')[1];
        
        // Находим сегодняшний день (элемент с классом 'h4-now')
        const todayElement = daysContainer.querySelector('.h4-now');
        
        // Меняем его класс на зеленый (добавляем новый класс)
        todayElement.classList.replace('h4-now', 'h4-green');
}

function add_task() {
    const task = prompt("Введите задачу:");
    if (!task) return;
  
    const date = prompt("Введите дату (DD-MM-YYYY):");
    if (!date) return;
  
    // Проверка формата даты
    if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
      alert("Некорректная дата! Используйте формат YYYY-MM-DD");
      return;
    }

    const newTask = document.createElement("div");
    newTask.innerHTML += '<div class="block"><h3>' + task + '</h3><p>' + date + '</p><button onclick="Delete(event)">удалить</button></div>';
    div.append(newTask);
}

const date = new Date(); // Получаем текущую дату и время
const hours = date.getHours(); // Извлекаем часы
const dayIndex = date.getDay(); // Получаем день недели (0-6)

// Массив с названиями дней недели
const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

// Получаем название дня недели
const dayName = daysOfWeek[dayIndex];

// Выводим результат
document.getElementById("day").textContent = dayName;

function add_habit() {
    const task = prompt("Введите привычку:");
    if (!task) return;

    const newTask = document.createElement("div");
    let flag = false;
    const a = [];
    for (const day of daysOfWeek.push(daysOfWeek.shift())){
        if (!flag && dayName != day){ 
            a.push("h4-red");
        } else if (dayName == day) {
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
        <button style="background-color: #fff; color: black; margin-left: 4%;" onclick="Notice(event)">
          отметить выполнение
        </button>
      </div>
      <div class="gor" style="justify-content: space-between;">
        <h4 class="${a[0]}">пн</h4>
        <h4 class="${a[1]}">вт</h4>
        <h4 class="${a[2]}">ср</h4>
        <h4 class="${a[3]}">чт</h4>
        <h4 class="${a[4]}">пт</h4>
        <h4 class="${a[5]}">сб</h4>
        <h4 class="${a[6]}">вс</h4>
      </div>
      <button onclick="Delete(event)">удалить</button>
    </div>`;
    div_habits.append(newTask);
}

// Условие для определения приветствия
if (hours < 12) {
    if (hours > 6){
        document.getElementById("greeting").textContent = "Доброе утро";
    } else {
        document.getElementById("greeting").textContent = "Доброй ночи";
    }
} else {
    if (hours < 16){
        document.getElementById("greeting").textContent = "Добрый день";
    } else if (hours < 22) {
        document.getElementById("greeting").textContent = "Добрый вечер";
    } else {
        document.getElementById("greeting").textContent = "Доброй ночи";
    }
}

    // Получаем текущую дату
const now = new Date();
const month = now.getMonth(); // Текущий месяц (0-11)
const year = now.getFullYear(); // Текущий год

// Массив названий месяцев
const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

// Устанавливаем название месяца
document.getElementById('month').innerText = `${monthNames[month]} ${year}`;

// Получаем первый день месяца и количество дней в месяце
const firstDay = new Date(year, month, 1).getDay(); // День недели первого числа
const daysInMonth = new Date(year, month + 1, 0).getDate(); // Количество дней в месяце

// Заполняем календарь днями
const daysContainer = document.getElementById('days');

// Добавляем пустые ячейки для выравнивания
for (let i = 0; i < firstDay - 1; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day';
    daysContainer.appendChild(emptyCell);
}

// Добавляем дни месяца
for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.innerText = day;
    daysContainer.appendChild(dayCell);
}