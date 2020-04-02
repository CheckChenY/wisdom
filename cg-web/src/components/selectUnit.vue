<template>
    <div style="width:auto;">
        <div style="min-width:60px;width:33%;font-size: 14px;color:#606266;padding:5px 0;border-bottom: 2px #11A0F8 solid;">单位信息</div>
        <div style="width:100%;display:flex;justify-content:space-between;margin-bottom:5px;margin-top:12px;">
            <a-select style="width:47%;" @change="shengChange" 
                v-model="sheng"
                showSearch
                optionFilterProp="children">
                <a-select-option :value="item.value" v-for="item in shengList" :key="item.value">{{item.label}}</a-select-option>
            </a-select>
            <a-select style="width:47%;" @change="shiChange" v-model="shi"
                showSearch
                optionFilterProp="children">
                <a-select-option :value="item.value" v-for="item in shiList" :key="item.value">{{item.label}}</a-select-option>
            </a-select>
        </div>
        <div style="width:100%;margin-bottom:10px;">
            <a-select style="width:100%;" @change="quChange" v-model="qu"
                showSearch
                optionFilterProp="children">
                <a-select-option :value="item.value" v-for="item in quList" :key="item.value">{{item.label}}</a-select-option>
            </a-select>
        </div>
        <div style="height:460px;overflow:scroll;">
            <div v-if="!unitList.length" style="padding-top:30px;display: flex;justify-content:center;align-items: center;">
                <div style="display:flex;flex-direction:column;align-items:center;">
                    <img src="/img/empty.png">
                    <span style="font-size: 14px;color:#606266;">暂无数据</span>
                </div>
            </div>
            <div v-else :class="selectIndex==index?'select':'noselect'" v-for="(item,index) in unitList" :key="index" @click="selectOrg(item,index)">
                {{item.orgName}}
            </div>
        </div>
    </div>
</template>
<script>
import { findDictList, } from "@/api/public"
import { findCompanyByRegionId } from '@/api/devicemanage/unitdevicemanage'
export default {
    data(){
        return{
            areaList:[],
            shengList:[],
            sheng:'请选择',
            shiList:[],
            shi:'请选择',
            quList:[],
            qu:'请选择区、县、地级市',
            selectIndex:0,
            unitList:[]
        }
    },
    created(){
        this.getList()
    },
    mounted(){
        this.getOrgList()
    },
    methods:{
        getOrgList(regionId){
            findCompanyByRegionId({regionId:regionId?regionId:''}).then(res=>{
                if(res && res.data && res.data.value){
                    this.unitList=res.data.value
                    this.$emit("getOrgId",res.data.value[0].id)
                }
            })
        },
        //选择单位，传给父组件regionId
        selectOrg(item,ind){
            this.selectIndex=ind
            this.$emit("getOrgId",item.id)
        },
        //选择省
        shengChange(val){
            this.shiList=[]
            this.shi='请选择'
            this.qu='请选择区、县、地级市'
            this.areaList.forEach(s=>{
                if(s.value==val){
                    if(s.children && s.children.length){
                        s.children.forEach(t=>{
                            var obj={}
                            obj.label=t.label
                            obj.value=t.value
                            this.shiList.push(obj)
                        })
                    }else{
                        this.shiList=[]
                        this.quList=[]
                    }
                }
            })
            this.getOrgList(this.sheng)
        },
        //选择市
        shiChange(val){
            var that=this
            this.quList=[]
            this.qu='请选择区、县、地级市'
            function getObj(arr,value){
                if(arr.length){
                    arr.forEach(s=>{
                        if(s.value==value){
                            if(s.children && s.children.length){
                                s.children.forEach(o=>{
                                    var obj={}
                                    obj.label=o.label
                                    obj.value=o.value
                                    that.quList.push(obj)
                                })
                            }
                        }else{
                            if(s.children && s.children.length){
                                return getObj(s.children,value)
                            }
                        }
                    })
                }
            }
            getObj(this.areaList,val)
            this.getOrgList(this.shi)
        },
        //选择区
        quChange(val){
            this.qu=val
            this.getOrgList(this.qu)
        },
        //获取省
        getList(){
            findDictList({type:'area_type'}).then(res=>{
                if(res && res.data && res.data.success){
                    this.areaList=res.data.value
                    this.areaList.forEach(s=>{
                        var obj={}
                        obj.label=s.label
                        obj.value=s.value
                        this.shengList.push(obj)
                    })
                }else{
                    this.shengList=[]
                    this.shiList=[]
                    this.quList=[]
                }
            })
        },
    }
}
</script>
<style>
.noselect{
    line-height:28px;
    color:#606266;
    padding:0 10px;
    font-size: 14px;
    cursor: pointer;
    border: 1px #fff solid;
}
.select{
    line-height:28px;
    color:#606266;
    padding:0 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    background:rgb(249, 249, 249);
    border: 1px #dcdfe6 solid;
}
</style>