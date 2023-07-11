const questionnaires = document.querySelectorAll(".questionnaire__wrapper"),
    pacient = document.querySelector("#pacient"),
    modal = document.querySelector('.modal'),
    hypertonic_radio = document.querySelector('#hypertonic_ans1'),
    hypertonic_radio_no = document.querySelector('#hypertonic_ans2'),
    kidney_radio = document.querySelector('#kidney_ans1'),
    kidney_radio_no = document.querySelector('#kidney_ans2'),
    hypertonic_checkbox = document.querySelector('#diseases_ans4'),
    kidney_checkbox = document.querySelector('#diseases_ans29');

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

    let conclusion;
    if (P <= 20) {
        conclusion = P.toFixed(2) + "% - очень низкий риск летального исхода";
    } 
    else if ((P > 20) && (P <= 50)){
        conclusion = P.toFixed(2) + "% - низкий риск летального исхода";
    }
    else if ((P > 50) && (P <= 65)){
        conclusion = P.toFixed(2) + "% - средний риск летального исхода";
    }
    else if ((P > 65) && (P <= 85)){
        conclusion = P.toFixed(2) + "% - высокий риск летального исхода";
    }
    else if (P > 85){
        conclusion = P.toFixed(2) + "% - очень высокий риск летального исхода";
    }

    let resultModal = document.getElementById("modal__body");
    resultModal.innerText = conclusion;

    fadeIn(modal,500);
}

hypertonic_radio.addEventListener('click', function(){
    hypertonic_checkbox.checked = 1;
});

hypertonic_radio_no.addEventListener('click', function(){
    hypertonic_checkbox.checked = 0;
});

hypertonic_checkbox.addEventListener('click', function(){
    if (hypertonic_radio.checked == 0){
        hypertonic_radio.checked = 1;
    } else {
        hypertonic_radio_no.checked = 1;
    }
});

kidney_radio.addEventListener('click', function(){
    kidney_checkbox.checked = 1;
});

kidney_radio_no.addEventListener('click', function(){
    kidney_checkbox.checked = 0;
});

kidney_checkbox.addEventListener('click', function(){
    if (kidney_radio.checked == 0){
        kidney_radio.checked = 1;
    } else {
        kidney_radio_no.checked = 1;
    }
});

document
    .querySelector(".modal__btn-close")
    .addEventListener("click", () => fadeOut(modal,500));
document
    .querySelector(".close")
    .addEventListener("click", () => fadeOut(modal,500));
