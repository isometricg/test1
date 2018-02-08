var conString = require('../../app/dbconnect')
var bcrypt = require('bcrypt')
exports.login = function(request, response)
	{	
		var password = request.body.password;		
		var email = request.body.email;		
		conString.query('SELECT * FROM users WHERE email = ?',[email],
		function (err, results, fields)
		{
		if (err) 
			{
				console.log("error ocurred",err);
				response.send(
					{
						"code":400,
						"failed":"error ocurred"
					})
			}
			else
			{
			
			if(results.length >0)
			{	
				var passwordenc = bcrypt.compareSync(password, results[0].password)
				
				if(results[0].email = email && passwordenc == true)
					{						
					
					conString.query('SELECT * FROM users', function (err, rows)
						{
							var userslist = '';
							for (var i in rows)
						{
							userslist += '<tr><td>'+rows[i].id+'</td><td>'+rows[i].first_name+'</td><td>'+rows[i].last_name+'</td><td>'+rows[i].email+'</td></tr>';
							
						}
							response.render('users', { users: userslist})
							
						})
					}
						else 
						{
							
							response.render('login', 
							{
								error204: 'Неверный логин или пароль!',
								
							})
							
						}
			}
			else
				{
					response.render('login', 
							{
								error204: 'Такого пользователя не существует',
								
							})
				
				}
			}}
		)}