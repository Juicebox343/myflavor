mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
	user     : 'process.env.PUBLIC_USER',
	password : 'process.env.PASSWORD',
    database : 'process.env.DATABASE_NAME',
	multipleStatements: true
});

db.connect((err) =>{
    if(err){
        throw err;
    } 
    console.log('Connected to My Flavor Database');
});

module.exports = db;