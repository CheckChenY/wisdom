import UnitSelect from "@/components/selectUnit"
import tab1 from './warnview/index'
import tab2 from './warnrecord/index'
import { getOrgDetail, findProvince } from '@/api/public'
export default {
    components:{
        UnitSelect,
        tab1,
        tab2,
    },
    data () {
        return{
            tabnum:1,
            orgId: '',
            form: {
                company:{}
            },
            region: ''
        }
    },
    created(){},
    methods:{
        onTabChange(key) {
            this.tabnum=key
        },
        getOrgId(orgId){
            this.orgId = orgId
            this.getOrgDetail(orgId.toString())
        },
        getOrgDetail (id) {
            getOrgDetail({type:2,orgId:id}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.company.orgImg = this.$imgUrl + res.data.value.company.orgImg
                    Object.assign(this.form, res.data.value)
                    this.findProvince(res.data.value.company.regionId)
                }
            })
        },
        findProvince (id) {
            findProvince({regionId:id}).then(res => {
                if (res && res.data && res.data.success) {
                    let place = res.data.value[0]
                    this.region = place.province + ',' + place.city + ',' + place.county
                }
            })
        }
    }
}