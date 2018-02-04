var conString = require('../../app/dbconnect')

exports.registration = function(request, response)
	{	
		var userdata = {
			first_name:request.body.firstname,
			last_name: request.body.lastname,
			email: request.body.email,
			password: request.body.password		
		}
		
			if (request.body.email == "" || request.body.password == "" )
			{
			response.render('registration', 
				{
				error204: 'Поля отмеченные * обязательны к заполнению!',
				})
			}
			else 
			{	
				conString.query('INSERT INTO users SET ?', userdata,
				
				function (err, results, fields) 
				{
				if (err) {console.log(err)}
					else
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
						console.log('User: ', request.body.firstname, ' ', request.body.lastname, 'created!' )
					}
				})
			}		
	}