const mysql = require('mysql');
const conString = mysql.createConnection({
	host: '127.0.0.1', 
	user: 'admin', 
	password: 'admin',
	database: 'test1'
	});

conString.connect(function (err) 
	{
	if (!err) {
		console.log("Database is connected ... ");
	}
		else
		{
			console.log("Error connecting database ... ", err);
		}
	});
module.exports = conString