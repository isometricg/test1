var conString = require('../app/dbconnect')

exports.finduser = function(request, response)
	{
		var findlastname = request.body.findlastname
		
		conString.query('SELECT * FROM users WHERE last_name = ?',findlastname, 
		function (err, rows)
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
				if (findlastname.length > 0 )
				{
				
					var userslist = '';
					for (var i in rows)
					{
					userslist += '<tr><td>'+rows[i].id+'</td><td>'+rows[i].first_name+'</td><td>'+rows[i].last_name+'</td><td>'+rows[i].email+'</td></tr>';
				
					}
					response.render('users', { users: userslist})
				
				}
					else { 
						conString.query('SELECT * FROM users', function (err, rows)
						{
							var userslist = '';
							for (var i in rows)
						{
							userslist += '<tr><td>'+rows[i].id+'</td><td>'+rows[i].first_name+'</td><td>'+rows[i].last_name+'</td><td>'+rows[i].email+'</td></tr>';
				
						}
							response.render('users', { users: userslist})
				
						})}
			}
		})
	}
	