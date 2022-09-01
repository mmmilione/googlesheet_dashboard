import { post } from "./httpCalls.js";

const logMeOut = async () => {
    try {
        const url = "./api/logout";
        const vars = {};
        const res = await post(url, vars);
        if(res.status === 200){
            return window.location.href = "./";
        }else{
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
    }
}

export default logMeOut;