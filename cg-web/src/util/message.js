export const getMessage = (stutasData) => {
    let message = {};
    
    if ( !stutasData.deviceParam) {
        return message = '无'
    }
    let data = JSON.parse(stutasData.deviceParam)
    for(let i=0;i<data.length;i++){
        if(data[i].type == 13){
            let datas = data[i].datas
            let nub1a;
            datas.forEach((item,i) => {
                if(i == 0){
                    message.frequency = (Number(item)/100).toFixed(2) + 'Hz;'
                }else if(i == 1){
                    let nuba = (item / 100).toFixed(2) + 'Kw;';
                    message.meritorious = nuba
                }else if(i == 2){
                    let nuba = (item / 100 ).toFixed(2) + 'var;';
                    message.reactive = nuba
                }else if(i == 3){
                    let nuba = (item / 100 ).toFixed(2) + 'KVA';
                    message.now = nuba
                }else if(i == 4){
                    message.factor = (item / 1000).toFixed(3) + 'PF;'
                }else if(i == 5){
                    nub1a = item;
                    let nuba = (item / 100 ).toFixed(2) + 'Kw.h';
                    message.load1 = nuba
                }else if(i == 6){
                    let nuba = (item / 100 ).toFixed(2);
                    message.load = nuba
                }
            })
        }
    }

    return message;
}