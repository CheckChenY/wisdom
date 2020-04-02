import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Linking,Image,ActivityIndicator,Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import ModelPop from '../components/modelPop';
const { width,height } = Dimensions.get('window');

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
            <Text style={styles.headerMiddle}>检查更新</Text>
        ),
        headerRight:<Text style={{color:'#fff',marginRight:15}}></Text>,
        headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
        };
    }

    constructor(){
        super()
        this.state = {
            url:'www.baidu.com',
            ver:'V5.0.3',
            bol:true
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.getVersion()
        },2000)
    }

    getVersion = () => {
        // debugger;
        const { ver } = this.state;
        let obj = {}
        obj.versions = ver;
        obj.unit = 1
        FetchManager.get('1/appversions/getVersions',obj, async (set) => {
            console.log(set)
            if(set&&set.code === '0'){
                let data = set.data;
                // versionsCode : 1(需要更新2需要更新)
                if( data.versionsCode === 2 ){
                    this.setState({
                        bol:false,
                        url:data.url
                    })
                    this.update()
                }else if(data.versionsCode === 1){
                    this.setState({
                        bol:false
                    })
                    this.popUp.showPop('当前已是最新版本')
                }   
            }
        })
    }

    update = () => {
        // let url = 'http://1.192.212.139/group1/M00/00/11/wKgAvV2Eav2AZ7TLAjN-wHfUhks262.apk?attname=金特莱-用户端.apk';
        // Linking.openURL(url) 
        // console.log(url)
        const { url } = this.state;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                // Alert.alert(
                //     '提示',
                //     "请先下载浏览器",
                //     [
                //         {text: '确定'},
                //     ],
                // );
                
                this.popUp.showPop('打开浏览器失败，请返回重新更新')
            } else {
                return Linking.openURL(url);
            }
        }).catch(err =>
            // Alert.alert(
            //     '提示',
            //     "打开文章链接失败",
            //     [
            //         {text: '确定'},
            //     ],
            // )
            this.popUp.showPop('打开文章链接失败')
        );
    }
    

    render() {
        const { bol,ver } = this.state;
        return (
            <View>
                <View style={{height:height/2 - 100,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:80,height:80}} source={require('../../img/xfws.png')}/>
                    <Text style={{paddingTop:10}}>
                        当前版本{ver}
                    </Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator 
                        style={{}}
                        animating={bol}
                        size="large"
                    />
                </View>
                {/* <Text>检查更新</Text>
                <Button
                    title='跳转'
                    onPress={ ()=>this.update() }
                >
                </Button> */}
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
});

export default mineScreens