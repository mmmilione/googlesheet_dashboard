const bcrypt = require('bcryptjs');
const models = require('../db/models');
const generate = require('../helpers/random');
const { sendRecovery } = require('../helpers/mailer');

const recover = async (req, res) => {
    try {
        //Make sure email exists
        const query = { email: req.body.email }; 
        const user = await models.Users.findOne(query);
        if(!user) return res.sendStatus(404);

        //PW
        const randomString = generate(req.body.email, 8);
        const salt = bcrypt.genSaltSync(10);
        const pw = bcrypt.hashSync(randomString, salt);

        //Save Changes
        const changes = {
            pw, 
            hasChangedPW: false
        }

        await models.Users.findByIdAndUpdate(user._id, changes);

        //Notify new PW
        await sendRecovery(user.email, randomString);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = recover;