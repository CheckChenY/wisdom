<template>
    <div>
        <div>
            <div style="display: flex;flex-wrap: wrap;" id="searchTop">
                <div style="display: flex;justify-content: space-between;margin-right:20px;" v-for="(searchItem, i) in searchList" :key="i">
                    <p style="width:60px;line-height: 35px;text-align: left;">{{searchItem.title}}</p>
                    <a-date-picker v-model="searchItem.value" @change="onChange" style="width:280px;margin:0;height: 32px;" v-if="searchItem.type=='date'"/>
                    <a-select v-model="searchItem.value" 
                        style="width:280px;margin:0;height: 32px;" 
                        showSearch
                        optionFilterProp="children"
                        v-if="searchItem.type=='select'">
                        <a-select-option :value="selectItem.value" 
                            v-for="selectItem in searchItem.dicData" 
                            :key="selectItem.value">{{selectItem.label}}</a-select-option>
                    </a-select>
                    <a-input v-model="searchItem.value" style="width:280px;margin:0;height: 32px;" v-if="!searchItem.type"/>
                </div>
                <div>
                    <a-button type="primary" icon="search" style="margin-right:10px;" v-if="tableOption.searchBtn" @click="search">{{tableOption.searchLabel}}</a-button>
                    <a-button type="primary" icon="delete" style="margin-right:10px;" v-if="tableOption.emptyBtn" @click="empty">清空</a-button>
                </div>
            </div>
            <div style="display: flex;">
                <a-button type="primary" icon="plus" style="margin-right:10px;" v-if="tableOption.addBtn">{{tableOption.addLabel}}</a-button>
            </div>
            <!-- <div style="margin-top:20px;border: 1px solid #ebeef5;border-radius: 3px;">
                <div style="background:#fafafa;overflow: hidden;overflow-x: auto;white-space: nowrap;">
                        <a-table :columns="tableOption.column" :dataSource="tableData" bordered>
                            <template :slot="item.prop" slot-scope="text" v-for="item in tableData">
                                    {{text}}
                            </template>
                        </a-table>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import moment from 'moment'
console.log(moment())
export default {
    props:["tableOption","tableData"],
    data () {
        return {
            searchList:[],
            searchData:{},
            dateProp:'',
            
        }
    },
    created(){
        if(this.tableOption.column.length){
            this.searchList=this.tableOption.column.filter(s=>s.search)
        }
    },
    methods:{
        onChange(a){
            console.log(a)
        },
        search(){
            this.searchData={}
            this.searchList.forEach(s=>{
                if(s.value){
                    this.searchData[s.prop]=s.value
                }
            })
            this.$emit('handleSearch',this.searchData)
        },
        empty(){
            console.log(this.searchList)
            this.searchList.forEach(s=>{
                if(s.type!='date'){
                    s.value=''
                }else{
                    s.value=moment()
                }
            })
            this.$emit('handleEmpty',this.searchData)
        },
    }
    
}
</script>