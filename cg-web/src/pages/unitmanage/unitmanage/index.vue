<template>
  <div class="child_unit">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
            <a-col :span="6">
                <a-form-item label="单位名称">
                    <a-input
                    v-decorator="[
                        'orgName',
                    ]"
                    maxLength="50"
                    placeholder="请输入单位名称"/>
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="单位类型">
                    <a-select 
                    v-decorator="[
                        'orgType',
                    ]"
                    showSearch
                    optionFilterProp="children"
                    placeholder="请选择单位类型">
                        <a-select-option v-for="(item,index) in orgTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5" :style="{marginTop:'3px'}">
                <a-button type="primary" html-type="submit">
                    查询
                </a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                    清空
                </a-button>
            </a-col>
        </a-row>
    </a-form>
    <a-table bordered :dataSource="dataSource" 
        :columns="columns" 
        :pagination="pagination"
        :rowClassName="rowClassName"
        :loading="loading" style="margin-top:16px;">
        <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
                <a-button @click="() => onView(record)" type="primary" style="margin-right: 5px;">详情</a-button>
                <a-button @click="() => showModal(record)" 
                    type="danger" 
                    v-if="permission.indexOf('100110001000') != -1"
                    style="margin-right: 5px;">付费功能包</a-button>
                <a-switch checkedChildren="启" unCheckedChildren="禁" 
                    @click="switchClick(record)" 
                    v-if="permission.indexOf('100110001001') != -1"
                    @change="switchChange" :checked="record.useState === 0"/>
            </div>
        </template>
    </a-table>
    <formDialog ref="formDialog"></formDialog>
    <moneymodal ref="moneymodal"></moneymodal>
  </div>
</template>

<script>
import formDialog from './formDialog.vue';
import moneymodal from './moneymodal.vue';
import { dataSource,columns,columnsModal,dataModal } from './unitmangerdata';
import { search } from '../../../components/unitmanage/unitmanage';
import { findPageList } from '@/api/company/companymanage'
import { update } from '@/api/user'
import { mapGetters } from "vuex";
import { constants } from 'fs';

export default {
    components: {
        formDialog,
        moneymodal
    },
    data() {
        return {
            dataSource: dataSource,
            columns: columns,
            loading:false,
            //查询
            name:'',
            nub:'',
            type:'',
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                orgName:null,
                orgType:null,
                startTime:null,
                endTime:null,
                page:0,
                pageSize:10,
                status:'1',
            },
            orgTypeList:[{
                label:'社会单位',
                value:'1'
            },{
                label:'监管单位',
                value:'2'
            },{
                label:'总公司',
                value:'3'
            },{
                label:'代理商',
                value:'4'
            }],
            visible: false,
            pagination: {
                onChange: this.onChange,
                pageSize: 10,
                current:1
            },
            switchKey: '',
        };
    },
    created(){
        this.getData()
    },
    computed: {
        ...mapGetters([
            "permission",
            "rowLight",
        ]),
    },
    methods:{
        getData(){
            findPageList(this.params).then(res=>{
                if(res.data.success && res.data.value){
                    const pagination = { ...this.pagination };
                    this.dataSource=res.data.value.content
                    if(res.data.value.content.length){
                        pagination.total = res.data.value.totalElements;
                        this.pagination = pagination;
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            s.orgImg=this.$imgUrl+s.orgImg
                            this.orgTypeList.forEach(t=>{
                                if(t.value==s.orgType){
                                    s.orgType=t.label
                                }
                            })
                        })
                    }
                }else{
                    this.dataSource=[]
                }
            })
        },
        handleReset() {
            this.form.resetFields();
        },
        handleSearch(e) {
            e.preventDefault();
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                this.params.orgName=values.orgName?values.orgName:''
                this.params.orgType=values.orgType?values.orgType:''
                this.getData()
            });
        },
        switchChange(key) {
            console.log(key)
            if (key) {
                this.switchKey = 0
            } else {
                this.switchKey = 1
            }
            
        },
        switchClick (record) {
            record.useState = this.switchKey
            record.orgType=(this.orgTypeList.filter(s=>s.label==record.orgType)[0]).value
            update(record).then(res => {
                console.log(res)
                if (res && res.data && res.data.success) {
                    this.$message.success(this.switchKey === 0?'开启成功':'禁用成功')
                    this.getData()
                }
            })
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add')
        },
        onView(record) {
            let col = search(columns)
            this.$refs.formDialog.showDrawer(record, 'view',col)
        },
        onEdit (record) {
            let col = search(columns)
            this.$refs.formDialog.showDrawer(record, 'edit',col)
        },
        //付费功能包
        showModal(record) {
            // console.log(record)
            // let col = search(columns)
            this.$refs.moneymodal.showDrawer(record, 'money')
        },
        handleOk(e) {
            console.log(e);
            this.visible = false;
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        }
    }
    
}
</script>
<style lang='scss'>
// .child_unit{
//     .table-operations {
//         text-align: left;
//         margin-bottom: 16px;
//     }

//     .table-operations > button {
//         margin-right: 8px;
//     }
// }
    .item_list{
        margin: 20px;
        text-align: right;
        .item_list_left{
            text-align: right
        }
    }
    .modalStyle{
        widows: 720px;
    }
</style>