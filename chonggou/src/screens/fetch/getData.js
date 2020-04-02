import FetchManager from '../fetch/index';

export const getData = (selected) => {
    //获取系统类型
    // let obj = {[selected]: {selected: true, selectedColor: 'blue'}};
    let obj = {};
    return new Promise((resolve, reject) => {
        FetchManager.get('1/safeattendancestaterecord/showPage','', async (set) => {
            //下面的就是请求来的数据
            let data = set.data;
            console.log(data)
            if(set&&set.data){
                for(let i=0;i<data.length;i++){
                    let time = data[i].createTime.substring(0,10);
                    let color = data[i].clockState === '1' ? 'blue' : 'red'
                    obj[time] = { marked: true, dotColor: color,selectedColor: 'blue',id:data[i].id}
                }
            }
            resolve(obj)
        })
    })
}


export const getDataId = (day) => {
    // console.log(day)
    return new Promise((resolve, reject) => {
        FetchManager.get('1/safeattendancerecord/pageAppByOneDay',day, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            let data = set.data;
            if(set&&set.data){
                let arr = [];
                for(let i=0;i<data.length;i++){
                    let obj = {};
                    let time = data[i].createTime.replace('T',' ');

                    obj['clockState'] = data[i].clockState === '0' ? '上班打卡' : '下班打卡';
                    obj['clockAddress'] = data[i].clockAddress;
                    obj['clockPhoto'] = data[i].clockPhoto;
                    obj['createTime'] = time;
                    obj['clockRemak'] = data[i].clockRemak;
                    arr.push(obj)
                }

                resolve(arr)
            }
        })
    })
}


export const getDataTime = (day) => {
    // console.log(day)
    return new Promise((resolve, reject) => {
        FetchManager.get('1/safeattendancerecord/ClockCountAppByOneDay',day, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if( set&&set.data ){
                let data = set.data;
                resolve(data)
            }
        })
    })
}


export const getToday = (format) => {
    //获取系统类型
    let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = now.getMonth();//得到月份
    let date = now.getDate();//得到日期
    let day = now.getDay();//得到周几
    let hour = now.getHours();//得到小时
    let minu = now.getMinutes();//得到分钟
    let sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    let time = "";
    
    if(format==1){//精确到天
        time = year + "-" + month + "-" + date;
    }else if(format==2){//精确到分
        time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
    }
    return time;
}