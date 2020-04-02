
export default({
    '112':2,//0 缺相保护告警/跳闸禁止  1，缺相保护告警使能  2 缺相保护跳闸使能  3 缺相保护告警/跳闸使能
    '113':2,//0 欠压保护告警/跳闸禁止  1 欠压保护告警使能 2 欠压保护跳闸使能 3 欠压保护告警/跳闸使能
    '114':2,//0 过压保护告警/跳闸禁止  1 过压保护告警使能 2 过压保护跳闸使能 3 过压保护告警/跳闸使能
    '115':2,//0 过流保护告警/跳闸禁止  1 过流保护告警使能 2 过流保护跳闸使能 3 过流保护告警/跳闸使能
    '116':2,//0 缺零保护告警/跳闸禁止  1 缺零保护告警使能 2 缺零保护跳闸使能 3 缺零保护告警/跳闸使能
    '117':2,//0 漏电保护告警禁止  1 漏电保护告警使能24小时 2 漏电保护告警使能长期启用 
    '118':2,//0 重合闸禁止  1 重合闸使能 
})

export const EnableType = (item) => {
    let value;
    if(item.type === '112'){
        value = item.data === 0 ? '缺相保护告警/跳闸禁止' : item.data === 1 ? '1，缺相保护告警使能' :
                    item.data === 2 ? '缺相保护跳闸使能' : item.data === 3 ? '缺相保护告警/跳闸使能' : item.data
        item.data = value;
    }else if(item.type === '113') {
        value = item.data === 0 ? '欠压保护告警/跳闸禁止' : item.data === 1 ? '欠压保护告警使能' :
                    item.data === 2 ? '欠压保护跳闸使能' : item.data === 3 ? '欠压保护告警/跳闸使能' : item.data
        item.data = value;
    }else if(item.type === '114') {
        value = item.data === 0 ? '过压保护告警/跳闸禁止' : item.data === 1 ? '过压保护告警使能' :
                    item.data === 2 ? '过压保护跳闸使能' : item.data === 3 ? '过压保护告警/跳闸使能' : item.data
        item.data = value;
    }else if(item.type === '115') {
        value = item.data === 0 ? '过流保护告警/跳闸禁止' : item.data === 1 ? '过流保护告警使能' :
                    item.data === 2 ? '过流保护跳闸使能' : item.data === 3 ? '过流保护告警/跳闸使能' : item.data
        item.data = value;
    }else if(item.type === '116') {
        value = item.data === 0 ? '缺零保护告警/跳闸禁止' : item.data === 1 ? '缺零保护告警使能' :
                    item.data === 2 ? '缺零保护跳闸使能' : item.data === 3 ? '缺零保护告警/跳闸使能' : item.data
        item.data = value;
    }else if(item.type === '117') {
        value = item.data === 0 ? '漏电保护告警禁止' : item.data === 1 ? '漏电保护告警使能24小时' :
                    item.data === 2 ? '漏电保护告警使能长期启用' : item.data
        item.data = value;
    }else if(item.type === '118') {
        value = item.data === 0 ? '重合闸禁止' : item.data === 1 ? '重合闸使能' : item.data
        item.data = value;
    }else if(item.type === '128') {
        value = item.data === 160 ? '自动模式' : item.data === 128 ? '手动模式' : 
        item.data === 12 ? '锁定模式' : item.data
        item.data = value;
    }
    return item;
}