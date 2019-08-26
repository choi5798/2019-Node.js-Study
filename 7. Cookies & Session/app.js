const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

let users = [
    {userId : 'test' , password : 1234, name : 'test', major : '컴퓨터공학과', email : 'test@test.com', age : 1},
    {userId : 'asdf' , password : 'qwer', name : '홍길동', major : '전자공학과', email : 'asdf@asdf.com', age : 23}
];

const isRegistered = (Id)=>{
    for(let i=0; i < users.length; i++){
        if(Id == users[i].userId){
            return false;
        }
    }
    return true;
};

app.use(session({
    secret : 'Mamma',
    resave : false,
    saveUninitialized : true
}));
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
        users.push(req.body);
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
            req.session.userId = Id;
            res.redirect('/profile');
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

app.get('/profile', (req, res)=>{
    const Id = req.session.userId;
    for(let i = 0; i<users.length; i++){
        if(users[i].userId == Id){
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            res.write('ID : ' + users[i].userId + '<br>');
            res.write('이름 : ' + users[i].name + '<br>');
            res.write('학과 : ' + users[i].major + '<br>');
            res.write('이메일 : ' + users[i].email + '<br>');
            res.write('나이 : ' + users[i].age + '<br><br>');
            res.write('<span style="border:1px solid blue; font-size:18px; text-decoration:none;"><a href="/">처음으로 돌아가기</a></span><br><br>');
            res.write('<span style="border:1px solid blue; font-size:18px; text-decoration:none;"><a href="/login">로그인 화면으로 돌아가기</a></span>');
            res.write('<p style = "font-size : 68px;background: #fbcac9; color : violet;text-align:center;">회장님 고생하셨습니다</p>');
            res.end();
        }
    }
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});