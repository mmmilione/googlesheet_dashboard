import login from './modules/auth.js';

window.addEventListener('DOMContentLoaded', () => {
    const loginBTN = document.querySelector('#loginBTN');
    loginBTN.addEventListener('click', () => login());
})