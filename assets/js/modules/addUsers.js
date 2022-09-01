import { post } from './httpCalls.js';
import { checkEmail } from './sanitize.js';

const addUser = async () => {

    //Grab elements in the DOM
    const email = document.querySelector('#email');
    const selectDuration = document.querySelector('#selectDuration');
    const errorP = document.querySelector('.login-section .error');
    const successP = document.querySelector('.login-section .success');
    const spinner = document.querySelector('.login-box .loading-container');
    
    //Reset Errors and Success
    errorP.innerText = "";
    successP.innerText = "";

    if(email.value == '' || checkEmail(email.value) == false){
        errorP.innerText = "El correo no es correcto";
        return spinner.classList.add('hidden');
    }

    //Check Duration
    if(selectDuration.value == 0){
        return errorP.innerText = "Es necesario selecionar la duraccion";
    }

    //Show Spinner
    spinner.classList.remove('hidden');

    try {

        //Make POST Request
        const url = "./api/addUser";

        const vars = {
            email: email.value,
            duration: selectDuration.value
        }

        const res = await post(url, vars);

        //Handle Response
        if(res.status === 200) {
            successP.innerText = "Usuario Agregado con Exito";
            return spinner.classList.add('hidden');
        }else if(res.status === 401){
            errorP.innerText = "Usted No Esta Autorizado";
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

export default addUser;