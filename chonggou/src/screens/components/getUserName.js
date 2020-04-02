import FetchManager from '../fetch/index';

export const getUserName = () => {
    let obj = {};
    return new Promise((resolve, reject) => {
        FetchManager.get('1/user/findAllUser','', async (set) => {
            //下面的就是请求来的数据
            let data = set;
            if(set){
                for(let i=0;i<data.length;i++){
                    obj[data[i].id] = data[i].realName
                }
            }
            resolve(obj)
        })
    })
} 

export const getAllUserByOrgId = () => {
    let arr = [];
    return new Promise((resolve, reject) => {
        FetchManager.get('1/user/getAllUserByOrgId','', async (set) => {
            // console.log(set)
            //下面的就是请求来的数据
            if(set && set.data){
                let data = set.data;
                data.forEach(item => {
                    let obj = {};
                    obj['label'] = item.realName
                    obj['value'] = item.id
                    arr.push(obj)
                })
            }
            // if(set){
            //     for(let i=0;i<data.length;i++){
            //         obj[data[i].id] = data[i].realName
            //     }
            // }
            resolve(arr)
        })
    })
} 