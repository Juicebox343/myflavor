mysql = require('mysql');

const db = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

db.connect((err) =>{
    if(err){
        throw err;
    } 
    console.log('Connected to My Flavor Database');
});

module.exports = db;