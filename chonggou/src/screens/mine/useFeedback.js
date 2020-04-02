import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Textarea from 'react-native-textarea';
import CameraComponent from '../components/cammer';
import FetchManager from '../fetch/index';
import ModelPop from '../components/modelPop';

class mineScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                    <FontAwesome color="#fff" name="angle-left" size={28}/>
                    <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                </View>
            </TouchableOpacity>
        ),
        headerTitle: (
            <Text style={styles.headerMiddle}>使用反馈</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(){
      super()
      this.state = {
        problem:'',
        phone:'',
        bol:false,
        photo:''
      }
      this.onChangeColor = this.onChangeColor.bind(this);
    }

    onChangeColor = () => {
      this.setState({
        bol: !this.state.bol
      })
    }

    onChangeErr = (value) => {
      this.setState({ problem: value });
    }

  render() {
    const { bol } = this.state;
    return (
      <View style={styles.container}>
        <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
        <View>
          <Text><Text style={{color:'#FD3E3C'}}>* </Text>问题描述(必填)</Text>
          <View style={{marginTop:10}}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.onChangeErr}
              maxLength={300}
              placeholder={'请详细描述您遇到的问题(必填）'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <Text style={{marginTop:15}}><Text style={{color:'#FD3E3C'}}>* </Text>联系方式(必填)</Text>
          <View style={{marginTop:10}}>
            <TextInput
                style={{ borderColor: '#D9E4ED', borderWidth: 1,padding:10,
                borderRadius:2,backgroundColor:'#FFFFFF',height:34,fontSize:13
            }}
                placeholder='输入手机号'
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
            />
          </View>
          <Text style={{marginTop:15}}>添加问题截图(选填)</Text>
          <View style={{marginTop:15}}>
            <CameraComponent getImgBase={this.getImgBase}/>
          </View>
          {/* <View style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
            <TouchableOpacity style={{width:25}} onPress={this.onChangeColor}>
              <Text style={{width:20,height:20,borderWidth:1,borderColor:"#788A93",borderRadius:2,backgroundColor:bol ? 'blue' : '#FFFFFF'}} />
            </TouchableOpacity>
            <Text style={{flex:1,marginLeft:5}}>提供应用日志信息，帮助我们更准确的分析问题</Text>
          </View> */}
          <View style={{paddingLeft:20,paddingRight:20,height:45,marginTop:60}}>
                <TouchableOpacity onPress={()=>{this.submit()}}>
                    <View style={{height:'100%',backgroundColor:'#3AA1FE',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:18}}>提交</Text>
                    </View>
                </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  submit=()=>{
    const { problem,phone } = this.state;
    var params={
      problem:this.state.problem,
      phone:this.state.phone,
      photo:this.state.photo
    }

    if(problem === ''){
        this.popUp.showPop('请提交您的问题')
        return false 
    }
    if(phone === ''){
        this.popUp.showPop('请填写您的联系方式')
        return false
    }
    this.popUp.showPop('谢谢您的反馈')
    // FetchManager.post('1/feedbackrecord',params, async (set) => {
    //   console.log(set)
    // })
  }
}
getImgBase = (val) => {
  console.log(val)
  this.setState({
    photo:'data:image/jpg;base64,' + val
  });
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F2F7FB",
    paddingTop:20,
    paddingLeft:15,
    paddingRight:15,
  },
  headerMiddle: {
      color: "rgba(255,255,255,1)",
      fontSize: 18,
      fontWeight: "bold",
      flex: 1,
      textAlign: 'center',
  },
  textareaContainer: {
    height: 107,
    backgroundColor: '#fff',
    borderColor:'#D9E4ED',
    borderWidth:1,
    borderRadius:2
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 107,
    padding:5,
    fontSize: 14,
    color: '#333',
  },
});

export default mineScreens