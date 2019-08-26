const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let users = [
    {userId : 'test' , password : 1234},
    {userId : 'asdf' , password : 'qwer'}
];

const isRegistered = (Id)=>{
    for(let i=0; i < users.length; i++){
        if(Id == users[i].userId){
            return false;
        }
    }
    return true;
};

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res)=>{
    res.redirect('signup.html');
});

app.get('/pop', (req, res)=>{
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('Signed up successfully');
    res.end('<br><a href="/login"> <button>login</button></a>');
});

app.post('/signup', (req, res)=>{
    let Id = req.body.userId;
    let pwd = req.body.password;
    if(isRegistered(Id)){
        console.log('Id : ' + Id + '  password : ' + pwd);
        users.push({userId : Id, password : pwd});
        res.redirect('/pop');
    }
    else{
        res.send('User already exists<br> <a href="/"> <button>Back</button></a>');
    }
});

app.get('/login', (req, res)=>{
    res.redirect('login.html');
});

app.post('/login', (req, res)=>{
    const Id = req.body.userId;
    const pwd = req.body.password;
    for(let i = 0; i < users.length; i++){
        if(users[i].userId == Id && users[i].password == pwd){
            res.send("Welcome " + Id + "!");
            break;
        }
        else if(users[i].userId == Id && users[i].password != pwd){
            res.send('Password wrong');
            break;
        }
        else if(users.length-1 == i){
            res.send('ID wrong');
            break;
        }
    }
    
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});