const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const signup = require('./signup');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res)=>{
    res.redirect('signup.html');
});

app.get('/pop', signup);

app.post('/signup', signup);

app.get('/login', (req, res)=>{
    res.redirect('login.html');
});

app.post('/login', signup);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});