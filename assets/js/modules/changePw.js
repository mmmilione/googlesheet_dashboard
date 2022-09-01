import { post } from './httpCalls.js';

const changePw = async () => {

    //Grab elements in the DOM
    const oldPw = document.querySelector('#oldPw');
    const newPw = document.querySelector('#newPw');
    const newPwRep = document.querySelector('#newPwRep');
    const errorP = document.querySelector('.login-section .error');
    const successP = document.querySelector('.login-section .success');
    const spinner = document.querySelector('.login-box .loading-container');
    
    //Reset Errors and Success
    errorP.innerText = "";
    successP.innerText = "";

    //Check old PW
    if(oldPw.value == '' || oldPw.value.length < 6){
        return errorP.innerText = "Insertar la Vieja Password. Min 6 caracteres";
    }

    //Check New PW
    if(newPw.value == '' || newPw.value.length < 6){
        return errorP.innerText = "Insertar la Nueva Password. Min 6 caracteres";
    }

    //Make sure old and new PWs are not the same
    if(oldPw.value == newPw.value){
        return errorP.innerText = "La nueva password no puede ser igual a la vieja password";
    }

    //Make sure new PW is repeated
    if(newPwRep.value != newPw.value){
        return errorP.innerText = "Es necesario repetir la password";
    }

    //Show Spinner
    spinner.classList.remove('hidden');

    try {

        //Make POST Request

        const url = "./api/changePW";

        const vars = {
            oldPw: oldPw.value,
            newPw: newPw.value,
            newPwRep: newPwRep.value
        }

        const res = await post(url, vars);

        //Handle Response
        if(res.status === 200) {
            successP.innerText = "Password Modificada con Exito";
            return spinner.classList.add('hidden');
        }else if(res.status === 401){
            errorP.innerText = "Usted No Esta Autorizado";
            return spinner.classList.add('hidden');
        }else if(res.status === 403){
            errorP.innerText = "Insertar la Nueva Password. Min 6 caracteres";
            return spinner.classList.add('hidden');
        }else if(res.status === 404){
            errorP.innerText = "La Vieja Password no es Correcta";
            return spinner.classList.add('hidden');
        }else{
            errorP.innerText = `Error (${res.status})`;
            return spinner.classList.add('hidden');
        }

    } catch (error) {
        console.log(error);
        errorP.innerText = "Error";
        return spinner.classList.add('hidden');
    }
}

export default changePw;