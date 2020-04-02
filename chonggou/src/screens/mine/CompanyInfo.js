import React, { Component } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Image} from 'react-native'
import FetchManager from '../fetch/index';
import Select from '../components/select/selectobj';
import ModelPop from '../components/modelPop';

class Content extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row',marginTop:10}}>
                <View style={{width:140}}>
                    <Text style={{fontSize:14,color:'#333',textAlign:'right'}}>{this.props.left}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color:'#666',fontSize:14,lineHeight:20,justifyContent:'center'}}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

export default class CompanyInfo extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // const { checkState } = navigation.state.params;
        // console.log(checkState)
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>单位信息</Text>
            ),
            headerRight: ( <Text />
                // <Text style={{ paddingRight: 15 }}>
                //     <Text style={{ color: '#fff', fontSize: 15 }}>
                //         {
                //             checkState === 0 ? '未审核' : 
                //             checkState === 1 ? '已审核' : 
                //             checkState === 2 ? '重新注册' : ''
                //         }
                //     </Text>
                // </Text>
            ), 
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
                height: 50
            }
        };
    };
    constructor(props) {
        super(props)
        this.state={
            typelist:[
                {label:'使用性质(全部)',value:0},
                {label:'社会单位',value:'1'},
                {label:'监管单位',value:'2'},
                {label:'总公司',value:'3'},
                {label:'代理商',value:'4'},],
            defaultType:"使用性质(全部)",
            orgType:0,

            orgName:'',
            orgCode:'',
            address:'',
            position:'',
            legalPerson:'',
            
            legalPersonPhone:'',
            businessScope:'',
            phone:'',

            editable:false,

            itemData:{}
            
        }
    }


    componentDidMount(){
        this.getCompanyInfo();
    }
    
    getCompanyInfo = () => {
        FetchManager.get('/company/inner/jtlCompany/findOrgByUserId','', async (set) => {
            console.log(set)
            if(set.success){
                let data = set.value;
                this.setState({
                    itemData:data,
                    checkState:data.checkState,
        
                    orgName:data.orgName,
                    orgCode:data.orgCode,
                    address:data.address,
                    position:data.position,
                    legalPerson:data.legalPerson,
        
                    
                    legalPersonPhone:data.legalPersonPhone,
                    businessScope:data.businessScope,
                    userName:data.userName,
                    orgType:data.orgType,
                    defaultType:data.orgType === '1' ? '社会单位' :
                                data.orgType === '2' ? '监管单位' :
                                data.orgType === '3' ? '总公司' :
                                data.orgType === '4' ? '代理商' : '',
                })
            }
        })
    }

    onChangeType = (item) =>{
        this.setState({
            defaultType:item.label,
            orgType:item.value
        })
    }

    getChangeWord = (item,val) => {
        const { orgName,orgCode,address,position,legalPerson,
            legalPersonPhone,businessScope,userName,defaultType } = this.state;
        this.setState({
            orgName:item === 'orgName' ? val : orgName,
            orgCode:item === 'orgCode' ? val : orgCode,
            address:item === 'address' ? val : address,
            legalPerson:item === 'legalPerson' ? val : legalPerson,

            
            legalPersonPhone:item === 'legalPersonPhone' ? val : legalPersonPhone,
            businessScope:item === 'businessScope' ? val : businessScope,
            userName:item === 'userName' ? val : userName,
            defaultType:item === 'defaultType' ? val : defaultType,
        })
    }

    submit = () =>{
        const { orgName,orgCode,address,legalPerson,orgType,
            legalPersonPhone,businessScope,userName,itemData,checkState } = this.state;
            if(checkState === 1){
                return false
            }
            itemData.orgName = orgName;
            itemData.orgCode = orgCode;
            itemData.address = address;
            itemData.legalPerson = legalPerson;
            itemData.legalPersonPhone = legalPersonPhone;
            itemData.businessScope = businessScope;
            itemData.userName = userName;
            itemData.orgType = orgType;

            console.log(itemData)
            // if(checkState === 2){
                ///company
                // FetchManager.post('/company/inner/jtlCompany/insert',itemData, async (set) => {
                //     console.log(set)
                //     if(set.success){
                //         this.popUp.showPop('注册成功')
                //     }
                // },'liu')
            // }else if(checkState === 0){
            FetchManager.post('/company/inner/jtlCompany/unCheckedUpdate',itemData, async (set) => {
                console.log(set)
                if(set.success){
                    this.setState({
                        checkState:1
                    })
                    this.popUp.showPop('注册成功')
                }
            })
            // }
    }


    render() {
        const { orgName,orgCode,defaultType,address,legalPerson,
            legalPersonPhone,businessScope,userName,typelist,editable,phone,itemData,checkState } = this.state;
        return (
            <ScrollView>
                <View style={{padding:10}}>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                    {/* 单位名称 */}
                    <InputView 
                        label={'单位名称'} 
                        name={'orgName'}
                        value={orgName}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />
                    {/* 机构代码 */}
                    <InputView 
                        label={'机构代码'} 
                        name={'orgCode'}
                        value={orgCode}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />


                    {/* 单位类型 */}
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '30%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ color: '#FD3E3C' }}>* </Text>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>
                                    单位类型:
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: '67%',marginLeft:10,flexDirection:'row', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED',width:'50%' }}>
                            <View style={{flex:1}}>
                                <Select
                                    options={typelist} 
                                    onSelect={this.onChangeType}
                                    defaultValue={defaultType}
                                    downMarginTop={15}
                                    dropdownWidth={130}
                                />
                            </View>
                            <View style={{width:30}}></View>
                        </View>
                    </View>



                    {/* 所在地区 */}
                    {/* <InputView 
                        label={'所在地区'} 
                        name={'address'}
                        value={address}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    /> */}

                    {/* 单位地址 */}
                    <InputView 
                        label={'单位地址'} 
                        name={'address'}
                        value={address}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />

                    {/* 法人/负责人 */}
                    <InputView 
                        label={'法人/负责人'} 
                        name={'legalPerson'}
                        value={legalPerson}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />

                    {/* 法人/负责人电话 */}
                    <InputView 
                        label={'法人/负责人电话'} 
                        name={'legalPersonPhone'}
                        value={legalPersonPhone}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />

                    {/* 经营范围 */}
                    <InputView 
                        label={'经营范围'} 
                        name={'businessScope'}
                        value={businessScope}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />

                    {/* 联系人姓名 */}
                    <InputView 
                        label={'联系人姓名'} 
                        name={'userName'}
                        value={userName}
                        onChangeWord = {this.getChangeWord}
                        editable={editable}
                    />

                    {/* 登录名
                    <InputView 
                        label={'登录名'} 
                        name={'userName'}
                        value={userName}
                        onChangeWord = {this.getChangeWord}
                        editable={true}
                    /> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: '30%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>联系人电话:</Text>
                            </View>
                        </View>
                        <View style={{ width: '67%' }}>
                            <Text>
                                {itemData.phone}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                        <View style={{width:'30%'}}><Text style={{textAlign:'right'}}>*证件上传:</Text></View>
                        <View style={{width:'67%',marginLeft:10}}>
                            <Image style={{width:60,height:60}}
                            source={{uri:itemData.orgImg ? 'http://192.168.0.186:60080/' + itemData.orgImg : ''}} />
                        </View>
                    </View>

                    <View>
                        <Text style={{lineHeight:18,padding:20}}>
                            格式要求：

                                1.企业用户上传营业执照；非企业用户上传组织机构代码证。

                                2.证书原件，复印件不可用，证书文字、印章清晰可见。

                                3.要求JPG、JPEG或PNG格式。大小小于2M

                                4.上传电子扫描件

                        </Text>
                    </View>



                    <View style={{paddingLeft:15,paddingRight:15,marginTop:45,paddingBottom:20}}>
                        <TouchableOpacity onPress={()=>{this.submit()}}>
                            <View style={{height:45,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                                <Text style={{color:checkState === 1 ? '#ccc' : '#fff',fontSize:18}}>
                                    {
                                        checkState === 0 ? '未审核' : 
                                        checkState === 1 ? '已审核' : 
                                        checkState === 2 ? '重新注册' : ''
                                    }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title_icon:{
        position:'absolute',
        top:12,
        right:10
    },
    input_box: { 
        borderWidth: 1, 
        borderColor: '#D9E4ED', 
        padding: 0, 
        borderRadius: 3, 
        fontSize: 14, 
        padding: 3, 
        color: '#999', 
        backgroundColor: '#F2F7FB' 
    }
});


class InputView extends Component{
    // {/* 所在建筑 */}

    onChangeWord = (val) => {
        console.log(val)
        const { onChangeWord,name } = this.props;
        onChangeWord(name,val)
    }

    render(){
        const { label,editable,value,bol } = this.props;
        return(
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <View style={{ width: '30%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        
                        {
                            bol ? <Text /> : <Text style={{ color: '#FD3E3C' }}>* </Text>
                        }
                        <Text style={{ textAlign: 'right', lineHeight: 20, color: '#333', fontSize: 15 }}>{label}:</Text>
                    </View>
                </View>
                <View style={{ width: '67%', borderWidth: 1, borderRadius: 3, borderColor: '#D9E4ED' }}>
                    <TextInput
                        editable={editable}
                        value={value + ''}
                        onChangeText={ this.onChangeWord }
                        style={styles.input_box}></TextInput>
                </View>
            </View>
        )
    }
}