import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  ActivityIndicator,Text,View,TextInput,TouchableOpacity,
  Dimensions,Button,} from 'react-native';
import Modal from "react-native-modal";
const { height, width } = Dimensions.get('window');
import FetchManager from '../fetch/index';
import GoBack from '../components/goBack';
import { dataAnalisys } from '../components/analisys';
import ModelPop from '../components/modelPop';
import { ScrollView } from 'react-native-gesture-handler';

export default class EditParams extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 17 }}>修改阈值</Text>
      ),
      headerRight: (
          <TouchableOpacity 
              onPress={()=>navigation.state.params.navigatePress()}
          >
              <Text style={{ paddingRight: 15 }}>
                  <Text style={{ color: '#fff', fontSize: 15 }}>提交</Text>
              </Text>
          </TouchableOpacity>
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
      }
    };
  };
  //构造器
  constructor(props) {
    //加载父类方法,不可省略
    super(props);
    //设置初始的状态
    this.state = {
      isModalVisible:false,
      popUp: '',
      list:[]
    }
  }



  componentDidMount(){
    this.props.navigation.setParams({navigatePress:this.onPressSumit})
    const { deviceType,deviceId } = this.props.navigation.state.params;
    console.log(deviceType);
    let obj = {
      deviceId:deviceId
    }
    FetchManager.get('/device/inner/jtlDevice/getDeviceThresholdNowDateApp',obj, async (set) => {
      //下面的就是请求来的数据
      console.log(set)
      if(set.success){
        let data = set.value;
        this.setState({
          list:data
        })
      }
    }) 
  }

  onPressSumit = () => {
    this.setState({
      isModalVisible:true
    })
  }


  _toggleModal = () =>{
    this.setState({ 
      isModalVisible: false 
    });
  }


  _toggleModalGo = () => {
    const { text } = this.state;
    let obj = {
      thresholdPassword:text
    }
    this.setState({
      isModalVisible:false
    })
    FetchManager.get('/device/inner/jtlCompanyPassword/getMyPassWord',obj, async (set) => {
      //下面的就是请求来的数据
      console.log(set);
      if(set.success){
        this.submit();
        this.popUp.showPop('操作命令已下发')
      }else{
        this.popUp.showPop('请在WEB端配置初始化密码')
      }
    })
  }

  submit = () => {
    const { list } = this.state;
    console.log(list)
    FetchManager.post('/device/inner/jtlDeviceThreshold/changeDeviceThreshold',list, async (set) => {
      //下面的就是请求来的数据
      console.log(set);
      if(set.success){
        this.popUp.showPop('修改成功')
        this.setState({
          isModalVisible:false
        })
        setTimeout(()=>{
          this.props.navigation.goBack()
        },3000)
      }else{
        this.setState({
          isModalVisible:false
        },this.popUp.showPop(set.msg))
      }
    }) 
  }

  onChangeTxt = (val,i) => {
    const { list } = this.state;
    console.log(val)
    console.log(i)
    list[i].thresholdValue = val;
    // console.log(this)
    // this.setState({
    //   newlist:list
    // })
  }


  render() {
    const { isModalVisible,bol,text,loading,list } = this.state;

    return (
      <ScrollView>
        <View style={{ padding: 10 }}>
          {
            list.length === 0 ? (
              <View>
                <Text style={{textAlign:'center'}}>该设备暂无阈值修改</Text>
              </View>
            ) : <Text />
          }
          {
            list&&list.map((show,i)=>(
              <View key={i} style={{ flexDirection: 'row',marginTop:5,alignItems:'center'}}>
                <View style={{ flex:2}}>
                    <Text style={{ textAlign: 'right', fontSize:12,color:'#333' }}>
                      {show.thresholdDesc}:
                    </Text>
                </View>
                <View style={{flex:3}}>
                  <TextInput 
                    placeholder={show.thresholdValue} 
                    // editable={bol}
                    onChangeText={text => this.onChangeTxt(text,i)}
                    // onChangeText={(val)=>this.onChangeTxt(val,i)} 
                    style={{ borderWidth: 1, borderColor: '#D9E4ED',borderRadius:3,fontSize:12,color:'#333',height:30,padding:0,paddingLeft:5 }}
                  />
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ textAlign: 'left', fontSize:12,color:'#333' }}>
                      {show.unit}:
                    </Text>
                </View>
              </View>
            ))
          }

          {/* <View style={{marginTop:10}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:20}} 
              onPress={()=>{this.submit()}}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#788A93',fontSize:18,backgroundColor:'#3AA1FE',borderRadius:4,width:100,padding:10,color:"#FFFFFF",textAlign:"center"}}>提交</Text>
                </View>
            </TouchableOpacity>
          </View> */}


          <Modal isVisible={loading}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
              <ActivityIndicator
                animating={true}
                size={"large"}
                hidesWhenStopped={true}
                color={'#3AA1FE'}
              />
            </View>
          </Modal>
          
          <Modal 
              isVisible={isModalVisible}
          >
              <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                  <View style={{flexDirection:"column",padding:5,borderRadius:3,backgroundColor:"#FFFFFF",width:width-50}}>
                      <Text style={{fontWeight:"900",fontSize:18,paddingLeft:20,paddingRight:20,fontWeight:'900',marginTop:20}}>
                          请输入密码
                      </Text>
                      <View style={{flexDirection:'row',padding:10,marginLeft:10,alignItems:"center"}}>
                          <Text style={{fontWeight:"600",fontSize:16,width:50}}>密码:</Text>
                          <TextInput
                              style={{borderColor: 'gray', borderWidth: 1,flex:1,height:30,borderRadius:3,paddingVertical: 0}}
                              onChangeText={(text) => this.setState({text})}
                              value={text}
                          />
                      </View>
                      <View style={{flexDirection:"row",marginTop:25,paddingBottom:25}}>
                          <View style={{flex:1}}></View>
                          <View style={{flex:1,marginright:10}}>
                              <Button 
                                  title='取消'
                                  color='#D9E4ED'
                                  style={{width:84}}
                                  onPress={this._toggleModal}
                              />
                          </View>
                          <View style={{flex:1,marginLeft:10}}>
                              <Button 
                                  title='确定'
                                  style={{width:80}}
                                  onPress={this._toggleModalGo}
                              />
                          </View>
                          <View style={{flex:1}}></View>
                      </View>
                  </View>
              </View>
          </Modal>
          <ModelPop ref={ref => this.popUp = ref}></ModelPop>
        </View>
      </ScrollView>
    );
  }
};