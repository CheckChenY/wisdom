import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View,Image,AsyncStorage, KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';


class Content extends Component{
  render(){
    return(
      <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:5 }}>
        <View>
          <Text style={{ textAlign: 'right', lineHeight: 25,color:'#333',fontSize:16 }}>{this.props.left}</Text>
        </View>
        <View style={{ width: '60%'}}>
          <Text style={{ lineHeight: 25,fontSize:14,color:'#666' }}>{this.props.right}</Text>
        </View>
      </View>
    )
  }
}

class CaseDealRecordDetail extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
        headerTitle: (
            <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:18 }}>处理记录</Text>
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
      isopen:false,
      obj:{},
      warnState:{
        '0':'正常',
        '1':'报警',
        '2':'故障',
        '3':'报警&故障',
        '4':'离线',
      },
      warnLevel:{
        '0':'无报警',
        '1':'一般',
        '2':'重要',
        '3':'严重',
      },
      systemDic:[],
      deviceDic:[],
      buildingDic:[],
      floorDic:[],
      warnConfirmType:{
        '0':'真实火警',
        '1':'异常',
        '2':'误报',
        '3':'测试',
      },
      userDic:{}
    }
  }
  render() {
    let paramsdetail=null
    if(this.state.isopen){
      paramsdetail=<View style={{ flexDirection: 'row',paddingTop:5,paddingBottom:5 }}>
      <View style={{ width: '70%' }}>
        <Content left='压力参数：' right='0.04Mpa'/>
        <Content left='上限阈值：' right='1.0Mpa'/>
        <Content left='下限阈值：' right='0.2Mpa'/>
      </View>
      <View style={{ width: '30%'}}></View>
    </View>
    }else{
      paramsdetail=null
    }
    return (
      <KeyboardAvoidingView enabled>
        <ScrollView>
        <View style={styles.tit}>
            <Text style={{color:'#3AA1FE',fontSize:16}}>设备信息</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5,paddingBottom:5}}>
            <View style={{ width: '70%' }}>
              <Content left='设备名称：' right={this.state.obj.deviceName}/>
              <Content left='设备类型：' right={this.state.deviceDic[this.state.obj.deviceType]}/>
              <Content left='所属系统：' right={this.state.systemDic[this.state.obj.systemId]}/>
              <Content left='所在建筑：' right={this.state.buildingDic[this.state.obj.buildingId]}/>
              <Content left='所在楼层/区域：' right={this.state.floorDic[this.state.obj.floorId]}/>
              <Content left='具体位置：' right={this.state.obj.location}/>
            </View>
            <View style={{ width: '30%',alignItems:'center',marginTop:20,paddingRight:10}}>
              <Image style={styles.logo} source={{uri:this.state.obj.warnLocaleConfirmPhoto}}/>
            </View>
          </View>
          <View style={styles.tit}>
            <Text style={{color:'#3AA1FE',fontSize:16}}>设备状态</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5,paddingBottom:5 }}>
            <View style={{ width: '70%' }}>
              <Content left='上报时间：' right={this.state.obj.createTime}/>
              <Content left='状态描述：' right={this.state.warnState[this.state.obj.warnState]}/>
              <Content left='警情程度：' right={this.state.warnLevel[this.state.obj.warnLevel]}/>
            </View>
            <View style={{ width: '30%'}}></View>
          </View>
          <TouchableOpacity onPress={()=>{this.getparams()}}>
            <View style={styles.tit}>
              <Text style={{color:'#3AA1FE',fontSize:16}}>设备参数</Text>
              <FontAwesome color="#999" name={this.state.isopen?'angle-up':'angle-down'} size={28}/>
            </View>
          </TouchableOpacity>
          {paramsdetail}
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('curve', {deviceId:1})}>
            <View style={styles.tit}>
              <Text style={{color:'#3AA1FE',fontSize:16}}>参数曲线</Text>
              <FontAwesome color="#999" name='angle-right' size={28}/>
            </View>
          </TouchableOpacity>
          <View style={styles.tit}>
            <Text style={{color:'#3AA1FE',fontSize:16}}>警情处理</Text>
          </View>
          <View style={{paddingBottom:6,paddingTop:10,flexDirection:'row',paddingLeft:20}}>
            <View style={{justifyContent:'center'}}>
              <Text style={{color:'#333',fontSize:16}}> 处理时间：</Text>
            </View>
            <View>
                <Text style={{color:'#666',fontSize:14}}>{this.state.obj.dealTime}</Text>
            </View>
          </View>
          <View style={{paddingBottom:6,flexDirection:'row',paddingLeft:20}}>
            <View style={{justifyContent:'center'}}>
              <Text style={{color:'#333',fontSize:16}}> 处理人：</Text>
            </View>
            <View>
                <Text style={{color:'#666',fontSize:14}}>{this.state.userDic[this.state.obj.warnHandler]}</Text>
            </View>
          </View>
          <View style={{paddingBottom:6,flexDirection:'row',paddingLeft:20}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:'red'}}>*</Text><Text style={{color:'#333',fontSize:16}}> 警情确认：</Text>
            </View>
            <View style={{justifyContent:'center'}}>
                <Text style={{color:'#666',fontSize:14}}>{this.state.warnConfirmType[this.state.obj.warnConfirmType]}</Text>
            </View>
          </View>
          <View style={{paddingBottom:6,flexDirection:'row',paddingLeft:20}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'red'}}>*</Text><Text style={{color:'#333',fontSize:16}}> 现场报警图：</Text>
            </View>
            <View>
              <View style={{width:100,height:100}}>
                <Image style={styles.img} source={{uri:this.state.obj.warnLocaleConfirmPhoto}}/>
              </View>
            </View>
          </View>
          <View style={{paddingBottom:6,flexDirection:'row',paddingLeft:20}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'red'}}>*</Text><Text style={{color:'#333',fontSize:16}}> 处理描述：</Text>
            </View>
            <View style={{width:'70%'}}>
              <Text style={{color:'#666',fontSize:14,lineHeight:20}}>{this.state.obj.warnDealDes} </Text>
            </View>
          </View>
          <View style={{paddingBottom:6,flexDirection:'row',paddingLeft:20}}>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
              <Text style={{color:'red'}}>*</Text><Text style={{color:'#333',fontSize:16}}> 处理结果图：</Text>
            </View>
            <View>
              <View style={{width:100,height:100}}>
                <Image style={styles.img} source={{uri:this.state.obj.warnDealResultPhoto}}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount(){
    FetchManager.get('1/user/findAllUser',{}, (set) => {
      var userDic={}
      set.forEach(s=>{
          userDic[s.id]=s.realName
      })
      this.setState({
          userDic:userDic
      })
    })
    getAllFloor().then(res=>{
      console.log(res)
      var buildingDic={}
      if(res.length){
        res.forEach(s=>{
          buildingDic[s.value]=s.label
        })
      }
      this.setState({
        buildingDic:buildingDic
      })
    })
    getSystem().then(res=>{
      var systemDic={}
      if(res.length){
        res.forEach(s=>{
          systemDic[s.value]=s.label
        })
      }
      this.setState({
        systemDic:systemDic
      })
    })
    getDevice().then(res=>{
      var deviceDic={}
      if(res.length){
        res.forEach(s=>{
          deviceDic[s.value]=s.label
        })
      }
      this.setState({
        deviceDic:deviceDic
      })
    })
    
    //请求数据
    var query={}
    FetchManager.get('1/devicealertdeal/'+this.props.navigation.state.params.ID,query, async (set) => {
      set.data.createTime=set.data.createTime.replace('T',' ')
      if(!(parseInt(set.code))){
        this.setState({
          obj:set.data
        })
        //根据buildingId获取字典表
        getSigleFloor(set.data.buildingId).then(res=>{
          console.log(res)
          var floorDic={}
          if(res.length){
            res.forEach(s=>{
              floorDic[s.value]=s.label
            })
          }
          this.setState({
            floorDic:floorDic
          })
          console.log(this.state.floorDic)
        })
      }else{
        // this._signOut();
      }
      },(err)=>{
        console.log(err)
        // this._signOut();
      })
  }


  // _signOut = async () => {
  //   let userName = await AsyncStorage.getItem('user');
  //   let deviceToken = await AsyncStorage.getItem('deviceToken');

  //   let obj = {
  //       userName:userName,
  //       deviceToken:deviceToken
  //   }
  //   FetchManager.get('1/um/destory',obj, async (set) => {
  //       console.log(set)
  //       await AsyncStorage.clear();
  //       this.props.navigation.navigate('SignIn');
  //   })
  // }


  getparams=()=>{
    this.setState({
      isopen:!this.state.isopen
    })
  }
}
export default CaseDealRecordDetail;
const styles = StyleSheet.create({
  tit: {
    height: 41,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#F2F7FB',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  logo:{
    width:105,
    height:95
  },
  img:{
      width:'100%',
      height:'100%'
  }
})