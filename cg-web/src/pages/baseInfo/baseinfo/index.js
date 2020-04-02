import { addFile,findDictList,findOrgByUserId,findProvince } from "@/api/public"
import { unCheckedUpdate } from "@/api/user"
import MapGetPoint from "./mapgetpoint.vue"
export default {
    name: "register",
    components: {
        MapGetPoint,
    },
    data () {
        return {
            data:{},
            loading: false,
            options: [],
            mapvisible:false,
            position:'',
            regionIdValue:[], 
            fileName:'',
            province:'',
            regionId:''
        };
    },
    watch: {
    },
    created () { 
        this.findOrgByStatus()
        this.getArea()
    },
    mounted () {},
    computed: {},
    props: [],
    beforeCreate() {
        this.form1 = this.$form.createForm(this, { name: 'register' });
    },
    destoryed(){
    },
    methods: {
        findOrgByStatus(){
            findOrgByUserId().then(res=>{
                console.log( res.data.value)
                if(res && res.data && res.data.success){
                    this.data = res.data.value
                    this.position=res.data.value.position
                    this.regionId=res.data.value.regionId
                    this.fileName = res.data.value.orgImg?this.$imgUrl + res.data.value.orgImg:null
                    this.getfindProvince(res.data.value.regionId)
                }
            })

        },
        getfindProvince(id){
            let obj = {
                regionId:id
            }
            findProvince(obj).then(res=>{
                console.log( res )
                if(res && res.data && res.data.success){
                    let data = res.data.value;
                    if(data.length){
                        this.province = data[0].province + '/' + data[0].city + '/' + data[0].county
                    }
                }
            })
        },
        getArea(){
            findDictList({type:'area_type'}).then(res=>{
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
            this.position=posi
            console.log(this.position)
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
        onChange(value) {
            console.log(value)
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
                    this.submit()
                }
            });
        },
        submit(){
            this.data.regionId=this.regionId
            this.data.position=this.position
            unCheckedUpdate(this.data).then(res=>{
                console.log(res.data)
                if(res && res.data && res.data.success){
                    this.regionIdValue=[]
                    this.position=''
                    this.fileName=''
                    this.regionId=''
                    this.$message.success('修改成功')
                }else{
                    this.$message.success(res.data.errorMsg)
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
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.fileName=this.$imgUrl+res.data.value.fileName
                }else{
                    this.fileName=''
                }
            })
        }
    }
}