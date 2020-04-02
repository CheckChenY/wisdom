
import { AsyncStorage, } from 'react-native'; 
import CryptoJS from "react-native-crypto-js";


// const unitUrl = "http://1.192.212.139:800"//测试
// const unitUrl = "http://1.192.212.139:1050"//发布

// const unitUrl = "http://47.105.104.28:60011"//阿里云地址

// const unitUrl = "http://115.29.148.138:60011"//B方案

// const unitUrl = "http://192.168.0.189:8011"//内网
const unitUrl = "http://1.192.212.139:18011"//外网

// const unitUrl = "http://192.168.0.189:8011"

// const unitUrl = "http://47.105.104.28:6000"//基础信息
// const unitUrl = "http://192.168.0.61:8083"//李宵雨
// const unitUrl = "http://192.168.0.155:8083"//刘丹
// const unitUrl = "http://192.168.0.127:8083"//吴鑫

// const unitUrl = "http://192.168.0.20:8083"//罗


// let httpUrl = 'http://192.168.0.188:8003';

export default class FetchManager {
    /*  get请求
    *  url:请求地址
    *  data:参数
    *  callback:回调函数
    */
    static get = async (url,params,callback,self) =>{
        let token = await AsyncStorage.getItem('accessToken');
        let loginType = await AsyncStorage.getItem('loginType');
        // let token = '057e6d2e-cd29-4335-abcb-52892815ac6a';
        console.log(token)
        // debugger;
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        console.log(unitUrl + url)
        //fetch请求
        fetch(unitUrl + url,{
            method: 'GET',
            headers: {
                'accessToken': token,
                "loginType":loginType,
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
        })
        .then((response) => response.json())
        .then((res) => {
            // debugger;
            // if(res.error){
            //     // debugger;
            //     if(self){
            //         console.log(self)
            //         self.navigation.navigate('SignIn')
            //         return false
            //     }
            //     callback('请重新登录......')
            // }else{
                callback(res)
            // }

        }).catch((error) => {
            // errorCallback(error)
            console.log('request failed', error)
        }).done();
    }

    // static postLogin = async (url,params,callback) =>{
    //     if (params) {
    //         let paramsArray = [];
    //         //拼接参数
    //         Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    //         if (url.search(/\?/) === -1) {
    //             url += '?' + paramsArray.join('&')
    //         } else {
    //             url += '&' + paramsArray.join('&')
    //         }
    //     }
    //     console.log(url)
        
    //     fetch(unitUrl + url ,{
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Basic anRsOmp0bA==',
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body:JSON.stringify(params)
    //     })
    //     .then((response) => response.json())
    //     .then((responseJSON) => {
    //         callback(responseJSON)
    //     }) .done();
    // }


    static getCode = async (url,params,callback) =>{
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        console.log(unitUrl + url)
        fetch(unitUrl + url,{
            method: 'GET',
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            callback(response)
        }).done();
    }
    
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post = async (url,params,callback) => {
        let token = await AsyncStorage.getItem('accessToken')
        let loginType = await AsyncStorage.getItem('loginType');
        //fetch请求
        console.log(token)
        console.log(loginType)
        console.log(unitUrl + url)
        fetch(unitUrl + url ,{
            method: 'POST',
            headers: {
                'accessToken': token,
                "loginType":loginType,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            // console.log(responseJSON)
            callback(responseJSON)
        }) .done();
    }

    //无token post请求  注册，登录，忘记密码
    static post_noauth = async (url,params,callback) => {
        console.log(unitUrl + url)
        console.log(params)
        fetch(unitUrl + url ,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        }) .done();
    }

    //只针对登录userinfo
    static getUser = async (url,params,callback,token) =>{
        // let token = await AsyncStorage.getItem('access_token');
        // console.log(token)
        // debugger;
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        // console.log(unitUrl + url)
        //fetch请求
        fetch(unitUrl + url,{
            method: 'GET',
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
        })
        .then((response) => response.json())
        .then((res) => {
            callback(res)
        }).catch((error) => {
            console.log('request failed', error)
        }).done();
    }
}



/**
 * 加密处理
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params

    const result = JSON.parse(JSON.stringify(data))
    console.log(result);
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            let data = result[ele]//密码

            key = CryptoJS.enc.Latin1.parse(key)
            let iv = key
            // 加密
            let encrypted = CryptoJS.AES.encrypt(
                data,key,
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            )
            result[ele] = encrypted.toString()
        })
    }

    
    // let str = result.password;
    // result.password = str.replace(/[+]/g,'%2B')
    // console.log(result);
    return result
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
};

export const getImage = () => {
    let suffix = "";//图片后缀，用以识别哪种格式数据
    //data:image/jpeg;base64,base64编码的jpeg图片数据
    if("data:image/jpeg;".equalsIgnoreCase(dataPrix)){
        suffix = "jpg";
    }else if("data:image/x-icon;".equalsIgnoreCase(dataPrix)){
        //data:image/x-icon;base64,base64编码的icon图片数据
        suffix = "ico";
    }else if("data:image/gif;".equalsIgnoreCase(dataPrix)){
        //data:image/gif;base64,base64编码的gif图片数据
        suffix = "gif";
    }else if("data:image/png;".equalsIgnoreCase(dataPrix)){
        //data:image/png;base64,base64编码的png图片数据
        suffix = "png";
    }else {
        return null;
    }
}

/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
export const date = (format) => { 

    // let t = format ? format : '';

    let date = format ? new Date(t) : new Date();
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds(); 

    let time = Y+M+D+h+m+s
    console.log(Y+M+D+h+m+s); //呀麻碟

    return time


    // var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date()); 
    // var pad = function(n, c){ 
    //     if((n = n + "").length < c){ 
    //         return new Array(++c - n.length).join("0") + n; 
    //     } else { 
    //         return n; 
    //     } 
    // }; 
    // var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    // var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"}; 
    // var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    // var f = { 
    //     // Day 
    //     d: function(){return pad(f.j(), 2)}, 
    //     D: function(){return f.l().substr(0,3)}, 
    //     j: function(){return jsdate.getDate()}, 
    //     l: function(){return txt_weekdays[f.w()]}, 
    //     N: function(){return f.w() + 1}, 
    //     S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'}, 
    //     w: function(){return jsdate.getDay()}, 
    //     z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0}, 
        
    //     // Week 
    //     W: function(){ 
    //         var a = f.z(), b = 364 + f.L() - a; 
    //         var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1; 
    //         if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){ 
    //             return 1; 
    //         } else{ 
    //             if(a <= 2 && nd >= 4 && a >= (6 - nd)){ 
    //                 nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31"); 
    //                 return date("W", Math.round(nd2.getTime()/1000)); 
    //             } else{ 
    //                 return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0); 
    //             } 
    //         } 
    //     }, 
        
    //     // Month 
    //     F: function(){return txt_months[f.n()]}, 
    //     m: function(){return pad(f.n(), 2)}, 
    //     M: function(){return f.F().substr(0,3)}, 
    //     n: function(){return jsdate.getMonth() + 1}, 
    //     t: function(){ 
    //         var n; 
    //         if( (n = jsdate.getMonth() + 1) == 2 ){ 
    //             return 28 + f.L(); 
    //         } else{ 
    //             if( n & 1 && n < 8 || !(n & 1) && n > 7 ){ 
    //                 return 31; 
    //             } else{ 
    //                 return 30; 
    //             } 
    //         } 
    //     }, 
        
    //     // Year 
    //     L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0}, 
    //     //o not supported yet 
    //     Y: function(){return jsdate.getFullYear()}, 
    //     y: function(){return (jsdate.getFullYear() + "").slice(2)}, 
        
    //     // Time 
    //     a: function(){return jsdate.getHours() > 11 ? "pm" : "am"}, 
    //     A: function(){return f.a().toUpperCase()}, 
    //     B: function(){ 
    //         // peter paul koch: 
    //         var off = (jsdate.getTimezoneOffset() + 60)*60; 
    //         var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off; 
    //         var beat = Math.floor(theSeconds/86.4); 
    //         if (beat > 1000) beat -= 1000; 
    //         if (beat < 0) beat += 1000; 
    //         if ((String(beat)).length == 1) beat = "00"+beat; 
    //         if ((String(beat)).length == 2) beat = "0"+beat; 
    //         return beat; 
    //     }, 
    //     g: function(){return jsdate.getHours() % 12 || 12}, 
    //     G: function(){return jsdate.getHours()}, 
    //     h: function(){return pad(f.g(), 2)}, 
    //     H: function(){return pad(jsdate.getHours(), 2)}, 
    //     i: function(){return pad(jsdate.getMinutes(), 2)}, 
    //     s: function(){return pad(jsdate.getSeconds(), 2)}, 
    //     //u not supported yet 
        
    //     // Timezone 
    //     //e not supported yet 
    //     //I not supported yet 
    //     O: function(){ 
    //         var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4); 
    //         if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t; 
    //         return t; 
    //     }, 
    //     P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))}, 
    //     //T not supported yet 
    //     //Z not supported yet 
        
    //     // Full Date/Time 
    //     c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()}, 
    //     //r not supported yet 
    //     U: function(){return Math.round(jsdate.getTime()/1000)} 
    // }; 
        
    // return format.replace(/[\]?([a-zA-Z])/g, function(t, s){ 
    //     if( t!=s ){ 
    //         // escaped 
    //         ret = s; 
    //     } else if( f[s] ){ 
    //         // a date function exists 
    //         ret = f[s](); 
    //     } else{ 
    //         // nothing special 
    //         ret = s; 
    //     } 
    //     return ret; 
    // }); 
}

export const RefeshToken = async (refresh_token) => {
    // const 
    // console.log(1111111111111)


    FetchManager.getLogin('/oauth/token',refresh_token, async (set) => {
        return false
        //下面的就是请求来的数据
        // if(set&&set.data){
        //     let data = set.data;
        //     twoData['offlintCount'] = data.undisAmount
        //     twoData['AllCount'] = data.processedAmount

        //     this.setState({
        //         twoData : twoData
        //     })
        // }
    })

    // var grant_type = 'refresh_token'
    // var scope = 'read write'
    // return request({
    //     url: '/auth/oauth/token',
    //     headers: {
    //         'Authorization': 'Basic anRsOmp0bA=='  
    //     },
    //     method: 'get',
    //     data: { isToken: false },
    //     params: { refresh_token, grant_type, scope }
    // })
}