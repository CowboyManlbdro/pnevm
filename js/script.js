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

    let P, z, age, sex, invalid_group, count_disease, hypertonic;

    age = document.querySelector('#age').value;
    sex = document.querySelector('input[name="sex"]:checked').value;
    invalid_group = document.querySelector('input[name="invalid_group"]:checked').value;
    count_disease = document.querySelectorAll('input[type="checkbox"]:checked').length;

    hypertonic = document.querySelector('input[name="hypertonic"]:checked').value;
        
    z = -1.840 + 0.036 * age - 1.163 * sex - 0.775 * invalid_group + 0.238 * count_disease + 0.970 * hypertonic;
    P = (1/(1 + Math.exp(-z))) * 100;
    console.log(P);
    let conclusion;

    if (P < 62) {
        conclusion = "небольшой риск развития пневмонии";
    } 
    else if ((P >= 62) && (P < 85)){
        conclusion = "значительный риск развития пневмонии";
    }
    else if (P >= 85){
        conclusion = "высокий риск развития пневмонии";
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
