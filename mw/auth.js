const models = require ('../db/models');
const jwtAuth = require ('../helpers/jwtAuth');

const checkAuth = async (req, res, next) => {
    
    try {
        
        //Make sure authorization header is present
        if(!req.cookies.auth)throw Error("No Auth Cookie");

        //Decode Token
        const decodedToken = await jwtAuth.check(req.cookies.auth);

        //Get user data corresponding to the id included in the token
        const user = await models.Users.findById(decodedToken.id);
        if(!user) throw Error("No User Has this ID");

        //add user data to the req object
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        if(req.method === "GET") return res.redirect('NoAccess');
        res.sendStatus(401);
    }

}

const isAdmin = async (req, res, next) => {
    
    try {
        
        //Make sure authorization header is present
        if(!req.cookies.auth)throw Error("No Auth Cookie");

        //Decode Token
        const decodedToken = await jwtAuth.check(req.cookies.auth);

        //Get user data corresponding to the id included in the token
        const user = await models.Users.findById(decodedToken.id);
        if(!user) throw Error("No User Has this ID");

        //Make sure the user is the ADMIN
        if(user.isAdmin === false) throw Error("This is NOT the Admin");

        //add user data to the req object
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        if(req.method === "GET") return res.redirect('NoAccess');
        res.sendStatus(401);
    }

}

const checkPW = (req, res, next) => {
    if(req.user.hasChangedPW === false) return res.redirect('ChangePW');
    next();
}

module.exports = { checkAuth, isAdmin, checkPW }