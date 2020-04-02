<template>
    <div class="form_dialog">
        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="720"
            >
            <a-form :form="form" layout="vertical" hideRequiredMark>
                <a-row :gutter="16">
                    <a-col v-if="formData.noticeType == '1'" :span="12">
                        <a-form-item label="发布时间">
                            {{formData.sendTime}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="标题">
                            {{formData.acceptNoticeTitle}}
                        </a-form-item>
                    </a-col>
                    <a-col v-if="formData.noticeType == '1'" :span="12">
                        <a-form-item label="发布人">
                            {{formData.noticeUser}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="具体内容">
                            {{formData.acceptNoticeContent}}
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
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
                <!-- <a-button :style="{marginRight: '8px'}" @click="onHandle" type="primary">
                    前往处理
                </a-button> -->
            </div>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            formData:{}
        };
    },
    watch: {
    },
    methods: {
        showDrawer(record, handle) {
            console.log(record)
            this.$store.dispatch("setRowLight", record.id)
            this.visible = true;
            if (handle === 'add') {
                this.formEdit = false
                this.title = '添加'
            } else if (handle === 'view') {
                this.formEdit = true
                this.title = '消息查看'
                this.formData.sendTime = this.formData.createTime
                this.formData=record
            } else if (handle === 'edit') {
                this.formEdit = false
                this.title = '编辑'
            }
            
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        onHandle () {

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