const registered = {};

function sign_in(event) {
    event.preventDefault(); // Предотвращаем отправку формы и обновление страницы

    const login = document.getElementById("email");
    const password = document.getElementById("password");
    if (login == null) {
        alert("Не введён логин");
        return;
    }
    if (password == null) {
        alert("Не введён пароль");
        return;
    }
    if (login.value in registered && password.value == registered[login.value][0]) {
        setCookie("name", login.value); // Устанавливаем куку с именем пользователя
        window.location.href = "index.html";
    } else {
        alert("Неверный логин или пароль");
    };
    login.value = "";
    password.value = "";
}

function sign_up(event) {
    event.preventDefault(); // Предотвращаем отправку формы и обновление страницы

    const username = document.getElementById("username_reg");
    const login = document.getElementById("email_reg");
    const password = document.getElementById("password_reg");

    if (username.value == "") {
        alert("Не введён логин");
        return;
    }
    if (login.value == "") {
        alert("Не введёна почта");
        return;
    }
    if (password.value == "") {
        alert("Не введён пароль");
        return;
    }

    if (login.value in registered) {
        alert("Пользователь уже зарегистрирован");
    } else {
        registered[login.value] = [password.value, username.value];
        alert("Успешная регистрация");
        username.value = "";
        login.value = "";
        password.value = "";
    }
}

function setCookie(name, value, minutes = 1) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000); // Добавляем указанное количество минут
    document.cookie = `${name}=${value};expires=${date.toUTCString()};`;
}