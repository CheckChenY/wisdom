<template>
    <div>
        <list :tableOption="tableOption" @handleSearch="handleSearch" @handleEmpty="handleEmpty" :tableData="tableData">
            <!-- <template slot="add">
                <a-button type="primary" icon="plus" style="margin-right:10px;">添加</a-button>
            </template>
            <template slot="delete">
                <a-button type="primary" icon="delete" style="margin-right:10px;">删除</a-button>
            </template>
            <template slot="edit">
                <a-button type="primary" icon="edit" style="margin-right:10px;">修改</a-button>
            </template>
            <template slot="see">
                <a-button type="primary" icon="search" style="margin-right:10px;">查找</a-button>
            </template> -->
        </list>
    </div>
</template>
<script>
import list from '../../../components/list.vue'
import moment from 'moment'
export default {
    components:{
        list,
    },
    created(){
        
    },
    data () {
        return {
            tableData:[{
                one:'male',
                two:moment(),
                three:'001',
                four:'得得得',
                five:moment(),
                six:'的得分非常v'
            },{
                one:'male',
                two:moment(),
                three:'001',
                four:'得得得',
                five:moment(),
                six:'的得分非常v'
            },{
                one:'male',
                two:moment(),
                three:'001',
                four:'得得得',
                five:moment(),
                six:'的得分非常v'
            },{
                one:'male',
                two:moment(),
                three:'001',
                four:'得得得',
                five:moment(),
                six:'的得分非常v'
            },{
                one:'male',
                two:moment(),
                three:'001',
                four:'得得得',
                five:moment(),
                six:'的得分非常v'
            }],
            tableOption:{
                addBtn:true,
                addLabel:'添加设备',
                searchBtn:true,
                searchLabel:'搜索',
                emptyBtn:true,
                column:[{
                    title: '性别',
                    prop: 'one',
                    value:'',
                    type:'select',
                    dicData:[{
                        label:'男',
                        value:'male'
                    },{
                        label:'女',
                        value:'female'
                    }],
                    search: true,
                    span: 12,
                },{
                    title: '第二列',
                    value:moment(),
                    prop: 'two',
                    type:'date',
                    search: true,
                    span: 12,
                },{
                    title: '第三列',
                    value:'',
                    prop: 'three',
                    type:'select',
                    dicData:[{
                        label:'李正阳',
                        value:'001'
                    },{
                        label:'陈亚力',
                        value:'002'
                    }],
                    search: true,
                    span: 12,
                },{
                    title: '第四列',
                    value:'',
                    prop: 'four',
                    search: false,
                    span: 12,
                },{
                    title: '第五列',
                    value:moment(),
                    prop: 'five',
                    search: true,
                    type:'date',
                    span: 12,
                },{
                    title: '第六列',
                    value:'',
                    prop: 'six',
                    search: true,
                    span: 12,
                }]
            }
        }
    },
    methods:{
        handleSearch(a){
            console.log(a)
        },
        handleEmpty(a){
            console.log(a)
        }
    }
    
}
</script>