import React, { Component } from "react";
import { Text, View,Image,TextInput, KeyboardAvoidingView,StyleSheet,TouchableOpacity,ScrollView } from "react-native";


class Content extends Component{
  render(){
    return(
      <View style={{ flexDirection: 'row',paddingLeft:20,marginBottom:5 }}>
        <View>
          <Text style={{ textAlign: 'right',color:'#333',fontSize:16 }}>{this.props.left}</Text>
        </View>
        <View style={{ width: '60%'}}>
          <Text style={{ lineHeight: 25,color:'#666',fontSize:14 }}>{this.props.right}</Text>
        </View>
      </View>
    )
  }
}

class MonitorCaseDeal extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
        headerTitle: (
            <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>设备状态</Text>
        ),
        headerRight:(
            <Text></Text>
        ),
        headerLeft:(
            <Text style={{paddingLeft:20}} onPress={()=>navigation.goBack()}>
                <Text style={{color:'#fff',marginLeft:12,fontSize:15}}>返回</Text>
            </Text>
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
      case:''
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
              <Content left='设备名称：' right='XXX设备名X设备名称XXX'/>
              <Content left='设备类型：' right='XXX设备类型XXX'/>
              <Content left='所属系统：' right='消防用水系统01'/>
              <Content left='所在建筑：' right='大通工业园3号楼'/>
              <Content left='所在楼层/区域：' right='顶层'/>
              <Content left='具体位置：' right='消防水箱'/>
            </View>
            <View style={{ width: '30%',alignItems:'center',marginTop:20,paddingRight:10}}>
              <Image style={styles.logo} source={require('../../img/img_02.png')}/>
            </View>
          </View>
          <View style={styles.tit}>
            <Text style={{color:'#3AA1FE',fontSize:16}}>设备状态</Text>
          </View>
          <View style={{ flexDirection: 'row',paddingTop:5,paddingBottom:5 }}>
            <View style={{ width: '70%' }}>
              <Content left='上报时间：' right='2019.01.01  12:21:01'/>
              <Content left='状态描述：' right='下限报警'/>
              <Content left='警情程度：' right='严重'/>
            </View>
            <View style={{ width: '30%'}}></View>
          </View>
          <TouchableOpacity onPress={()=>{this.getparams()}}>
            <View style={styles.tit}>
              <Text style={{color:'#3AA1FE',fontSize:16}}>设备参数</Text>
            </View>
          </TouchableOpacity>
          {paramsdetail}
          <View style={styles.tit}>
            <Text style={{color:'#3AA1FE',fontSize:16}}>参数曲线</Text>
          </View>
          {/* <View style={{paddingLeft:20,paddingRight:20,height:50,marginTop:52}}>
                <TouchableOpacity>
                    <View style={{height:'100%',backgroundColor:'#3AA1FE',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:18}}>确认</Text>
                    </View>
                </TouchableOpacity>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  getparams=()=>{
    this.setState({
      isopen:!this.state.isopen
    })
  }
}
export default MonitorCaseDeal;
const styles = StyleSheet.create({
  tit: {
    height: 41,
    paddingLeft:20,
    backgroundColor: '#F2F7FB',
    justifyContent: 'center'
  },
  logo:{
    width:105,
    height:95
  }
})