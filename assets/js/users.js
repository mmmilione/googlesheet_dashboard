import { deleteUser, extend } from './modules/users.js';

window.addEventListener('DOMContentLoaded', () => {
    const goAddUsersBTN = document.querySelector('#goAddBTN');
    goAddUsersBTN.addEventListener('click', () => window.location.href = './newUser');
    const deleteBTNs = document.querySelectorAll('.deleteBTN');
    const extendBTNs = document.querySelectorAll('.extendBTN');

    deleteBTNs.forEach(el => {
        const targetAttribute = el.getAttribute('data-target');
        el.addEventListener('click', () => deleteUser(targetAttribute));
    })

    extendBTNs.forEach(el => {
        const targetAttribute = el.getAttribute('data-target');
        const extension = el.getAttribute('data-extension');
        el.addEventListener('click', () => extend(targetAttribute, extension));
    })
})
