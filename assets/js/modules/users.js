import { del, post } from "./httpCalls.js";
import { disappearToast, getCommonEls, getDate } from "./helpers.js";

const deleteUser = async (id) => {

    const {
        spinner, successToast, errorToast, 
        errorToastContent, successToastContent 
    } = getCommonEls();    

    spinner.classList.toggle('hidden');

    try {

        const res = await del({id});

        if(res.status === 200){
            spinner.classList.add('hidden');
            successToastContent.innerText = "Usuario Borrado!";
            successToast.classList.remove('hidden');
            document.getElementById(id).classList.add('hidden');
            return setTimeout(() => disappearToast(successToast), 5000);
        }else if(res.status === 401){
            errorToastContent.innerText = "Usted No Esta Autorizado";
            errorToast.classList.remove('hidden');
        }else{
            errorToastContent.innerText = `Error (${res.status})`;
            errorToast.classList.remove('hidden');
        }

    } catch (error) {
        console.log(error);
        errorToastContent.innerText = "Error";
        errorToast.classList.remove('hidden');
    }

    spinner.classList.toggle('hidden');
    setTimeout(() => disappearToast(errorToast), 5000);
}

const extend = async (id, extension) => {

    const {
        spinner, successToast, errorToast, 
        errorToastContent, successToastContent 
    } = getCommonEls();    

    spinner.classList.toggle('hidden');

    try {
        
        const url = "./api/extend";
        const vars = { id, extension };
        const res = await post(url, vars);

        if(res.status === 200){
            spinner.classList.add('hidden');
            successToastContent.innerText = "Accesso Extendido";
            successToast.classList.remove('hidden');
            const data = await res.json();
            const expiryShow = document.querySelectorAll(`[data-expiry-show="${id}"]`);
            expiryShow[0].innerText = getDate(data.expiry);
            return setTimeout(() => disappearToast(successToast), 5000);
        }else if(res.status === 404){
            errorToastContent.innerText = "El Usuario No Existe";
            errorToast.classList.remove('hidden');
        }else if(res.status === 401){
            errorToastContent.innerText = "Usted No Esta Autorizado";
            errorToast.classList.remove('hidden');
        }else{
            errorToastContent.innerText = `Error (${res.status})`;
            errorToast.classList.remove('hidden');
        }
    } catch (error) {
        console.log(error);
        errorToastContent.innerText = "Error";
        errorToast.classList.remove('hidden');
    }

    spinner.classList.toggle('hidden');
    setTimeout(() => disappearToast(errorToast), 5000);
}

export { deleteUser, extend }