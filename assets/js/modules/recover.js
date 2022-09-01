import { post } from "./httpCalls.js";
import { checkEmail } from "./sanitize.js";

const recover = async () => {

    const url = "./api/recover";
    const email = document.querySelector('#email');
    const errorP = document.querySelector('.login-box .error');
    const successP = document.querySelector('.login-box .success');
    const spinner = document.querySelector('.login-box .loading-container');
    errorP.innerText = "";
    successP.innerText = "";

    if(email.value == '' || checkEmail(email.value) == false){
        errorP.innerText = "El correo no es correcto";
        return spinner.classList.add('hidden');
    }

    spinner.classList.remove('hidden');
    const vars = { email: email.value };

    try {
        
        const res = await post(url, vars);

        if(res.status === 200) {
            successP.innerText = "Nueva Password Enviada al Correo Indicado."
        }else if(res.status === 404){
            errorP.innerText = "Usuario Incorrecto";
        }else{
            errorP.innerText = `Error (${res.status})`;
        }

        return spinner.classList.add('hidden');

    } catch (error) {
        console.log(error);
        errorP.innerText = "Error";
        return spinner.classList.add('hidden');
    }
}

export default recover;