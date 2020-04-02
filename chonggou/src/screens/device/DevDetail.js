import React, {Component} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    ScrollView,
} from 'react-native';
import Modal from "react-native-modal";
const { height, width } = Dimensions.get('window');

class Content extends Component{
    render(){
        const { left,right } = this.props;
        return(
            <View style={{ flexDirection: 'row',marginTop:5,paddingLeft:15 }}>
                <Text style={{ fontSize:16,color:'#333',width:150,textAlign:'right' }}>{left}</Text>
                <Text style={{ flex:1,fontSize:14,color:'#666666' }}>{right}</Text>
            </View>
        )
    }
}

class HeaderRight extends Component{

    constructor(props){
        super(props)
        this.state={
            isModalVisible:false,
            text:""
        }
        this._toggleModal = this._toggleModal.bind(this);
        // this.onChangeLink = this.onChangeLink.bind(this);
    }

    // ()=>navigation.navigate('EditParams')navigate

    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
        this.props.navigation.navigate('EditParams')
    }


    render(){
        return(
            <TouchableOpacity style={{paddingRight:15}} onPress={this._toggleModal}>
                <Text style={{ color: '#fff', fontSize: 16 }}>修改参数</Text>

                <Modal 
                    isVisible={this.state.isModalVisible}
                >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                        <View style={{flexDirection:"column",padding:5,borderRadius:3,backgroundColor:"#FFFFFF",width:width-50}}>
                            <Text style={{fontWeight:"900",fontSize:18,paddingLeft:20,paddingRight:20,fontWeight:'900',marginTop:20}}>
                                {/* <FontAwesome color="#fff" name="exclamation-circle" size={28}/> */}
                                请输入密码
                            </Text>
                            <View style={{flexDirection:'row',padding:10,marginLeft:10,alignItems:"center"}}>
                                <Text style={{fontWeight:"600",fontSize:16,width:50}}>密码:</Text>
                                <TextInput
                                    style={{borderColor: 'gray', borderWidth: 1,flex:1,height:30,borderRadius:3,paddingVertical: 0}}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
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
                                        onPress={this._toggleModal}
                                    />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        )
    }
}

export default class DevDetail extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>接入设备</Text>
            ),
            headerRight: (
                <HeaderRight navigation={navigation} />
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
    

    render(){
        return(
            <ScrollView>
                <View>
                    <Image source={require('../../img/jrsb_img.png')} style={{width:'100%',height:186}}></Image>
                </View>
                <View style={{paddingTop:10}}>
                    <Content left="设备名称：" right="001001"></Content>
                    {/* <View style={{ flexDirection: 'row',marginTop: 5,paddingLeft:15 }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={{ textAlign: 'right',fontSize:16,color:'#333' }}></Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'right',paddingRight:15,fontSize:16,color:'#333'}}>(SN码)</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center' }}>
                            <Text style={{fontSize:14,color:'#666'}}>132465</Text>
                        </View>
                    </View> */}
                    <Content left="设备标识码(SN码)：" right="132465"></Content>
                    <Content left="所属系统：" right="火灾自动报警系统01"></Content>
                    <Content left="设备类型：" right="点型感烟火灾探测器"></Content>
                    <Content left="所在建筑：" right="大通1号楼"></Content>
                    <Content left="所在楼层/区域：" right="1层"></Content>
                    <Content left="设备安装位置：" right="会议室"></Content>
                    <Content left="设备型号：" right="YG-001"></Content>
                    <Content left="生产厂家：" right="金特莱"></Content>
                    <Content left="生产日期：" right="2019-01-01"></Content>
                    <Content left="服务期限：" right="2020-01-01"></Content>
                    <Content left="设备状态：" right="启用"></Content>
                </View>
            </ScrollView>
        )
    }
}