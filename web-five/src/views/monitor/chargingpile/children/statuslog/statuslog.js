// import DevicePosition from '@/components/public/device-position'
// import { statusOption } from '@/const/monitor/firealarm'
// import ImageView from '@/components/public/image-view'
let statuslog = {
  name: 'statuslog',
  data() {
    return {
        obj:{},
        data: [
            {
                xing:'张',
                ming:'三',
                sex:'男'
            }, {
                xing:'李',
                ming:'四',
                sex:'女'
            }
        ],
        option:{
            page:false,
            align:'center',
            menuAlign:'center',
            column:[
            {
                label:'姓名',
                prop:'name',
                children:[
                {
                    label:'姓',
                    prop:'xing'
                },{
                    label:'名',
                    prop:'ming'
                }
                ]
            }, {
                label:'性别',
                prop:'sex'
            }
            ]
        },
        timeout:false
        }
    }
}
export default statuslog