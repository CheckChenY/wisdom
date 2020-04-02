import React, {Component} from 'react'
import {
    View,
    Text,
    Linking,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraComponent from '../components/cammer'
import FetchManager from '../fetch/index';
import Select from '../components/select/selectobj';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import ModelPop from '../components/modelPop';
let uploadNum = 1;
export default class OnesetUpload extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:18 }}>隐患上传</Text>
            ),
            headerRight:(
                <Text style={{paddingRight:15}}>
                    <Text style={{color:'#fff',fontSize:16}}  onPress={()=>navigation.navigate("UploadRecord")}>上传记录</Text>
                </Text>
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
            focus:false,
            buildList:[],
            floorList:[],
            build:'',
            floor:'',
            builddefault:'请选择楼宇',
            floordefault:'请选择楼层',
            buildingId:'',
            floorId:'',
            buildDic:[],
            floorDic:[],
            selectfloor:'请选择楼层',
            isopen:false,
            language:'',
            imgBase:'',
            position:'',
            popUp: '',
            desc:'',
            phoneStatus:false
        }
        this.buildselect=this.buildselect.bind(this)
        this.floorselect=this.floorselect.bind(this)
    }
    render(){
        let selector=null
        if(this.state.focus){
            selector=<View style={{elevation:1000,Zindex:1000,flexDirection:'row',height:200,backgroundColor:'#ccc',borderColor:'#ccc',borderRadius:4,borderWidth:1}}>
                <FlatList data={this.state.build} renderItem={({item})=>
                    <TouchableOpacity onPress={()=>{this.selectbuild(item)}}>
                        <View style={{elevation:1000,Zindex:1000,height:50,justifyContent:'center',alignItems:'center'}}>
                            <Text>{item}</Text>
                        </View>
                    </TouchableOpacity>
                }/>
                <FlatList data={this.state.floor} renderItem={({item})=>
                    <TouchableOpacity onPress={()=>{this.selectfloor(item)}}>
                        <View style={{height:50,justifyContent:'center',alignItems:'center'}}>
                            <Text>{item}</Text>
                        </View>
                    </TouchableOpacity>
                }/>
            </View>
        }else{
            selector=null
        }

        let tip=<Text>请选择位置</Text>
        if(this.state.selectbuild){
            tip=<Text>{this.state.selectbuild+this.state.selectfloor}</Text>
        }
        return(
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <TouchableOpacity onPress={Keyboard.dismiss}>
                    <View style={styles.body}>
                        <View style={styles.box}>
                            <View style={styles.tit}>
                                <Text style={styles.red}>*</Text><Text style={{color:'#333',fontSize:16}}>现场图片：</Text>
                            </View>
                            <CameraComponent  getImgBase={this.getImgBase}/>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.tit}>
                                <Text style={styles.red}>*</Text><Text style={{color:'#333',fontSize:16}}>隐患描述：</Text>
                            </View>
                            <TextInput 
                                placeholder='请输入文字描述' 
                                multiline={true} 
                                style={{textAlignVertical:'top',width:'100%',lineHeight:20,height:67,borderColor:'#D9E4ED',borderRadius:3,borderWidth:1,padding:10}}
                                value={this.state.desc}
                                onChangeText={(desc) => this.setState({desc})}
                            ></TextInput>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.tit}>
                                <Text style={styles.red}>*</Text><Text style={{color:'#333',fontSize:16}}>所在位置：</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%',height:34,borderColor:'#D9E4ED',borderRadius:3,borderWidth:1}}>
                                <View style={{flex:1}}>
                                    <Select
                                        options={this.state.buildList} 
                                        onSelect={this.buildselect}
                                        defaultValue={this.state.builddefault}
                                        downMarginTop={6}
                                        dropdownWidth={130}
                                        />
                                </View>
                                <View style={{flex:1}}>
                                    <Select
                                        options={this.state.floorList} 
                                        downMarginTop={6}
                                        dropdownWidth={130}
                                        onSelect={this.floorselect}
                                        defaultValue={this.state.floordefault}/>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:10,elevation:10,Zindex:10}}>
                            <View style={styles.tit}>
                                <Text style={styles.red}>*</Text><Text style={{color:'#333',fontSize:16}}>具体位置：</Text>
                            </View>
                            <TextInput 
                                placeholder='请输入具体位置' 
                                multiline={true} 
                                style={{textAlignVertical:'top',height:56,justifyContent:'center',padding:10,borderColor:'#D9E4ED',borderRadius:3,borderWidth:1}}
                                value={this.state.position}
                                onChangeText={(position) => this.setState({position})}
                            />
                        </View>
                        <View style={{height:40,marginTop:40,flexDirection:'row',justifyContent:'space-around'}}>
                            <TouchableOpacity onPress={()=>this.linking()}>
                                <View style={{borderRadius:3,padding:10,paddingLeft:12,backgroundColor:'#FD3E3C',paddingRight:12,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <FontAwesome name="phone"  style={{paddingRight:10,fontSize:18,color:'#fff'}}/>
                                    <Text style={{fontSize:16,color:'#fff'}}>一键报警</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.success()}}>
                                <View style={{borderRadius:3,padding:10,paddingLeft:12,backgroundColor:'#3AA1FE',paddingRight:12,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <FontAwesome name="upload"  style={{paddingRight:10,fontSize:18,color:'#fff'}}/>
                                    <Text style={{fontSize:16,color:'#fff'}}>一键上传</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
            </ScrollView>
        )
    }
    floorselect=(item)=>{
        // console.log(item)
        this.setState({
            floorId:item.value,
            floor:item.label
        })
        // this.state.floorDic.forEach(s=>{
        //     if(s.label==item){
        //     }build:'',
            // floor:'',
        // })
    }
    buildselect=(item)=>{
        console.log(item)

        getSigleFloor(item.label).then(res=>{
            console.log(res)
            this.setState({
                floorList:res,
                buildingId:item.value,
                build:item.label
            })
        })
    }
    componentDidMount(){
        getAllFloor().then(res=>{
            console.log(res)
            this.setState({
                buildList:res
            })
        })
    }

    // getImgBase = (val) => {
    //     console.log(val)
    //     this.setState({
    //         imgBase:'data:image/jpg;base64,' + val
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

    
    linking=()=>{
        let tel = 'tel:10086114524524'// 目标电话
        Linking.canOpenURL(tel).then((supported) => {
            if (!supported) {
                console.log('Can not handle tel:' + tel)
            } else {
                return Linking.openURL(tel)
            }
        }).
        catch(error => console.log('tel error', error))
    }
    success=()=>{
        const { phoneStatus,buildingId,floorId,position,desc,imgBase } = this.state;
        let params={
            scenePhoto: imgBase,
            // source:1, // 1 一键上传  2 消防巡查
            buildingId:buildingId,
            floorId:floorId,
            position:position,
            hiddenDesc:desc,//隐患描述
        }

        console.log(params)
        if(!phoneStatus){
            this.popUp.showPop('请拍摄照片......')
            return
        }
        if(!params.hiddenDesc){
            this.popUp.showPop('请填写隐患描述......')
            return
        }
        if(!params.buildingId){
            this.popUp.showPop('请选择楼宇......')
            return
        }
        if(!params.floorId){
            this.popUp.showPop('请选择楼层......')
            return
        }
        if(!params.position){
            this.popUp.showPop('请输入具体位置......')
            return
        }
        // console.log(this.state.build + '/' + this.state.floor + '/' + this.state.imgBase + '/' + '/' + this.state.position)
        FetchManager.post('/safe/inner/safeHiddenTrouble/insert',params, async (set) => {
            console.log(set)
            // uploadNum = 1
            //下面的就是请求来的数据
            if(set.success){
                // console.log('添加成功safehiddentrouble  ', set)
                this.props.navigation.navigate('UploadSuccess',{
                    scenePhoto:this.state.imgBase,
                    build:this.state.build,
                    floor:this.state.floor,
                    position:this.state.position,
                    desc:this.state.desc
                })
                
            }
        })
        
    }
    focus=()=>{
        if(!this.state.isopen){
            this.setState({
                focus:true,
                isopen:true
            })
        }else{
            this.setState({
                focus:false,
                isopen:false
            })
        }
    }
    selectbuild=(item)=>{
        console.log(this)
        this.setState({
            selectbuild:item,
            floordefault:''
        })
    }
    selectfloor=(item)=>{
        console.log(item)
        this.setState({
            selectfloor:item
        })
    }
}
const styles=StyleSheet.create({
    body:{
        padding:15
    },
    tit:{
        height:20,
        flexDirection:'row',
        marginBottom:10
    },
    red:{
        color:'#FD3E3C',
        marginRight:10,
        fontSize:16
    },
    box:{
        marginBottom:20
    }
})