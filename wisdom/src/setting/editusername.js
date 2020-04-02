import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../http/http'
import ModelPop from '../components/modelPop';

class EditUsername extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{paddingRight:15,}}>
                <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                    <FontAwesome color="#fff" name="angle-left" size={28}/>
                </View>
            </TouchableOpacity>
        ),
        headerTitle: (
            <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>修改用户名</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: '#467cd4'}
        };
    }

    constructor(){
        super()
        this.state = {
            name:'',
            popUp:''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40,backgroundColor:'#fff',borderColor:'#BABABC',borderWidth:1,borderRadius:2,paddingLeft:10,paddingRight:10,}}
                    placeholder="请输入用户名"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    />
                <View style={{marginTop:10,}}>
                    <Text style={{fontSize:12,color:'#999',lineHeight:15,}}>注：以英文字母或汉字开头，限4-16个字符，一个汉字为2个字符</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.sureedit()}} style={{backgroundColor:'#467cd4',height:45,borderRadius:3,marginTop:32,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{fontSize:17,color:'#fff',}}>保存</Text>
                </TouchableOpacity>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        );
    }
    sureedit=()=>{
        if(!this.state.name.trim()){
            this.popUp.showPop('请输入用户名')
        }
        let params={
            name:this.state.name
        }
        FetchManager.get('/app/acbuser/updateName',params, async (set) => {
            console.log(set)
            if(set.status==0){
                this.props.navigation.state.params.refresh()
                this.props.navigation.goBack()
            }else{
                this.popUp.showPop(set.msg)
            }
        })
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(246,246,246)',
        height:'100%',
        padding:15,
    },
});

export default EditUsername