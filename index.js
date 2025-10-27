const deadline = new Date('2025-12-31T23:59:59'); // дата до окончания 

//вызов элементов
const elDays = document.querySelector('.timer__days');
const elHours = document.querySelector('.timer__hours');
const elMinutes = document.querySelector('.timer__minutes');
const elSeconds = document.querySelector('.timer__seconds');


//функция, которая обновляет цифры на таймере каждую секунду
function updateTimer() {
    const now = new Date();

    //разница между дедлайном и датой сейчас
    const diff = deadline - now;
    // перевод в дни, секунды..
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24); //%24 - полные дни
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    //переводим число в строку и, если число из одной цифры, то добавляем 0

    elDays.textContent = days.toString().padStart(2, "0");
    elHours.textContent = hours.toString().padStart(2, "0");
    elMinutes.textContent = minutes.toString().padStart(2, "0");
    elSeconds.textContent = seconds.toString().padStart(2, "0");
}

//обновление таймера каждую секунду
setInterval(updateTimer, 1000);
updateTimer();



//валидация на email
const input = document.querySelector('.input-wrapper input');
const button = document.querySelector('.footer__button');

let message = document.createElement('p');
message.className = 'email-message';
input.parentElement.appendChild(message);

button.addEventListener('click', function () {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (value === '') {
        showError('');
    } else if (!emailRegex.test(value)) {
        showError('Input error');
    } else {
        hideError();
    }

    function showError(text) {
        message.textContent = text;
        message.style.display = 'block';
        message.style.color = 'red';
        input.style.border = '1px solid red';
    }

    function hideError() {
        message.style.display = 'none';
        input.style.border = '';
    }
});
