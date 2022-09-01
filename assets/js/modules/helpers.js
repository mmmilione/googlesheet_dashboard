const getCommonEls = () => {
    const spinner = document.querySelector('.background-modal');
    const successToast = document.querySelector('.successToast');
    const errorToast = document.querySelector('.errorToast');
    const successToastContent = document.querySelector('#successToastContent');
    const errorToastContent = document.querySelector('#errorToastContent');
    const resObj = { spinner, errorToast, successToast, errorToastContent, successToastContent };
    return resObj;
}

const disappearToast = (target) => target.classList.add('hidden');

const getDate = (ts) => {
    const months = ["Ene", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
    const d = new Date(ts);
    const dateString = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    return dateString; 
}

const openMenu = () => {
    const mobList = document.querySelector('#menuMobList');
    mobList.classList.remove('hidden');
}

const closeMenu = (e) => {
    if(e.target.id != 'menuMobList') return;
    const mobList = document.querySelector('#menuMobList');
    mobList.classList.add('hidden');
}
 
export { getCommonEls, disappearToast, getDate, openMenu, closeMenu };