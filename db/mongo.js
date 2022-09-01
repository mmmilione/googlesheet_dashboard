const mongoose = require('mongoose');
const { connection } = require('../secrets');

const connect = (app) => {
    
    try{

        const Options = {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }

        mongoose.connect(connection, Options);
        mongoose.connection.once('open', () => { 
            console.log('Connected to Mongo');
            app.listen(8000, () => console.log("Listening to port 8000"));
        })
        
    }catch(error){
        console.log("Connection to Mongo Failed: " + error);
    }

}

module.exports = connect;