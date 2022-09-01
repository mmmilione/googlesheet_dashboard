const models = require('../db/models');
const bcrypt = require('bcryptjs');

const changePW = async (req, res) => {

    try {

        //Make Sure user is logged
        if(!req.user) return res.sendStatus(401);

        //Check Old PW
        if(!bcrypt.compareSync(req.body.oldPw, req.user.pw)) return res.sendStatus(404);

        //Make sure new PW is suitable
        if(req.body.newPw == '' || req.body.newPw.length < 6){
            return res.sendStatus(403);
        }

        //Hash PW
        const salt = bcrypt.genSaltSync(10);
        const pw = bcrypt.hashSync(req.body.newPw, salt);

        //Update PW in DB
        const changes = {
            pw: pw,
            hasChangedPW: true
        }

        await models.Users.findByIdAndUpdate(req.user._id, changes);
        
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = changePW;