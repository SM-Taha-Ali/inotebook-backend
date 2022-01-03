const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/iNotebook";

const connection = () => {
    mongoose.connect(mongoUri, ()=>{
        console.log("Connection Successful.")
    })
}

module.exports = connection;