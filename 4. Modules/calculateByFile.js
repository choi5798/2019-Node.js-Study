const opr = require('./opr');
const add = opr.add;
const sub = opr.sub;
const mul = opr.mul;
const div = opr.div;

const fs = require('fs');

const calculate = (a, op, b)=>{
    let result = '';
    switch (op) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = sub(a, b);
            break;
        case '*':
            result = mul(a, b);
            break;
        case '/':
            if(b == 0){
                console.log('0으로 나눌 수 없습니다.');
                return false;
            }
            else{
                result = div(a, b);
                break;
            }
    }
    return result;
};

fs.readFile('input.txt', (err, data)=>{
    if (err) throw err;
    arr = data.toString().split(',');
    let first = parseInt(arr[0]);
    let op = arr[1];
    let second = parseInt(arr[2]);
    let result = calculate(first, op, second);
    fs.writeFile('output.txt', result ? result : '',(err)=>{
        if (err) throw err;
    });
    console.log(result ? result : '');
});
