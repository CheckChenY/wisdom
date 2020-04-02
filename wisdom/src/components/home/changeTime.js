import moment from 'moment';
let year = Number(moment().format('YYYY'));
let month = Number(moment().format('MM'));
let day = Number(moment().format('DD'));




export const getYear = (selected) => {
    //获取系统类型
    
}

export const getMonth = (y,m,d,nub) => {
    let obj = {};
    if(m === 12 && nub === 1){
        m = 1;
        obj.year = y + 1;
        obj.month = m;

    }else if(m === 1 && nub === 0){
        m = 12 ;
        y = y - 1;
        
        obj.year = y;
        obj.month = m;
    }else{
        if(nub === 0){
            m = m - 1;
        }else{
            m = m + 1;
        }
        n_m = y + '年' + m;
        obj.year = y;
        obj.month = m;
    }
    obj.day = d;
    console.log(obj)
    return obj;
}

export const getDay = (y,m,d,nub) => {
    let e_d = y + '-' + m
    console.log(e_d)
    // debugger
    let day_end = Number(moment(e_d).endOf('month').format('D')); //上一个月的最后一天
    // debugger;
    // let n_m;//当前的日
    // let y = year,m = month;
    let obj = {};
    if(d === day_end && nub === 1){
        let n_d =  Number('01');
        let n_m = m === 12 ? 1 : m + 1;
        let n_y = m === 12 ? y + 1 : y;
        obj.day = n_d;
        obj.month = n_m;
        obj.year = n_y;
        
    }else if(d === 1 && nub === 0){

        l_m = m === 1 ? 12 : m - 1;
        let n_y = m === 1 ? y - 1 : y;
        let e_date = y + '-' + l_m;
        let n_d = Number(moment(e_date).endOf('month').format('DD')); //一个月的最后一天

        obj.day = n_d;
        obj.month = l_m;
        obj.year = n_y;

    }else{
        if(nub === 0){
            d = d - 1;
        }else{
            d = d + 1;
        }
        n_m = y + '年' + m + '月' + d + '日';

        obj.day = d;
        obj.month = m;
        obj.year = year;
    }
    console.log(obj)
    return obj;
}