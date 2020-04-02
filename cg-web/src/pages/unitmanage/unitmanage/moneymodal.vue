<template>
	<div class="form_dialog">
		<a-drawer
			:title="title"
			placement="right"
			:closable="false"
			@close="onClose"
			:visible="visible"
			width="1000"
			>
			<a-table :columns="columnsModal" 
				:dataSource="dataModal" 
				:pagination="pagination"
				bordered>
				<template
					v-for="col in ['expireDate']"
					:slot="col"
					slot-scope="text, record"
				>
					<div :key="col">
						<a-date-picker :value="record.expireDate"
							style="margin: -5px 0;width:160px"
							:defaultValue="moment(record.expireDate?record.expireDate:new Date(), dateFormat)"
							@change="date => handleChange(date, record, col)" />
					</div>
				</template>
				<template slot="operation" slot-scope="text, record">
					<div class="editable-row-operations" style="display: flex;align-items: center;">
						<span>
							<a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked @change="switchChange(record)" :checked="record.buyState"/>
						</span>
					</div>
				</template>
			</a-table>
			<div
				:style="{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
				}"
			>
				<a-button :style="{marginRight: '8px'}" @click="onClose">
					取 消
				</a-button>
			</div>
		</a-drawer>
	</div>
</template>
<script>
import { columnsModal,dataModal } from './unitmangerdata';
import EditableCell from '@/components/EditableCell';
import { tableList,insert,callOff } from '@/api/company/companymanage'
import { findPageList } from '@/api/rolemoney'
export default {
    components: {
        EditableCell
    },
	data() {
		return {
			visible: false,
			title: '',
            form: this.$form.createForm(this),
            dataModal: dataModal,
            columnsModal: columnsModal,
            params:{
				page:0,
				pageSize: 10,
				companyId:''
			},
			pagination: {
                onChange: this.onChange,
                pageSize: 10,
                current:1
            },
		};
	},
	watch: {
	},
	methods: {
		switchChange(record){
			if(!record.buyState){//开启
				if(!record.expireDate){
					this.$message.error('请选择到期时间')
					return
				}
				var obj={
					packageCode:record.packageCode,
					companyId:this.params.companyId,
					expireDate:new Date(record.expireDate).getTime()
				}
				insert(obj).then(res=>{
					if(res && res.data && res.data.success){
						this.dataModal.forEach(s=>{
							if(s.packageId==record.packageId){
								s.buyState=!s.buyState
							}
						})
					}
				})
			}else{
				callOff({
					packageCode:record.packageCode,
					companyId:this.params.companyId,
				}).then(res=>{
					if(res && res.data && res.data.success){
						this.dataModal.forEach(s=>{
							if(s.packageId==record.packageId){
								s.buyState=!s.buyState
							}
						})
					}
				})
			}
		},
		handleChange(date, reocrd, column) {
			reocrd[column]=date
		},
		edit(record) {
			const newData = [...this.dataModal];
			const target = newData.filter(item => record.id === item.id)[0];
			if (target) {
				target.editable = true;
				this.dataModal = newData;
			}
		},
		showDrawer(record, handle) {
			this.visible = true;
			this.$store.dispatch("setRowLight", record.id)
			if (handle === 'money') {
				this.title = '功能包配置'
				this.params.companyId = record.id
				this.getList()
			}
			
		},
		//获取列表数据
		getList(){
			tableList(this.params).then(res=>{
				if(res && res.data && res.data.success){
					if(res.data.value.content.length){
						res.data.value.content.forEach(s=>{
							s.buyState=s.buyState=='false'?false:true
						})
						const pagination = { ...this.pagination };
						pagination.total = res.data.value.totalElements;
                        this.pagination = pagination;
					}
					this.dataModal=res.data.value.content
				}
			})
		},
		onClose() {
			this.visible = false;
			this.$store.dispatch("setRowLight", '')
		},
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getList()
        }
	},
};
</script>
<style lang='scss'>
.form_dialog{
	.table-operations {
		text-align: left;
		margin-bottom: 16px;
	}

	.table-operations > button {
		margin-right: 8px;
	}
}
</style>