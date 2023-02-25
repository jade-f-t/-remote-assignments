const express = require('express');

const app = express();

app.set('view engine','pug');

app.get('/',(req,res) => {
	res.render('index');
});

app.get('/healthcheck',(req,res) => { 
	res.render('healthcheck');
});

app.listen(3000, () =>{
	console.log('localhost:3000!');
});