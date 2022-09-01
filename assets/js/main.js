import logMeOut from "./modules/logout.js";
import { closeMenu, openMenu } from "./modules/helpers.js";

window.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    const goBack = document.querySelector('#goBackBTN');
    const nav = document.querySelector('nav');

    if(goBack) {
        goBack.addEventListener('click', () => window.location.href = "./");
    }

    if(nav){
        const logoutBTN = document.querySelector('#logoutBTN');
        const mobLogoutBTN = document.querySelector('#mobLogoutBTN');
        const mobMenuDIV = document.querySelector('#mobMenuDIV');
        const blankSpace = document.querySelector('#menuMobList');
        logoutBTN.addEventListener('click', () => logMeOut());
        mobLogoutBTN.addEventListener('click', () => logMeOut());
        mobMenuDIV.addEventListener('click', () => openMenu());
        blankSpace.addEventListener('click', (e) => closeMenu(e));
    }
})