const express = require('express');
const router = express.Router();

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

router.post('/signup', (req, res)=>{
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

router.get('/pop', (req, res)=>{
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('Signed up successfully');
    res.end('<br><a href="/login"> <button>login</button></a>');
});

router.post('/login', (req, res)=>{
    const Id = req.body.userId;
    const pwd = req.body.password;
    for(let i = 0; i < users.length; i++){
        if(users[i].userId == Id && users[i].password == pwd){
            res.send("Welcome " + Id + "!");
        }
        else if(users[i].userId == Id && users[i].password != pwd){
            res.send('Password wrong');
        }
    }
    res.send('ID wrong');
});

module.exports = router;