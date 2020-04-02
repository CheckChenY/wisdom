// 获取报警信息
export const getDynamicMsg = (obj) => {
    let noteMsg = ''
    let nameList = require('./dynamic.json')
    let warn = nameList[obj].name
    console.log(warn);
    noteMsg = warn;
    return noteMsg;
  }