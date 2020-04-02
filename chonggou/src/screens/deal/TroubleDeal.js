import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraComponent from '../components/cammer'
import FetchManager from '../fetch/index';
import Modal from "react-native-modal";
import ModelPop from '../components/modelPop';
import { getSystem,getDevice,getAllFloor,getSigleFloor,getReportUser } from '../components/getSystex';

import {
    View,
    Text,
    Image,
    Button,
    Alert,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import Radio from '../components/Radio';

class Item extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var required=null
        if(this.props.isrequired){
            required=<Text style={{color:'#FD3E3C'}}>* </Text>
        }
        return(
            <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#333',fontSize:16}}>{required}{this.props.left}</Text>
                </View>
                <View>
                    <Text style={{color:'#666',fontSize:14}}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}



export default class TroubleDeal extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:18 }}>隐患处理</Text>
            ),
            headerRight:(
                <Text></Text>
            ),
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };
    constructor(props){
        super(props)
        this.state={
            SelectList:[{label:'通过',check:true},{label:'未通过',check:false}],
            istrue:true,
            desc:'',
            imgBase:'',
            source:{
                '1':'一键上报',
                '2':'巡查上报'
            },
            floorDic:{},
            buildingDic:{},
            userDic:{},
            popUp: '',
            item:{},
            phoneStatus:false
        }
    }

    componentDidMount(){
        const { item } = this.props.navigation.state.params;
        this.setState({
            item:item
        })
    }



    render(){
        // const params=this.props.navigation.state.params;
        const { istrue,item } = this.state;
        // console.log(params)
        // var ischeck=null
        // if(this.state.istrue){
        //     ischeck=<View>
        //         <View style={{flexDirection:'row',marginTop:15}}>
        //             <View style={{flexDirection:'row'}}>
        //                 <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{color:'#333',fontSize:16}}> 处理描述：</Text>
        //                 <TextInput 
        //                     placeholder='请输入处理描述' 
        //                     multiline={true} 
        //                     style={{textAlignVertical:'top',width:'75%',height:60,fontSize:14,color:'#666',padding:3,borderRadius:1,borderWidth:1,borderColor:'#788A93'}}
        //                     value={this.state.desc}
        //                     onChangeText={(desc) => this.setState({desc})}
        //                 ></TextInput>
        //             </View>
        //         </View>
        //         <View style={{flexDirection:'row',marginTop:15}}>
        //             <View style={{flexDirection:'row'}}>
        //                 <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{color:'#333',fontSize:16}}> 处理结果图：</Text>
        //                 <View>
        //                     <CameraComponent  getImgBase={this.getImgBase.bind(this)}/>
        //                 </View>
        //             </View>
        //         </View>
        //     </View>
        // }
        // let imgObj = null
        // if (params.scenePhoto) {
        //     imgObj = <Image style={{width:88,height:88}} source={{uri:params.scenePhoto}}/>
        // }
        return(
            <ScrollView>
                <View style={{paddingLeft:15,paddingRight:15}}>
                    <Item left="上传时间：" right={item.createTime} isrequired={false}></Item>
                    <Item left="上传人员：" right={item.hiddenName} isrequired={false}></Item>
                    <Item left="隐患来源：" right={this.state.source[item.source]} isrequired={false}></Item>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#333',fontSize:16}}> 现场图片：</Text>
                            <Image style={{width:88,height:88}} source={{uri:'http://192.168.0.186:60080/' + item.scenePhoto}}/>
                        </View>
                    </View>
                    <Item left="隐患描述：" right={item.hiddenDesc} isrequired={false}></Item>
                    <Item left="所在位置：" right={item.buildingName +'  '+ item.floorName} isrequired={false}></Item>
                    <Item left="具体位置：" right={item.position} isrequired={false}></Item>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                            <Text style={{color:'#FD3E3C'}}>* </Text>
                            <Text style={{color:'#333',fontSize:16}}> 审核确认：</Text>
                        </View>
                        <View style={{width:'42%',height:20}}>
                            <Radio SelectList={this.state.SelectList} flx={'row'} select={this.select.bind(this)}></Radio>
                        </View>
                    </View>
                    {
                        istrue ? (
                            <View>
                                <View style={{flexDirection:'row',marginTop:15}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{color:'#333',fontSize:16}}> 处理描述：</Text>
                                        <TextInput 
                                            placeholder='请输入处理描述' 
                                            multiline={true} 
                                            style={{textAlignVertical:'top',width:'75%',height:60,fontSize:14,color:'#666',padding:3,borderRadius:1,borderWidth:1,borderColor:'#D9E4ED'}}
                                            value={this.state.desc}
                                            onChangeText={(desc) => this.setState({desc})}
                                        ></TextInput>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:15}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{color:'#333',fontSize:16}}> 处理结果图：</Text>
                                        <View>
                                            <CameraComponent  getImgBase={this.getImgBase.bind(this)}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ) : <Text />
                    }
                    <View style={{marginTop:38}}>
                        <TouchableOpacity onPress={()=>{this.submit()}}>
                            <View style={{height:45,backgroundColor:'#3AA1FE',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#fff',fontSize:18}}>确认</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
            </ScrollView>
        )
    }


    // getImgBase = (val) => {
    //     console.log(val)
    //     this.setState({
    //         imgBase:'data:image/jpg;base64,' +  val
    //     });
    // }

    getImgBase = (val) => {
        if (val) {
            let obj = {
                file:'data:image/jpg;base64,' + val
            }
            FetchManager.post('/pub/open/file/addImg',obj, async (set) => {
                //下面的就是请求来的数据
                console.log(set)
                if(set.success){
                    let data = set.value;
                    this.setState({
                        imgBase: data.fileName,
                        phoneStatus:true
                    })
                }else{
                    this.setState({
                        imgBase: data.fileName,
                        phoneStatus:false
                    }) 
                }
            })
        }
    }


    submit=()=>{
        const { istrue,imgBase,desc,item,phoneStatus } = this.state;
        let _params={
            id:item.id,
            hiddenStatus:1,
            auditStatus:istrue ? 1:2,
            hiddenDesc:item.hiddenDesc,
            handPhoto:imgBase,
            handDesc:desc
        }
        console.log(_params)
        if ( istrue && !_params.handDesc) {
            this.popUp.showPop('请填写处理内容......')
            return
        }
        if ( istrue && !phoneStatus) {
            this.popUp.showPop('请上传处理图片......')
            return
        }

        FetchManager.post('/safe/inner/safeHiddenTrouble/update',_params, async (set) => {
            console.log(set)
            if(set.success){
                this.popUp.showPop('处理成功......')
                setTimeout(()=>{
                    this.props.navigation.goBack()
                },3000)
            }
        })
    }

    //单选
    select=(e)=>{
        console.log(e)
        //判断是否通过
        if(e.label=='通过'){
            this.setState({
                istrue:true
            })
        }else{
            this.setState({
                istrue:false
            })
        }
        //单选处理
        this.state.SelectList.map((item,index)=>{
            item.check=false
            if(item.label==e.label){
                item.check=true
            }
        })
        this.setState({
            SelectList:this.state.SelectList
        })
    }
}