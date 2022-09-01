import changePW from './modules/changePw.js';

window.addEventListener('DOMContentLoaded', () => {
    const changePwBTN = document.querySelector('#changePwBTN');
    changePwBTN.addEventListener('click', () => changePW());
})