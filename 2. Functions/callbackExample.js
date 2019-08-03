const list=[1,2,3,4,5,6,7,8,9,10];

const callbackExample = (items,callback)=>{
    setTimeout(()=>{
        let sum=0;
        sum = items.reduce((a, b)=>(a+b))
        callback(sum);
    },0);
};
callbackExample(list, (result)=>{
    console.log(result);
});
console.log('first');