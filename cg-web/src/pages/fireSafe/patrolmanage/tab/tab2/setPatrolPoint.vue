<template>
    <div class="form_dialog">
      <a-drawer
          :title="title"
          placement="right"
          :closable="false"
          @close="handleReset"
          :visible="visible"
          destroyOnClose
          :width="1000"
          >
          <a-form :form="form" layout="vertical" hideRequiredMark @submit="onSumbit">
              <a-row :gutter="16">
                  <a-col :span="24">
                      <patrolPointListHad :record="record"></patrolPointListHad>
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
                  <!-- <a-button html-type="submit" type="primary">提 交</a-button> -->
              </div>
          </a-form>
      </a-drawer>
    </div>
  </template>
  <script>
  import { listAssign } from '@/util/util'
  import patrolPointListHad from './patrolPointListHad.vue'
  export default {
      components: {
          patrolPointListHad
      },
      data() {
          return {
              visible: false,
              columns: [],
              title: '添加',
              form: this.$form.createForm(this),
              handle: '',
              record: {},
          };
      },
      watch: {
      },
      created () {
      },
      methods: {
          showDrawer(record, handle, columns) {
              this.visible = true;
              this.handle = handle;
              this.$store.dispatch("setRowLight", record.id)
              this.columns = columns.filter(item => item.dataIndex != 'operation');
              this.record = record
              setTimeout(() => {
                  let abc = this.form.getFieldsValue()
                  if (record) {
                      listAssign(abc, record)
                      this.form.setFieldsValue(abc)
                  }
              })
              if (handle === 'add') {
                    this.columns.forEach(s=>{
                        s.addDisabled?s.disabled=true:s.disabled=false
                    })
                    console.log('任务对象')
                    console.log(this.record)
                    this.title = '配置巡查点'
              }
          },
          handleReset() {
              this.form.resetFields();
              this.$store.dispatch("setRowLight", '')
              this.visible = false;
          },
          onSumbit () {
              this.form.validateFields((err, values) => {
                  console.log(values)
                  // if (this.record) {
                  // 	values = Object.assign(this.record,values)
                  // }
                  if (!err) {
                      this.$emit('submit', values, this.handle)
                      this.visible = false;
                  }
              });
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