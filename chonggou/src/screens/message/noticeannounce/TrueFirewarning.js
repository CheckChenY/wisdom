import React, { Component } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, Image, Alert, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FetchManager from '../../fetch/index';
import StatusName from '../../components/statusName';
import DeviceName from '../../components/deviceName';
import SystemName from '../../components/systemName';

class Content extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', paddingLeft: 20, marginBottom: 5 }}>
        <View>
          <Text style={{ textAlign: 'right', lineHeight: 25, color: '#333', fontSize: 16 }}>{this.props.left}</Text>
        </View>
        <View style={{ width: '60%' }}>
          <Text style={{ lineHeight: 25, fontSize: 14, color: '#666' }}>{this.props.right}</Text>
        </View>
      </View>
    )
  }
}

class Paramsdetail extends Component {
  render(){
    return (
      <View style={{ flexDirection: 'row',paddingTop:5,paddingBottom:5 }}>
        <View style={{ width: '70%' }}>
          <Content left='压力参数：' right='0.04Mpa'/>
          <Content left='上限阈值：' right='1.0Mpa'/>
          <Content left='下限阈值：' right='0.2Mpa'/>
        </View>
        <View style={{ width: '30%'}}></View>
      </View>
    )
  }
}


class Recorddetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isopen: false,
    }
  }

  
  getparams = () => {
    this.setState({
      isopen: !this.state.isopen
    })
  }

  render(){
    const { isopen } = this.state;
    const { data } = this.props;
    return (
      <View>
        <View style={styles.tit}>
          <Text style={{ color: '#3AA1FE', fontSize: 16 }}>设备信息</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
          <View style={{ width: '70%' }}>
            <Content left='设备名称：' right={data.deviceName} />
            <Content left='设备类型：' right={DeviceName[data.deviceType]} />
            <Content left='所属系统：' right={SystemName[data.systemId]} />
            <Content left='所在建筑：' right={data.buildingId} />
            <Content left='所在楼层/区域：' right={data.floorId} />
            <Content left='具体位置：' right={data.location} />
          </View>
          <View style={{ width: '30%', alignItems: 'center', marginTop: 20, paddingRight: 10 }}>
            <Image style={styles.logo} source={require('../../../img/img_02.png')}/>
          </View>
        </View>
        <View style={styles.tit}>
          <Text style={{ color: '#3AA1FE', fontSize: 16 }}>设备状态</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
          <View style={{ width: '70%' }}>
            <Content left='上报时间：' right={data.createTime} />
            <Content left='状态描述：' right={data.warn01} />
            <Content left='警情程度：' right={StatusName[data.warnLevel]} />
          </View>
          <View style={{ width: '30%' }}></View>
        </View>
        <TouchableOpacity onPress={() => { this.getparams() }}>
          <View style={styles.tit}>
            <Text style={{ color: '#3AA1FE', fontSize: 16 }}>设备参数</Text>
            <FontAwesome color="#999" name={this.state.isopen?'angle-up':'angle-down'} size={28}/>
          </View>
        </TouchableOpacity>
        { isopen ? <Paramsdetail /> : <Text />}
        
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('curve', {deviceId:1})}>
          <View style={styles.tit}>
            <Text style={{ color: '#3AA1FE', fontSize: 16 }}>参数曲线</Text>
            <FontAwesome color="#999" name='angle-right' size={28}/>
          </View>
        </TouchableOpacity>
        <View style={styles.tit}>
          <Text style={{ color: '#3AA1FE', fontSize: 16 }}>警情处理</Text>
        </View>
        <View style={{ paddingBottom: 6, paddingTop: 10, flexDirection: 'row', paddingLeft: 20 }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: '#333', fontSize: 16 }}> 处理时间：</Text>
          </View>
          <View>
            <Text style={{ color: '#666', fontSize: 14 }}>{data.dealTime}</Text>
          </View>
        </View>
        <View style={{ paddingBottom: 6, flexDirection: 'row', paddingLeft: 20 }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: '#333', fontSize: 16 }}> 处理人：</Text>
          </View>
          <View>
            <Text style={{ color: '#666', fontSize: 14 }}>{data.warnHandler}</Text>
          </View>
        </View>
        <View style={{ paddingBottom: 6, flexDirection: 'row', paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'red' }}>*</Text><Text style={{ color: '#333', fontSize: 16 }}> 警情确认：</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: '#666', fontSize: 14 }}>{data.warnConfirmType}</Text>
          </View>
        </View>
        <View style={{ paddingBottom: 6, flexDirection: 'row', paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ color: 'red' }}>*</Text><Text style={{ color: '#333', fontSize: 16 }}> 现场报警图：</Text>
          </View>
          <View>
            <View style={{ width: 100, height: 100 }}>
              <Image style={styles.img} source={require('../../../img/img_02.png')}/>
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 6, flexDirection: 'row', paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ color: 'red' }}>*</Text><Text style={{ color: '#333', fontSize: 16 }}> 处理描述：</Text>
          </View>
          <View style={{ width: '70%' }}>
            <Text style={{ color: '#666', fontSize: 14, lineHeight: 20 }}>{data.warnDealDes} </Text>
          </View>
        </View>
        <View style={{ paddingBottom: 6, flexDirection: 'row', paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ color: 'red' }}>*</Text><Text style={{ color: '#333', fontSize: 16 }}> 处理结果图：</Text>
          </View>
          <View>
            <View style={{ width: 100, height: 100 }}>
              <Image style={styles.img} source={require('../../../img/img_02.png')}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class TrueFirewarning extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>通知公告</Text>
      ),
      headerRight: (
        <Text></Text>
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
    this.state = {
      seedetail:false,
      data:'',
    }
  }
  componentDidMount(){
    const { id } = this.props.navigation.state.params;
    // console.log(id);

    // FetchManager.get('1/noticemessage/' + id,'', async (set) => {
    //   console.log(set);
    // })
    FetchManager.get('1/devicealertdeal/'+id,'', async (set) => {
      if(set && set.data){
        this.setState({
          data:set.data
        })
      }
      console.log(set)
      // if(set&&set.data){
      //     set.data.createTime = set.data.createTime.replace('T',' ')
      //     this.setState({
      //         obj:set.data
      //     })
      // }
    })
  }

  click=()=>{
    this.setState({
      seedetail:!this.state.seedetail
    })
  }

  render() {
    const { seedetail,data } = this.state;
    return (
      <KeyboardAvoidingView enabled>
        <ScrollView>
          <View style={{ padding: 15, backgroundColor: '#F2F7FB' }}>
            <View style={{ marginBottom: 5 }}>
              <Text style={{fontSize:17,color:'#333'}}>标题：
                <Text>{StatusName[data.warnState]}</Text>
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{fontSize:16,color:'#333'}}>确认人：
                <Text style={{fontSize:14,color:'#666'}}>{data.warnConfirmor}</Text>
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{fontSize:16,color:'#333'}}>确认时间：
                <Text style={{fontSize:14,color:'#666'}}>{data.warnConfirmTime}</Text>
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{fontSize:16,color:'#333'}}>所在位置：
                <Text style={{fontSize:14,color:'#666'}}>{data.location}</Text>
              </Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text style={{fontSize:16,color:'#333'}}>内容：</Text>
            </View>
            <View>
              <Text style={{fontSize:14,color:'#666',lineHeight:20}}>
                {data.warnConfirmDes}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>{this.click()}}>
            <View style={{ paddingLeft: 15, paddingRight: 15, height: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: '#333', fontSize: 16 }}>附设备处理详情：</Text>
              <FontAwesome color="#999" name={seedetail?'angle-up':'angle-right'} size={28}/>
            </View>
          </TouchableOpacity>
          { seedetail ? <Recorddetail data={data} /> :  <Text />}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  
}
export default TrueFirewarning;
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
  logo: {
    width: 105,
    height: 95
  },
  img: {
    width: '100%',
    height: '100%'
  }
})