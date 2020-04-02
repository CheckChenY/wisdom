import { AsyncStorage, } from 'react-native'; 
const unitUrl = "http://192.168.0.189:5001/jtl"
// const fetchData = async (url,timeout,body) => {
//     // debugger
//     let token = await AsyncStorage.getItem('access_token');
//     console.log(timeout)
//     const request = new Promise((resolve, reject) => {
//         fetch(url,{
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + token,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json' 
//             },
//             body:JSON.stringify(body)
//         })
//       // 请求状态成功，解析请求数据
//         .then(
//             // res => {
//             // console.log(res)
//             // // if (res.status >= 200 && res.status < 300) {
//             //     //resolve(res);
//             //     resolve(res.json())
//             // // }
//             // reject(`${res.status}`);
//             // }
//             (response) => response.json()
//         )
//         // 返回请求的数据
//         .then(responseJson=>{
//             console.log(responseJson)
//             resolve(responseJson)
//         })
//         // 返回错误
//         .catch(e => reject(e.message));
//         });
  
//   // 定义一个延时函数
//     const timeoutRequest = new Promise((resolve, reject) => {
//         setTimeout(reject, timeout, 'Request timed out');
//     });
  
//   // 竞时函数，谁先完成调用谁
//     return Promise
//     .race([request, timeoutRequest])
//     .then(res => {
//         return res
//     }, m => {
//         throw new Error(m);
//     });
// };
  
// export default fetchData



// export default fetchers = {
//     post:(url, body = {}) => {
//         return _fetch(fetch_promise(url, body = {}), 60000);
//     }
// }

// function _fetch(fetch_promise, timeout) {
//     var abort_fn = null;
//     var abort_promise = new Promise((resolve, reject) => {
//         abort_fn = function() {
//             reject('abort promise');
//         };
//     });
//     var abortable_promise = Promise.race([
//         fetch_promise,
//         abort_promise
//     ]);
//     setTimeout(function(){
//         abort_fn();
//     }, timeout);

//     return abortable_promise;
// }

// function fetch_promise(url, body = {}) {
//     return new Promise((resolve, reject) => {
//         fetch(url,{
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json;charset=UTF-8',
//             },
//         }).then((response) => { 
//             return response.json();     
//         }).then((jsonData) => {
//             resolve(jsonData);
//         }).catch((err) => {
//             reject(err);//这里可以使用resolve(err),将错误信息传回去
//             if (err.message === 'Network request failed'){
//                 console.log('网络出错');
//             } else if (err === 'abort promise'){
//                 console.log('请求超时');
//             }
//         })
//     })
// }



//先定义延时函数
const delay = (timeOut) =>{
    console.log(timeOut)
    return new Promise((resolve,reject) =>{
        setTimeout(() =>{
            console.log('1234566')
            resolve(new Error('网络超时'))
        },timeOut);
    })
}

//fetch网络请求
const fetchPromise = async (url, params) =>{
    // console.log(params)
    let token = await AsyncStorage.getItem('access_token');
    return new Promise((resolve, reject) => {
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
        // console.log(params)
        fetch(unitUrl + url,{
            // method: method,
            // body:formData
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        }).then((response) => response.json())
        // .then((response) => {
        //     console.log(response)
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         reject(new Error('服务器异常'));
        //     }
        // }).
        .then((responseJson) => {
            // console.log(responseJson)
            resolve (responseJson);
        }).catch((err) => {
            reject(new Error(err))
        })
    })
}

//race任务
const _fetch = (fetchPromise, timeout) => {
    return Promise.race([fetchPromise,delay(timeout)]);
}

//post
const HttpPost = (url, formData,timeout = 30*1000)  =>{
    return _fetch(fetchPromise('POST', url, formData), timeout);
};

//get
export const HttpGet = (url,params,timeout = 30000)  =>{
    return _fetch(fetchPromise(url,params), timeout);
};

// export default {HttpPost ,HttpGet}


export const HttpTimeOut = async (url,params) => {
    let token = await AsyncStorage.getItem('access_token');
    // Promise.race([
    //     fetch(unitUrl + url,{
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json' 
    //         }
    //     }),
    //     new Promise(function(resolve,reject){
    //         setTimeout(()=> reject(new Error('request timeout')),2000)
    //     })])
    //     .then((data)=>{
    //         //请求成功
    //     }).catch(()=>{
    //         //请求失败
    // });

    // function request(url,wait=30) {
        return new Promise((resolve, reject) => {
            let status = 0; // 0 等待 1 完成 2 超时
            let timer = setTimeout(() => {
                console.log(status)
                if (status === 0) {
                    status = 2;
                    timer = null;
                    reject("超时");
                }
            }, 30000);

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

            fetch(unitUrl + url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                }
            })
            .then(res => res.json())
            .then(res => {
                if (status !== 2) {
                    clearTimeout(timer);
                    resolve(res);
                    timer = null;
                    status = 1;
                }
            });
        });
    // }
}