//打印功能

// 调用方法为
// dayin(){
//     var h=['报警时间','设备类型','所在建筑','楼层/区域','具体位置','报警状态','报警描述','报警程度']
//     var a=['createTime','$processtype','$processbuild','$processfloor','speclocation','$processcondition','stateDesc','processdeep']
//     print('警情处理列表',13,h,a,this.processdatas)
// },

export function print(title,limit,header,column,data){
    // 参数分别代表 表格的标题，每页的条数，表头，column为数据对应的字段，data为数据Array
    var oPop = window.open('','oPop');
    var str = '<!DOCTYPE html>'
        str +='<html>'
        str +='<head>'
        str +='<meta charset="utf-8">'
        str +='<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'
        str +='</head>'
        str +='<body>'
        //分页
        var page=data.length%limit?parseInt(data.length/limit)+1:parseInt(data.length/limit)
        for(let k=0;k<page;k++){
            str +='<table style="width:100%;border-collapse :collapse;">'
            str +=`<p style="text-align:center ">${title}</p>`
            //表头
            str +='<tr>'
            for(let i=0;i<header.length;i++){
                str +=`<th style="height:40px;border :1px solid black;font-size:12px;text-align :center;">${header[i]}</th>`
            }
            str +='</tr>'
            
            //表体 每页的行数
            var hang=(k+1)*limit<=data.length?limit:data.length-limit*k
            for(let i=0;i<hang;i++){
                str +='<tr>'
                for(let j=0;j<column.length;j++){
                    str +=`<td style="height:40px;border :1px solid black;font-size:12px;text-align :center;">${data[k*limit+i][column[j]]}</td>`
                }
                str +='</tr>'
            }
            str +='</table>'
            str +='<div style="page-break-after:always"></div>'
        }

        str +='</body>'
        str +='</html>'
    oPop.document.write(str);
    oPop.print();
    oPop.close();
}
