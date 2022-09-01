const jsonwebtoken = require ('jsonwebtoken');
const { jwtSecret } = require('../secrets.js');

const create = (id) => {
    const payLoad = {id};
    const maxAge = 60 * 60 * 24;
    const jwtOptions = {expiresIn: maxAge};
    const token = jsonwebtoken.sign(payLoad, jwtSecret, jwtOptions);
    return token;
}

const check = async (token) => {
    try{
        const decodedToken = await jsonwebtoken.verify(token, jwtSecret);
        return decodedToken;
    }catch(error){
        throw Error("Check JWT Failed");
    }
    
}

module.exports = { create, check };