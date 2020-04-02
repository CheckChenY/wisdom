export const calcDate = (date1, date2) => {
  var date3 = date2 - date1;

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
  var seconds = Math.round(date3 / 1000)
  return {
    leave1,
    leave2,
    leave3,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}

export const dateformat = () => {
  Date.prototype.format = function(fmt) { //author: meizz   
    var o = {   
      "M+" : this.getMonth()+1,                 //月份   
      "d+" : this.getDate(),                    //日   
      "h+" : this.getHours(),                   //小时   
      "m+" : this.getMinutes(),                 //分   
      "s+" : this.getSeconds(),                 //秒   
      "q+" : Math.floor((this.getMonth()+3)/3), //季度   
      "S"  : this.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt)) 
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o) 
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
  }
}