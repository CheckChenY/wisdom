<template>
    <div style="height: 100%;position: relative;">
        <p style="height:15%;font-size: 18px;font-weight: 900;color: rgb(51,51,51);display: flex;justify-content: center;align-items:center;color:#fff;">
            <span>单位测评</span>
        </p>
        <p style="position: absolute;height: 15%;top:0;right:10px;display: flex;justify-content: center;align-items: center;">
            <span style="font-size: 12px;cursor: pointer;color: #fff;" @click="showMore">more 》</span>
        </p>
        <div style="height:80%;overflow: hidden;" id="rule">
            <div style="display: flex;height:10%;">
                <p style="width:auto;min-width: 40%;display:flex;justify-content: center;align-items: center;color:#fff;">单位名称</p>
                <p style="width:auto;min-width: 30%;display:flex;justify-content: center;align-items: center;color:#fff;">评分</p>
                <p style="width:auto;min-width: 30%;display:flex;justify-content: center;align-items: center;color:#fff;">评级</p>
            </div>
            <div style="max-height: 90%;overflow: hidden;" id="scrollbox">
                <div v-for="(num,index) in numList" :key="index" class="list" style="display: flex;height: 30px;">
                    <p style="width:auto;min-width: 40%;display:flex;justify-content: center;align-items: center;color:#fff;">{{num.orgName}}</p>
                    <p style="width:auto;min-width: 30%;display:flex;justify-content: center;align-items: center;color:#fff;">{{num.code}}</p>
                    <p style="width:auto;min-width: 30%;display:flex;justify-content: center;align-items: center;color:#fff;">{{num.grade}}</p>
                </div>
                <div class="list2"></div>
            </div>
        </div>
        <a-modal
            title="单位测评"
            :visible="visible"
            @ok="handleOk"
            okText="确定"
            cancelText="取消"
            width="900px"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            >
            <a-table style="width: 100%;" size="middle"  :dataSource="dataSource" :pagination="pagination" :columns="columns"></a-table>
        </a-modal>
    </div>
</template>

<script>
import { companyAssessment } from '@/api/statistics/home'
export default {
    props:['orgId'],
    data () {
        return {
            numList:[],
            params:{
                orgId:null,
                page:0,
                pageSize:20,
                companyName:''
            },
            paramsTable:{
                orgId:null,
                page:0,
                pageSize:5,
                companyName:''
            },
            visible:false,
            confirmLoading:false,
            dataSource:[],
            pagination:{
                size:'middle',
                onChange: this.onChange,
            },
            columns: [
                {
                    title: '单位名称',
                    dataIndex: 'orgName',
                },
                {
                    title: '评分',
                    dataIndex: 'code',
                },
                {
                    title: '评级',
                    dataIndex: 'grade',
                },
            ],
            interval: '',
        }
    },
    watch:{
        orgId(){
            this.getData()
            this.getDataSource()
        },
    },
    created(){
        this.interval = setInterval(() => {
            if (this.orgId) {
                this.getData()
                this.getDataSource()
            }
        },30 * 1000)
    },
    mounted(){
        
    },
    methods:{
        getDataSource(){
            this.paramsTable.orgId=this.orgId
            companyAssessment(this.paramsTable).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.dataSource=res.data.value
                }
            })
        },
        onChange(value){
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        showMore(){
            this.visible=true
        },
        handleOk(){
            this.visible=false
        },
        handleCancel(){
            this.visible=false
        },
        getData(){
            console.log(123)
            this.params.orgId=this.orgId
            companyAssessment(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.numList=res.data.value
                    this.createAnimate()
                }
            })
        },
        createAnimate(){
            const style = document.createElement('style');
            // 设置style属性
            style.type = 'text/css';
            for(let i=0;i<this.numList.length;i++){
                var runkeyframes =`@keyframes myMove${i}{
                                    0% {
                                        transform: translateY(0);
                                    }
                                    100% {
                                        transform: translateY(-${(i+1)*30}px);
                                    }
                                }`
                // 将 keyframes样式写入style内
                style.innerHTML += runkeyframes;
                // 将style样式存放到head标签
            }
            setTimeout(()=>{
                document.getElementsByTagName('head')[0].appendChild(style)
                let listlen=document.getElementsByClassName('list').length
                for(let i=0;i<listlen;i++){
                    document.getElementsByClassName('list')[i].style.animation=`myMove1 2s linear infinite`
                }
            },50)
        }
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>