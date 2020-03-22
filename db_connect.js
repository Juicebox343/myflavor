mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
	user     : 'PUBLIC_USER',
	password : 'PASSWORD',
    database : 'DATABASE_NAME',
	multipleStatements: true
});

db.connect((err) =>{
    if(err){
        throw err;
    } 
    console.log('Connected to My Flavor Database');
});

module.exports = db;