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
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if(b == 0){
                console.log('0으로 나눌 수 없습니다.');
                return false;
            }
            else{
                result = a / b;
                break;
            }
    }
    return result;
};

fs.readFile('input.txt', async (err, data)=>{
    if (err) throw err;
    arr = await data.toString().split(',');
    let first = await parseInt(arr[0]);
    let op = await arr[1];
    let second = await parseInt(arr[2]);
    let result = await calculate(first, op, second);
    console.log(result ? result : '');
});
