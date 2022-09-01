import addUser from './modules/addUsers.js';

window.addEventListener('DOMContentLoaded', () => {
    const addUsersBTN = document.querySelector('#addUserBTN');
    addUsersBTN.addEventListener('click', () => addUser());
})
