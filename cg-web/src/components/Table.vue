<template>
    <table style="width:100%;border:1px solid #ebeef5;border-radius:3px;">
        <tr style="display: flex;">
            <td v-for="item in tableHeader" 
                :key="item.id"
                style="height:49px;padding:10px 0;display: flex;justify-content: center;align-items: center;width:auto;border-right:1px #ebeef5 solid;">
                {{item}}
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    name:'Table',
    created(){
        
    },
    data () {
        return {
            data:[{
                index:1,
                code:'2号楼',
                xing:'办公用地',
                jie:'砖混结棍',
                floor:6,
                area:2000
            },{
                index:2,
                code:'3号楼',
                xing:'居住用地',
                jie:'砖混结棍',
                floor:4,
                area:2000
            }],
            tableHeader:['序号','建筑编号','使用性质','建筑结构','建筑层数','建筑面积'],
            columnNum:6
        }
    },
    methods:{
        
    }
    
}
</script>