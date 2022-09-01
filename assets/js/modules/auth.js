import { post } from "./httpCalls.js";
import { checkEmail } from "./sanitize.js";

const login = async () => {

    const url = "./api/auth";
    const email = document.querySelector('#email');
    const pw = document.querySelector('#pw');
    const errorP = document.querySelector('.login-box .error');
    const spinner = document.querySelector('.login-box .loading-container');
    errorP.innerText = "";

    if(email.value == '' || checkEmail(email.value) == false){
        errorP.innerText = "El correo no es correcto";
        return spinner.classList.add('hidden');
    }

    if(pw.value == '' || pw.value.length < 6){
        errorP.innerText = "Insertar la Password. Min 6 caracteres";
        return spinner.classList.add('hidden');
    }

    try {
        spinner.classList.remove('hidden');
        const vars = { email: email.value, pw: pw.value };
        const res = await post(url, vars);
        if(res.status === 200) {
            window.location.href ='./dashboard';
        }else if(res.status === 404){
            errorP.innerText = "Usuario o Password Incorrectos";
            return spinner.classList.add('hidden');
        }else if(res.status === 409){
            errorP.innerText = "Privilegios de Acceso Vencidos";
            return spinner.classList.add('hidden');
        }else{
            errorP.innerText = `Error (${res.status})`;
            spinner.classList.add('hidden');
        }
    } catch (error) {
        console.log(error);
        errorP.innerText = "Error";
        spinner.classList.add('hidden');
    }

}

export default login;