<template>
    <div style="width:70%;min-width:700px;margin:0 auto;padding:60px 0;padding-bottom:150px;">
        <div style="display:flex;height:60px;align-items: center;">
            <div style="width:33%;text-align: right;"><span style="color: red;">*&nbsp;</span>考勤开始时间：</div>
            <div style="width:33%" v-if="!editable">00:00</div>
            <div style="width:33%" v-if="editable">
                <a-time-picker style="width:100%;" placeholder="选择时间" format="HH:mm" v-model="startTime" @change="startTimeChange"/>
            </div>
            <div style="width:30%">（每天几点开始新一天的考勤）</div>
        </div>
        <div style="display:flex;height:60px;align-items: center;">
            <div style="width:33%;text-align: right;"><span style="color: red;">*&nbsp;</span>一天打卡次数：</div>
            <div style="width:33%" v-if="!editable">2次</div>
            <div style="width:33%" v-if="editable">
                <a-select style="width: 100%;" placeholder="打卡次数" v-model="times" @select="timesChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
            </div>
            <div style="width:30%">（1次上下班需要打卡2次）</div>
        </div>
        <div style="display:flex;height:60px;align-items: center;">
            <div style="width:33%;text-align: right;"><span style="color: red;">*&nbsp;</span>打卡间隔时间打下班卡：</div>
            <div style="width:33%" v-if="!editable">5小时0分钟</div>
            <div style="width:33%" v-if="editable">
                <a-select style="width: 100%;" placeholder="打卡间隔" v-model="steps" @select="stepsChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
            </div>
            <div style="width:30%">（防止误操作，误打下班卡）</div>
        </div>
        <div style="display:flex;justify-content: center;height:50px;align-items: center;margin-top:100px;">
            <a-button type="primary" @click="edit" style="width:200px;height: 40px;" v-if="!editable">编&nbsp;&nbsp;&nbsp;&nbsp;辑</a-button>
            <a-button type="primary" @click="cancel" style="width:200px;height: 40px;margin-right:100px;" v-if="editable">取&nbsp;&nbsp;&nbsp;&nbsp;消</a-button>
            <a-button type="primary" @click="submit" style="width:200px;height: 40px;" v-if="editable">确&nbsp;&nbsp;&nbsp;&nbsp;定</a-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            editable:false,
            steps:'',
            times:'',
            startTime:null,
            startTimeValue:''
        }
    },
    created(){
        
    },
    methods:{
        submit(){
            if(!this.startTimeValue){
                this.$message.error('请选择开始时间')
                return
            }
            if(!this.times){
                this.$message.error('请选择打卡次数')
                return
            }
            if(!this.steps){
                this.$message.error('请选择时间间隔')
                return
            }
            console.log(this.startTimeValue)
            console.log(this.times)
            console.log(this.steps)
        },
        cancel(){
            this.editable=false
        },
        edit(){
            this.editable=true
        },
        startTimeChange(date,dateString){
            console.log(dateString)
            this.startTime=date
            this.startTimeValue=dateString
        },
        timesChange(val){
            this.times=val
        },
        stepsChange(val){
            this.steps=val
        },
    }
}
</script>
<style lang='scss'>

</style>