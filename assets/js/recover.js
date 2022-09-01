import recover from './modules/recover.js';

window.addEventListener('DOMContentLoaded', () => {
    const recoverBTN = document.querySelector('#recoverBTN');
    recoverBTN.addEventListener('click', () => recover());
})