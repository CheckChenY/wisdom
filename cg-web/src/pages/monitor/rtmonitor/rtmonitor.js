import UnitSelect from "@/components/selectUnit"
import rtmonitortop from './rtmonitortop.vue';
import rtmonitorlist from './rtmonitorlist.vue';
export default {
    components:{
        UnitSelect,
        rtmonitortop,
        rtmonitorlist,
    },
    data () {
        return{
            orgId:'',
        }
    },
    beforeCreate () {

    },
    created(){
    },
    computed: {
    },
    methods:{
        getOrgId(orgId){
            this.orgId=orgId
        },
    }
}