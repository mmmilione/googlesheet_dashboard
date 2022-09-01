const bcrypt = require('bcryptjs');
const models = require('../db/models');
const { sendPW, sendExtension } = require('../helpers/mailer');
const generate = require('../helpers/random');

const addUser = async (req, res) => {

    try {

        //Make sure user doesn't exists already
        const query = { email: req.body.email };
        const userExists = await models.Users.findOne(query);
        if(userExists)return res.sendStatus(401);
        
        //Set expiry of user access
        const validity = 1000 * 60 * 60 * 24 * req.body.duration;
        const expiry = new Date().getTime() + validity;

        //PW
        const randomString = generate(req.body.email, 8);
        const salt = bcrypt.genSaltSync(10);
        const pw = bcrypt.hashSync(randomString, salt);

        //Save New User 
        const userObj = {
            email: req.body.email,
            isAdmin: false,
            hasChangedPW: false,
            expiry,
            pw
        }

        await models.Users(userObj).save();

        //Notify PW to User
        await sendPW(req.body.email, randomString, expiry);

        //Send Response
        res.status(200).send();

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

const deleteUser = async (req, res) => {
    try {
        await models.Users.findByIdAndDelete(req.body.id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const extend = async (req, res) => {
    try {
        //Make Sure user exists
        const user = await models.Users.findById(req.body.id);
        if(!user) return res.sendStatus(404);

        //Compute new Expiry Date;
        const now = new Date().getTime();
        const extension = req.body.extension * 1000 * 60 * 60 * 24;
        const expiry = user.expiry > now ? user.expiry + extension : now + extension;
        const changes = { expiry };
        
        //Save New Expiration Date
        await models.Users.findByIdAndUpdate(req.body.id, changes);

        //Notify Extension
        await sendExtension(user.email, expiry);

        res.status(200).json({ expiry });

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const list = async (req, res) => {
    try {
        const query = {email: {$ne: "criptolibrearg@gmail.com"}};
        const users = await models.Users.find(query);
        res.render('users', {users, isAdmin: req.user.isAdmin});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { addUser, deleteUser, list, extend };