const questionnaires = document.querySelectorAll(".questionnaire__wrapper"),
    pacient = document.querySelector("#pacient"),
    modal = document.querySelector('.modal');

const today = document.querySelector('#today');
let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
today.textContent = output;

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let name_p = getRandomIntInclusive(100,300);
let lastname = getRandomIntInclusive(100,300);
pacient.textContent = name_p + "" + lastname;

function questionnaireSubmit() {

    let P, z, age, kidney, count_disease, hypertonic;

    age = document.querySelector('#age').value;
    kidney = document.querySelector('input[name="kidney"]:checked').value;
    count_disease = document.querySelectorAll('input[type="checkbox"]:checked').length;
    hypertonic = document.querySelector('input[name="hypertonic"]:checked').value;
        
    z = -6.637 + 0.044 * age + 0.091 * count_disease + 1.324 * hypertonic + 1.337 * kidney;
    P = (1/(1 + Math.exp(-z))) * 100;
    console.log(P);
    let conclusion;

    if (P < 23) {
        conclusion = "небольшой риск летального исхода";
    } 
    else if ((P >= 23) && (P < 34)){
        conclusion = "значительный риск летального исхода";
    }
    else if (P >= 34){
        conclusion = "высокий риск летального исхода";
    }

    let resultModal = document.getElementById("modal__body");
    resultModal.innerText = conclusion;

    fadeIn(modal,500);
}

document
    .querySelector(".modal__btn-close")
    .addEventListener("click", () => fadeOut(modal,500));
document
    .querySelector(".close")
    .addEventListener("click", () => fadeOut(modal,500));
