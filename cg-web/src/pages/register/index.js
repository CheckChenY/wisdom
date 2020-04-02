import { registerSubmit,addFile,findDictList,checkPhone } from "@/api/public"
import MapGetPoint from "./mapgetpoint.vue"
import { isvalidatemobile } from "@/util/validate"
import { encryption } from '@/util/util'
export default {
    name: "register",
    components: {
        MapGetPoint,
    },
    data () {
        return {
            loading: false,
            orgImg: '',
            options: [],
            tipText:'获取验证码',
            daojishi:false,
            timer:'',
            mapvisible:false,
            position:'',
            regionIdValue:[], 
            fileName:'',
            disabled: false,
        };
    },
    watch: {
    },
    created () { 
        this.getArea()
    },
    mounted () {
        
    },
    computed: {
        
    },
    props: [],
    beforeCreate() {
        this.form1 = this.$form.createForm(this, { name: 'register' });
    },
    destoryed(){
        this.daojishi=false
        clearInterval(this.timer)
    },
    methods: {
        getArea(){
            findDictList({type:'area_type'}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    if(res.data.value.length){
                        res.data.value.forEach(o=>{
                            if(o.children.length){
                                o.children.forEach(p=>{
                                    if(p.children.length){
                                        p.children.forEach(q=>{
                                            if(!q.children.length){
                                                delete q.children
                                            }
                                        })
                                    }else{
                                        delete p.children
                                    }
                                })
                            }else{
                                delete o.children
                            }
                        })
                    }
                    this.options=res.data.value
                }
            })
        },
        getPosition(posi){
            console.log(posi)
            this.position=posi
            // this.form.setFieldsValue({
            //     position:posi,
            // });
        },
        cancel(){
            this.mapvisible=false
        },
        getPoint(){
            console.log(1)
            this.mapvisible=true
        },
        getCode(){
            if(!this.daojishi){
                let phone=this.form1.getFieldValue('phone')
                if(isvalidatemobile(phone)[0]){
                    this.$message.error(isvalidatemobile(phone)[1])
                    return
                }
                let obj = {
                    phone:phone
                }
                this.daojishi=true
                var time=60
                this.timer=setInterval(()=>{
                    this.tipText=(time--)+'秒'
                    console.log(time)
                    if(time<0){
                        this.tipText='重新获取'
                        clearInterval(this.timer)
                        this.daojishi=false
                    }
                },1000)
                checkPhone(obj).then(res=>{
                    console.log(res)
                })
            }
        },
        onChange(value) {
            console.log(value[value.length-1])
            this.regionId=value[value.length-1]
        },
        orgTypeSelectChange(a){
            console.log(a)
        },
        handleSubmit(e){
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                console.log(!err)
                if (!err) {
                    if(!this.regionId){
                        this.$message.error('请选择所在地区');
                        return
                    }
                    if(!this.position){
                        this.$message.error('请选取地理位置');
                        return
                    }
                    if(!this.fileName){
                        this.$message.error('请上传营业执照或组织机构代码证');
                        return
                    }
                    if(values.password!=values.passwordAgain){
                        this.$message.error('两次密码输入不一致');
                        return
                    }
                    this.submit(values)
                }
            });
        },
        submit(obj){
            obj.id=''
            obj.regionId=this.regionId
            obj.orgImg=this.fileName
            obj.position=this.position
            const user = encryption({
                data: obj,
                type: 'Aes',
                key: 'jintelai12345678',
                param: ['password']
            });
            this.disabled = true
            registerSubmit(user).then(res=>{
                this.disabled = false
                console.log(res.data)
                if(res && res.data && res.data.success){
                    this.form1.resetFields()
                    this.regionIdValue=[]
                    this.position=''
                    this.fileName=''
                    this.regionId=''
                    this.$message.success('注册成功')
                    this.$router.push({path:'/login'})
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        beforeUpload(file) {
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('上传文件大小不能超过2M!');
                return false
            }
            formData.append('file',file)
            addFile(formData).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.fileName=res.data.value.fileName
                    this.orgImg = this.$imgUrl + res.data.value.fileName
                }else{
                    this.fileName=''
                }
            })
        },
        login(){
            this.$router.push({path:'/login'})
        }
    }
}