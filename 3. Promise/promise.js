let address="";
let address_p="";
let address_a="";

const country=(addr)=>{
    addr+="대한민국 ";
    const province=(addr)=>{
        addr+="경기도 ";
        const city=(addr)=>{
            addr+="용인시 ";
            console.log("original : "+addr);
        }
        return city(addr);
    }
    return province(addr);
}

const promiseBye = new Promise((resolve)=>{
    resolve(address_p)
}).then(result =>{
    return result += '대한민국 '
})
.then(result => {
    return result += '경기도 '
})
.then(result => {
    return result += '용인시'
})

const country_a = (where)=>{
    return new Promise((resolve, reject)=>{
        resolve(where + '대한민국 ')
    })
}
const province_a = (where)=>{
    return new Promise((resolve, reject)=>{
        resolve(where + '경기도 ')
    })
}
const city_a = (where)=>{
    return new Promise((resolve, reject)=>{
        resolve(where + '용인시')
    })
}

const jjambbong = async ()=>{
    try {
        let country = await country_a(address_a)
        let province = await province_a(country)
        let result = await city_a(province)
        console.log('async/await : ' + result)
    } catch (err) {
        console.error(err)
    }
}


country(address) // original : 대한민국 경기도 용인시
promiseBye.then(result =>
    console.log('promise : ' + result)) // promise : 대한민국 경기도 용인시
jjambbong() // async/await : 대한민국 경기도 용인시