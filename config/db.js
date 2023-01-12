const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connect = mongoose.createConnection(db, { useNewUrlParser: true, useUnifiedTopology: true });
const connectDB = async () => {
    

    try{
        mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected...');
    }catch(err){
        console.log(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = {
    connectDB:connectDB,
    connect:connect,
};