const mongoose = require('mongoose');
// connecting mongoose to db
mongoose.connect('mongodb://localhost/auth-system');

const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to MongoDb"));

db.once('open',function(){
    console.log('Connected to Database :: MondoDB');
});

module.exports=db;