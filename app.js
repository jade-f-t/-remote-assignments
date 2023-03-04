const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.set('view engine','pug');

// create the connection to database
const connection = mysql.createConnection({
	host:'database-5.citefjbsojxf.us-east-1.rds.amazonaws.com',
	user: 'admin',
	password: 'jade0710',
	database: 'assignment'
});

connection.connect(function(error){
	if (error) {
		throw error;
	} else {
		console.log('MySQL Database is connected successfully!');
	}
});

// app.get('/users',(req,res)=>{
// 	res.render('index');
// });

app.get('/healthcheck',(req,res) => { 
	res.render('healthcheck');
});

app.post('/users',(req,res)=>{
	//get the data that the user inputted
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	//const date = req.body.date;
	const date = req.headers['Request-Date']
	//insert them into the sql
	const insertSQL = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;

	//check regex
	const emailRegEx = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9-.]+$')
	const nameRegEx = new RegExp('[a-zA-Z0-9]+')
	const passwdRegEx = new RegExp(`^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])(?=.*[-~!@#$%^&*()_+={[}:;"'<,>.?/|]))|((?=.*[A-Z])(?=.*[a-z])(?=.*[-~!@#$%^&*()_+={[}|:;"'<,>.?/|]))|((?=.*[A-Z])(?=.*[0-9])(?=.*[-~!@#$%^&*()_+={[}|:;"'<,>.?/|]))|((?=.*[A-Z])(?=.*[0-9])(?=.*[-~!@#$%^&*()_+={[}|:;"'<,>.?/|]))$`)
	
	if (!emailRegEx.test(email)){
		return res.send('Email Input Requirement Not Match')
	} else if (!nameRegEx.test(name)){
		return res.send('Name Input Requirement Not Match')
	} else if (!passwdRegEx.test(password)){
		return res.send('Password Input Requirement Not Match')
	}

	connection.query( insertSQL,[name,email,password],
		(err, result1)=>{
			if (err){
				if (err.code === 'ER_DUP_ENTRY'){
					res.status(403).json({'error':'Email Already Exists:403 '});
				} else {
					res.status(400).json({'error':'Client Error Response:400 '});
				}
			} else {
				const userINFO = {
					'id': result1.insertId,
					'name': name,
					'email': email 
				};

				const data = {
					'user':userINFO,
					'date':date
				};

				res.status(200).json({'data':data});
			} ;

	})

});
//curl -X POST -H "Content-Type: application/json" -d '{"name": "Test1", "email": "Test1@example.com", "password": "Test1"}' http://3.218.196.210:3000/users
//use pm2 to run in background >>> pm2 start app.js
app.get('/users',(req,res)=>{
	const id = req.query.id;

	const selectSQL = ' SELECT * FROM user WHERE id = ?';

	connection.query(selectSQL,[id],
		(err,result)=>{
			if (! result[0]){
				res.status(403).send('User Not Existing: 403');
			} else if (err) {
				res.status(400).send('Client Error Response: 400');
			} else {
				
				const userINFO = {
					'id': result[0].id,
					'name': result[0].name,
					'email': result[0].email 
				};
				const date = result[0].created.toUTCString()
				const data = {
					'user':userINFO,
					'date':date
				};
				res.status(200).json({data});
			}
			
	
		
	});
	
});

app.listen(3000,()=>{
	console.log('port=3000');
});


