function numberToText(number) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    const minus = 'минус';
    const zero = 'ноль';

    if (number < 0) {
        return minus + ' ' + numberToText(-number);
    } else if (number === 0) {
        return zero;
    } else if (number < 10) {
        return units[number];
    } else if (number < 20) {
        return teens[number - 10];
    } else {
        const unit = number % 10;
        const ten = Math.floor(number / 10) % 10;
        const hundred = Math.floor(number / 100);
        let result = hundreds[hundred];
        if (ten > 0) {
            result += (result ? ' ' : '') + tens[ten];
        }
        if (unit > 0) {
            result += (result ? ' ' : '') + units[unit];
        }
        return result;
    }
}

let minValue, maxValue;
let orderNumberField, answerField, gameResult;
let orderNumber = 1;
let gameRun = false;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("frm");
    const notification = document.getElementById("notification");
    const game = document.getElementById("game");
    const startGameButton = document.getElementById("startGameButton");

    startGameButton.addEventListener("click", function () {
        form.style.display = "none";
        notification.style.display = "block";
        game.style.display = "block"
    });

    btnRetry.addEventListener('click', function () {
        form.style.display = "block";
        notification.style.display = "none";
        game.style.display = "none"
    });
});



document.getElementById('startGameButton').addEventListener('click', function () {
    if (!gameRun) {
        minValue = parseInt(document.getElementById('minValueInput').value);
        maxValue = parseInt(document.getElementById('maxValueInput').value);

        minValue = (minValue > 0) ? 0 : (minValue < -999) ? -999 : minValue;
        maxValue = (maxValue > 999) ? 999 : (maxValue < -0) ? 100 : maxValue;
        orderNumberField = document.getElementById('orderNumberField');
        answerField = document.getElementById('answerField');

        orderNumberField.innerText = 1;
        answerField.innerText = `Вы загадали число ${numberToText(Math.floor((minValue + maxValue) / 2))}?`;

        const minValueSpan = document.getElementById('minValueSpan');
        const maxValueSpan = document.getElementById('maxValueSpan');

        minValueSpan.innerText = numberToText(minValue);
        maxValueSpan.innerText = numberToText(maxValue);

        orderNumber = 1;
        gameRun = true;

        document.getElementById('btnOver').removeAttribute('disabled');
        document.getElementById('btnLess').removeAttribute('disabled');
        document.getElementById('btnEqual').removeAttribute('disabled');
    }
});


document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = phraseRandom === 1
                ? 'Вы ьли неправильное число!\n🤔'
                : 'Я сдаюсь..\n🤷‍♀️';

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = Math.floor((minValue + maxValue) / 2) + 1;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const randomPhrase = responsePhrases[Math.floor(Math.random() * responsePhrases.length)];
            answerField.innerText = `${randomPhrase} ${numberToText(Math.floor((minValue + maxValue) / 2))}?`;
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = phraseRandom === 1
                ? 'Вы загадали неправильное число!\n🤔'
                : 'Я сдаюсь..\n🤷‍♀️';

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = Math.floor((minValue + maxValue-1) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const randomPhrase = responsePhrases[Math.floor(Math.random() * responsePhrases.length)];
            answerField.innerText = `${randomPhrase} ${numberToText(Math.floor((minValue + maxValue) / 2))}?`;
        }
    }
});

const responsePhrases = [
    'Да это легко! Ты загадал',
    'Наверное, это число',
    'Может быть, это',
    'Предположу, что число',
];

const finishPhrases = [
    'Я всегда угадываю!',
    'Ура, я угадал!',
    'Моя интуиция никогда не подводит!',
];

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const randomPhrase = finishPhrases[Math.floor(Math.random() * finishPhrases.length)];
        answerField.innerText = `${randomPhrase}😎`;
        gameRun = false;
    }
});

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = undefined;
    maxValue = undefined;
    orderNumber = 1;
    gameRun = false;

    orderNumberField.innerText = '';
    answerField.innerText = '';
});