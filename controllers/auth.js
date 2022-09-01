const bcrypt = require('bcryptjs');
const models = require('../db/models');
const jwtAuth = require('../helpers/jwtAuth');

const cookieOptions = {
    sameSite: true,
    httpOnly: true,
    secure: true
}

const login = async (req, res) => {
    
    try {

        //Make Sure User exists
        const query = { email: req.body.email };
        const userExists = await models.Users.findOne(query);
        if(!userExists) return res.sendStatus(404);

        //Check PW
        if(!bcrypt.compareSync(req.body.pw, userExists.pw)) return res.sendStatus(404);
        
        //Check Time validity
        const now = new Date().getTime();
        if(userExists.expiry < now) return res.sendStatus(409);

        //Form Token and add ii to the cookie
        const token = jwtAuth.create(userExists._id);
        res.cookie("auth", token, cookieOptions);
        
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("auth", "", cookieOptions);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { login, logout };