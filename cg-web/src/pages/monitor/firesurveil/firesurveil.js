import buildingtree from "@/components/buildingtree"
import firesurveilDialog from "./firesurveilDialog"
import firesurveilLive from "./firesurveilLive"
import firesurveilReplay from "./firesurveilReplay"
import { findCameraPageList } from '@/api/devicemanage/devicemanage/caremalib'
import { mapGetters } from "vuex";
export default {
    components:{
        buildingtree,
        firesurveilDialog,
        firesurveilLive,
        firesurveilReplay
    },
    data () {
        return{
            dataSource: [],
            params:{
                page:0,
                size:100,
                floorId: null,
            },
            value: ''
        }
    },
    created(){
    },
    computed: {
        ...mapGetters([
            "orgInfo",
        ]),
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            findCameraPageList(this.params).then(res=>{
                if(res && res.data && res.data.success && res.data.value){
                    res.data.value.content.forEach(item => {
                        item.surroundingPhoto = this.$imgUrl + item.surroundingPhoto
                        item.modelPhoto = this.$imgUrl + item.modelPhoto
                        item.btna = 'a'+item.id
                        item.btnb = 'b'+item.id
                        item.btnc = 'c'+item.id
                    })
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
        },
        select (value) {
            this.params.floorId = value[0]
            this.getData()
        },
        onChange (param, record) {
            if (param.indexOf('a') != -1) {
                this.$refs.firesurveilDialog.showDrawer(record)
            } else if (param.indexOf('b') != -1) {
                this.$refs.firesurveilLive.showDrawer(record)
            } else if (param.indexOf('c') != -1) {
                this.$refs.firesurveilReplay.showDrawer(record)
            } 
        }
    }
}