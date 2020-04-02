<template>
    <div class="form_dialog">
      <a-drawer
          :title="title"
          placement="right"
          :closable="false"
          @close="handleReset"
          :visible="visible"
          destroyOnClose
          :width="820"
          >
          <a-form :form="form" layout="vertical" hideRequiredMark>
              <a-row :gutter="16">
                  <a-col :span="24">
                      <timeTable :record="record"></timeTable>
                  </a-col>
              </a-row>
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
                  <a-button :style="{marginRight: '8px'}" @click="handleReset">
                      取 消
                  </a-button>
              </div>
          </a-form>
      </a-drawer>
    </div>
  </template>
  <script>
  import { listAssign } from '@/util/util'
  import timeTable from './timeTable.vue'
  export default {
      components: {
        timeTable
      },
      data() {
          return {
              visible: false,
              tasks: [],
              disabled: false,
              title: '添加',
              form: this.$form.createForm(this),
              handle: '',
              record: {},
              dialogParam: {
                  handle: '',
              }
          };
      },
      watch: {
      },
      created () {
      },
      methods: {
          showDrawer(record, handle) {
              this.visible = true;
              this.handle = handle;
              this.$store.dispatch("setRowLight", record.id)
              this.dialogParam.handle = handle;
              this.record = record
              setTimeout(() => {
                  let abc = this.form.getFieldsValue()
                  if (record) {
                      listAssign(abc, record)
                      this.form.setFieldsValue(abc)
                  }
              })
              if (handle === 'add') {
                  this.title = '添加'
              } else if (handle === 'view') {
                  this.title = '查看'
              } else if (handle === 'edit') {
                  this.title = '编辑'
                  this.disabled = true
              }
          },
          handleReset() {
              this.form.resetFields();
              this.visible = false;
              this.$store.dispatch("setRowLight", '')
              this.disabled = false
          },
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