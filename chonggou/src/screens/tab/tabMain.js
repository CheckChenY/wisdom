
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Linking,
    Alert,
} from 'react-native';
import FeatherAwesome from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import FetchManager from '../fetch/index';

const { height, width } = Dimensions.get('window');
const dwxx = require('../../img/dwxx.png');
const jszc = require('../../img/jszc.png');
const syfk = require('../../img/syfk.png');
const jcgx = require('../../img/jcgx.png');
const sybz = require('../../img/sybz.png');
const gy = require('../../img/gy.png');
const sz = require('../../img/sz.png');

class TabMain extends Component {
    constructor(){
        super()
        this.state = {
            data:[{name:dwxx,list:'单位信息',url:'CompanyInfo'},
                {name:jszc,list:'技术支持',url:'technicalSupport'},
                {name:syfk,list:'使用反馈',url:'userFeedback'},
                {name:jcgx,list:'检查更新',url:'checkUpdate'},
                {name:sybz,list:'使用帮助',url:'useHelp'},
                {name:gy,list:'关于',url:'about'},
                // {name:sz,list:'设置',url:'setUp'}
            ],
            isModalVisible:false,
            isModalUpdate:false,
            userInfo:{},
            // checkState:0,
            // itemData:{}
        }

        this.onCancelModal = this.onCancelModal.bind(this);
        this._toggleModal = this._toggleModal.bind(this);
        this.onCancelUpdate = this.onCancelUpdate.bind(this);
    }

    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }


    onCancelModal = () =>{
        this.setState({ isModalVisible: false,isModalUpdate:false });
    }

    onCancelUpdate = () => {
        this.setState({ isModalUpdate: !this.state.isModalUpdate });
    }

    onChangeLink = () => {
        let tel = 'tel:10086114524524'// 目标电话
        Linking.canOpenURL(tel).then((supported) => {
            if (!supported) {
                console.log('Can not handle tel:' + tel)
            } else {
                this.setState({
                    isModalVisible:true,
                })
                return Linking.openURL(tel)
            }
        }).
        catch(error => console.log('tel error', error))
    }

    render() {
        const { state,props } = this,
        { data,userInfo, } = state,
        { navigation } = props;
        return (
            <ScrollView>
            <View style={{backgroundColor:"#F2F7FB"}}>
                <TouchableOpacity onPress={()=>navigation.navigate('mainSelf')}>
                    <ImageBackground 
                        source={require('../../img/mine_top_img.png')}
                        resizeMode ='stretch'
                        style={{flexDirection:'row',padding:10,backgroundColor:'pink',}}>
                        <View style={{marginRight:10,marginLeft:6,marginTop:20,marginBottom:50}}>
                            <Image style={{width:70,height:70}} source={require('../../img/tx.png')} />
                        </View>
                        <View style={{marginTop:20,marginBottom:50}}>
                            <Text style={styles.title_right_word}>单位：{userInfo.companyName}</Text>
                            <Text style={styles.title_right_word}>用户：{userInfo.realName}</Text>
                            <Text style={styles.title_right_word}>手机：{userInfo.phone}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                
                <View style={{marginTop:10}}>
                    {
                        data.map((item,i) =>(
                            <TouchableOpacity key={i} onPress={ 
                                item.url === 'technicalSupport' ? this._toggleModal : 
                                // item.url === 'CompanyInfo' ? () => navigation.navigate(item.url,{
                                //     checkState:checkState,
                                //     itemData:itemData
                                // }) :
                                () => navigation.navigate(item.url) }>
                                <View style={styles.main_list}>
                                    <View style={{width:50}}>
                                        <Image
                                            style={{width:22,height:22}}
                                            source={item.name}
                                        />
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text>{item.list}</Text>
                                    </View>
                                    <View style={{width:25}}>
                                        <FeatherAwesome color="#3AA1FE" name="chevron-right" size={19} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <Modal 
                    isVisible={this.state.isModalVisible}
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{flexDirection:"column",width:'80%',backgroundColor:"#FFFFFF",padding:5,borderRadius:3}}>
                                <Text style={{fontWeight:"900",fontSize:18,textAlign:'center',paddingTop:10,paddingBottom:5}}>技术支持</Text>
                                <View style={{paddingLeft:33,paddingRight:33,paddingBottom:25}}>
                                    <Text style={{fontSize:15,paddingTop:5,color:"#666666"}}>如果有无法解决的问题请联系</Text>
                                    <Text style={{fontSize:15,paddingTop:5,color:"#666666"}}>10086114524524</Text>
                                </View>
                                <View style={{width:'100%',flexDirection:"row",justifyContent:'space-around',borderTopColor:'#EBEBEB',borderTopWidth:1,paddingTop:12,paddingBottom:10}}>
                                    <View style={{backgroundColor:'#3AA1FE',borderRadius:3,width:84,height:37,justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.onChangeLink}>
                                            <Text style={{textAlign:"center",color:"#ffffff"}}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{backgroundColor:'#cccccc',borderRadius:3,padding:3,width:84,height:37,justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.onCancelModal}>
                                            <Text style={{textAlign:"center",color:"#ffffff"}}>取消</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal 
                    isVisible={this.state.isModalUpdate}
                >
                    <View style={{ flex: 1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                            <View style={{flexDirection:"column",width:'80%',backgroundColor:"#FFFFFF",padding:5,borderRadius:3}}>
                                <Text style={{fontWeight:"900",fontSize:18,textAlign:'center',paddingTop:10,paddingBottom:5}}>检查版本</Text>
                                <View style={{paddingLeft:33,paddingRight:33,paddingBottom:25}}>
                                    <Text style={{fontSize:15,paddingTop:5,color:"#666666"}}>当前已是最新版本</Text>
                                </View>
                                <View style={{width:'100%',flexDirection:"row",justifyContent:'space-around',borderTopColor:'#EBEBEB',borderTopWidth:1,paddingTop:12,paddingBottom:10}}>
                                    <View style={{backgroundColor:'#3AA1FE',borderRadius:3,padding:3,width:84,height:37,justifyContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity onPress={this.onCancelModal}>
                                            <Text style={{textAlign:"center",color:"#ffffff"}}>确定</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
            </ScrollView>
        );
    }
    componentDidMount(){
        FetchManager.get('/auth/jtluser/getMyUserApp','', async (set) => {
            console.log(set)
            if(set.success){
                this.setState({
                    userInfo:set.value
                }) 
            }
        })

        // FetchManager.get('/company/inner/jtlCompany/findOrgByUserId','', async (set) => {
        //     console.log(set)
        //     if(set.success){
        //         this.setState({
        //             checkState:set.value.checkState,
        //             itemData:set.value
        //         })
        //     }
        // })

        
    }
}

const styles = StyleSheet.create({
    title_right_word:{
        fontSize:17,
        color:'#ffffff'
    },
    main_list:{
        flexDirection:"row",padding:15,borderBottomWidth:1,borderBottomColor:'#EBEBEB',backgroundColor:'#FFFFFF'
    }
})

export default TabMain;