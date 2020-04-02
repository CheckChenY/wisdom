<template>
  <div class="form_dialog">
    <a-drawer
        title="配置阈值"
        placement="right"
        :closable="false"
        @close="handleReset"
        :visible="visible"
		destroyOnClose
		:height="620"
        :width="500"
        ref="drawer"
        >
		<a-table bordered 
            :dataSource="dataSource" 
            :pagination="false"
            style="height:800px;overflow-y: scroll;"
            :loading="loading"
            :columns="columns">
			<template slot="thresholdValue" slot-scope="text, record">
                <a-col :span="18">
                    <editable-cell :text="text" :type="'number'" @change="onCellChange(record.thresholdDicCode, 'thresholdValue', $event)" />
                </a-col>
                <a-col :span="6" style="text-align:center">
                    {{record.unit}}
                </a-col>
            </template>
        </a-table>
        <div class="table-button">
            <a-button type="primary" @click="setThresh">
                提 交
            </a-button>
        </div>
    </a-drawer>
  </div>
</template>
<script>
import { findByLicence, insert } from "@/api/devicemanage/threshinit/threshset"
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
            loading: false,
            columns: [
				{
					title: '阈值名称',
                    dataIndex: 'thresholdDicDesc',
				},
				{
					title: '阈值',
					dataIndex: 'thresholdValue',
                    scopedSlots: { customRender: 'thresholdValue' },
                    width: 200,
				}
			],
        };
    },
    watch: {
	},
	created () {
	},
    methods: {
        showDrawer(record) {
			this.visible = true;
            this.record = record
            this.$store.dispatch("setRowLight", record.id)
            this.findByLicence()
        },
		handleReset() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
            this.dataSource = [];
        },
		findByLicence () {
            this.loading = true;
            let record = this.record
            findByLicence({licence:this.record.licence}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        Object.assign(item,record)
                        item.thresholdValue = item.thresholdValue
                        item.thresholdKey = item.thresholdDicCode
                    })
                    this.dataSource = res.data.value;
                }
                this.loading = false;
            })
        },
		setThresh () {
            console.log(this.dataSource)
            insert(this.dataSource).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('添加成功')
                } else {
                    this.$message.error('添加失败')
                }
            })
            this.visible = false;
            this.dataSource = [];
		},
		onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.thresholdDicCode === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
    },
};
</script>
<style lang='scss'>
.table-button {
    position: fixed;
    bottom: 20px;
    right: 60px;
}
</style>