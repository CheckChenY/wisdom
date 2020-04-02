
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ModelPop from '../components/modelPop';

const { height, width } = Dimensions.get('window');


class PatrolScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header:null
        };
        // const { title } = navigation.state.params; //首页巡查  和   添加巡查
        // return {
        //     headerTitle: (
        //         <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>{title}</Text>
        //     ),
        //     headerRight: (
        //         <Text></Text>
        //     ),
        //     headerLeft: (
        //         <TouchableOpacity onPress={()=>navigation.goBack()}>
        //             <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
        //                 <FontAwesome color="#fff" name="angle-left" size={28}/>
        //                 <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
        //             </View>
        //         </TouchableOpacity>
        //     ),
        //     headerStyle: {
        //         backgroundColor: '#3AA1FE',
        //         height: 50
        //     }
        // };
    };

    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            // enabled: false,
            // isWriting: false,
            // urlToWrite: 'https://www.baidu.com',
            // rtdType: RtdType.URL,
            parsedText: null,
            popUp: '',
            tag: {},
            txt:this.props.navigation.state.params.title,
            showCode:''
        }
    }

    componentDidMount() {
        NfcManager.isSupported()
        .then(supported => {
            this.setState({ 
                supported:supported,
                txt:this.props.navigation.state.params.title,
             });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        let { supported, tag,txt,showCode } = this.state;
        return (
            <ScrollView style={{flex: 1}}>
                { Platform.OS === 'ios' && <View style={{ height: 60 }} /> }

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{padding:10,marginTop:10}}>{supported ? '' : '您的手机不支持NFC功能'}</Text>

                    {/* <Text>{`是否启用NFC（仅限Android）? ${enabled}`}</Text> */}
                    <View style={{flexDirection:"row"}}>
                        <Image style={{width:width,height:245,justifyContent:"center",alignItems:"center"}} 
                        source={require('../../img/glxc.png')} />
                    </View>

                    <View style={{paddingLeft:15,paddingRight:15,marginTop:45,paddingBottom:20}}>
                        <TouchableOpacity onPress={()=>{this._startDetection()}}>
                            <View style={{height:45,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center',borderRadius:5,paddingLeft:5,paddingRight:5}}>
                                <Text style={{color:'#fff',fontSize:18}}>{ txt }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={()=>{this._back()}}>
                        <View style={{height:45,backgroundColor:'#3AA1FE',justifyContent:'center',alignItems:'center',borderRadius:5,paddingLeft:5,paddingRight:5,width:100}}>
                            <Text style={{color:'#fff',fontSize:18}}>{ '返回操作' }</Text>
                        </View>
                    </TouchableOpacity>
                    <Text>
                        { showCode }
                    </Text>
                    {/* <ModelPop ref={ref => this.popUp = ref}></ModelPop> */}
                </View>
            </ScrollView>
        )
    }

    _back = () => {
        const { url,id } = this.props.navigation.state.params;
        const { code } = this.state;
        this.props.navigation.navigate(url,{
            id:id,
            code:code
        })
    }


    // _startNfc() {
    //     NfcManager.start({
    //         onSessionClosedIOS: () => {
    //             console.log('ios session closed');
    //         }
    //     })
    //     .then(result => {
    //         console.log('start OK', result);
    //     })
    //     .catch(error => {
    //         console.warn('start fail', error);
    //         this.setState({supported: false});
    //     })

    //     if (Platform.OS === 'android') {
    //         NfcManager.getLaunchTagEvent()
    //             .then(tag => {
    //                 console.log('launch tag', tag);
    //                 if (tag) {
    //                     this.setState({ tag });
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         NfcManager.isEnabled()
    //             .then(enabled => {
    //                 this.setState({ enabled });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         NfcManager.onStateChanged(
    //             event => {
    //                 if (event.state === 'on') {
    //                     this.setState({enabled: true});
    //                 } else if (event.state === 'off') {
    //                     this.setState({enabled: false});
    //                 } else if (event.state === 'turning_on') {
    //                     // do whatever you want
    //                 } else if (event.state === 'turning_off') {
    //                     // do whatever you want
    //                 }
    //             }
    //         )
    //             .then(sub => {
    //                 console.log(sub)
    //                 this._stateChangedSubscription = sub; 
    //                 // remember to call this._stateChangedSubscription.remove()
    //                 // when you don't want to listen to this anymore
    //             })
    //             .catch(err => {
    //                 console.warn(err);
    //             })
    //     }
    // }

    _onTagDiscovered = tag => {
        // console.log('Tag Discovered', tag);
        // this.setState({ tag });
        // let url = this._parseUri(tag);
        // if (url) {
        //     Linking.openURL(url)
        //         .catch(err => {
        //             console.warn(err);
        //         })
        // }

        // let text = this._parseText(tag);


        
        // this.setState({parsedText: text});

        // console.log(this)
        // this.setState({showCode: '以获取巡查卡编码' + id + ',返回进行操作'});
        let id = tag.id;
        console.log(id)
        AsyncStorage.setItem('code',id);

        // if(tag && tag.id){
        //     // this.popUp.showPop('以获取巡查卡编码' + id + ',返回进行操作')  
        // }
    }

    _startDetection = () => {

        const { supported } = this.state;
        this.setState({
            txt:'请将卡放在NFC处'
        })
        if ( !supported) {
            this.popUp.showPop('请开启NFC功能')
            return false
        }

        NfcManager.registerTagEvent(this._onTagDiscovered)
        .then(result => {
            console.log('registerTagEvent OK', result)
        })
        .catch(error => {
            console.warn('registerTagEvent fail', error)
        })
    }


    // getSelfPop = (id) => {
    //     this.popUp.showPop('以获取巡查卡编码' + id + ',返回进行操作')  
    // }
}

export default PatrolScreen;
