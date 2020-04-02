<template>
  <div class="form_dialog">
    <a-drawer
        title="配置服务"
        placement="top"
        :closable="false"
        @close="handleReset"
        :visible="visible"
		destroyOnClose
		:height="620"
        >
        <a-button type="primary" @click="handleAdd" style="margin-bottom:10px">添 加</a-button>
		<a-table bordered 
            :dataSource="dataSource" 
            :loading="loading"
            :pagination="pagination"
            :columns="columns">
			<template slot="serviceType" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.id, 'serviceType', $event)" />
            </template>
            <template slot="serviceId" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.id, 'serviceId', $event)" />
            </template>
            <template slot="serviceDescribe" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.id, 'serviceDescribe', $event)" />
            </template>
            <template slot="serviceAddress" slot-scope="text, record">
                <editable-cell :text="text" @change="onCellChange(record.id, 'serviceAddress', $event)" />
            </template>
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onSumbit(record)" style="margin-right: 10px;">保存</a-button>
                    <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)" v-if="record.id">
                        <a-button type="link">删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
    </a-drawer>
    
  </div>
</template>
<script>
import { findPageList, insert, update, delDict } from "@/api/devicemanage/deviceinit/vendorconfig"
import EditableCell from '@/components/EditableCell';

export default {
	components: {
        EditableCell
    },
    data() {
        return {
			visible: false,
			record: {},
            dataSource: [],
            pagination: {
                onChange: this.pageChange,
                total: 0,
                pageSize: 6,
            },
            params:{
                companyDicId: '',
                page:0,
                size:6,
            },
            loading: false,
            columns: [
				{
					title: '服务类型',
                    dataIndex: 'serviceType',
                    width:'18%',
                    scopedSlots: { customRender: 'serviceType' },
				},
				{
					title: '服务ID',
                    dataIndex: 'serviceId',
                    width:'18%',
					scopedSlots: { customRender: 'serviceId' },
                },
                {
					title: '描述',
                    dataIndex: 'serviceDescribe',
                    width:'18%',
					scopedSlots: { customRender: 'serviceDescribe' },
                },
                {
					title: '服务类地址',
                    dataIndex: 'serviceAddress',
                    width:'18%',
					scopedSlots: { customRender: 'serviceAddress' },
                },
                {
					title: '最后修改时间',
                    dataIndex: 'updateTime',
                    width:'18%',
				},
				{
					title: '操作',
					dataIndex: 'operation',
					width: 200,
					scopedSlots: { customRender: 'operation' },
				},
            ],
            saveSatus: ''
        };
    },
    watch: {
	},
	created () {
	},
    methods: {
        handleAdd() {
            const { dataSource } = this;
            const newData = {
                serviceType: ``,
                serviceId: ``,
                serviceDescribe: ``,
                serviceAddress: ``,
            };
            this.pagination.total += 1
            this.dataSource = [...dataSource, newData];
            this.saveSatus = 'add'
        },
        showDrawer(record) {
            this.visible = true;
            this.params.page = 0
            this.params.companyDicId = record.id
            this.record = record
            this.findPageList()
        },
		handleReset() {
			this.visible = false;
        },
		onSumbit (record) {
            record.companyDicId = this.record.id
            if (this.saveSatus === 'add') {
                insert(record).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('添加成功')
                        this.findPageList()
                    } else {
                        this.$message.error('添加失败')
                    }
                })
            } else {
                update(record).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('修改成功')
                        this.findPageList()
                    } else {
                        this.$message.error('修改失败')
                    }
                })
            }
            this.saveSatus = ''
			this.visible = false;
		},
		findPageList () {
            this.loading = true;
            findPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
		},
		onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.id === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        onDelete(record) {
            delDict({id:record.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        pageChange (value) {
            this.params.page = value-1
            this.findPageList()
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