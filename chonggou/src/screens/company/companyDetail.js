import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image,ScrollView,Linking } from 'react-native'; 
import { Geolocation } from 'react-native-baidu-map';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MessageComponent from './messageComponent';
import CompanyDevice from './companyDevice';
import FetchManager from '../fetch/index';
import TabsCompanents from '../components/tabs';

// import CompanyInit from './companyInit';

class CompanyDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { id } = navigation.state.params;
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
                <Text style={styles.headerMiddle}>企业详情</Text>
            ),
            headerRight:(<View />),
            headerStyle: {
                backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'
            }
        };
    }

    constructor(props){
        super(props)
        this.state = {
            companyMessage:{},
            street:'',
            address:'',
            type:['社会单位','监管单位','总公司',' 代理商'],
            data:{}
        }
    }

    onChangeTabList = (obj) => {
        console.log(obj)
    }

    componentDidMount(){
        const { companyId } = this.props.navigation.state.params;
        // const { companyMessage } = this.state;
        let obj = {
            type:1,
            orgId:companyId
        }
        ///device/inner/jtlDevice/getOrgDetail
        FetchManager.get('/device/inner/jtlDevice/getOrgDetail',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
            if(set&&set.success){
                // let data = set.data;
                // companyMessage['org_name'] = data.org_name;
                // companyMessage['device_count'] = data.device_count;
                // companyMessage['area'] = data.area;
                // companyMessage['safety_manager'] = data.safety_manager;
                // companyMessage['phone'] = data.phone;
                // companyMessage['org_img'] = data.org_img;
                // let position = data.position
                // let arr = position.split(',');
                // let lon = arr[0],lat = arr[1];
                // this.setState({
                //     companyMessage:companyMessage
                // },this.getMapLocation(lon,lat))

                let data = set.value
                this.setState({
                    companyMessage:data,
                    data:data.company
                })
            }
        })
    }

    getMapLocation = (lon,lat) => {
        let longitude = Number(lon);
        let latitude = Number(lat);
        // console.log(longitude);
        // console.log(latitude);

        Geolocation.reverseGeoCode(latitude,longitude)
        .then(data => {
            this.setState({
                street:data.province + data.city + data.district,
                address:data.address
            })
            console.log('reverseGeoCode',data);
        })
        .catch(e =>{
            console.warn(e, 'error');
        }) 
    }
    

    onChangeTab = (val) => {
        // console.log(val)
        this.popUp.onChangeIndex(val)
    }



    render() { 
        const { navigation } = this.props;
        const { companyMessage,data,address,type } = this.state;
        return (
            <View style={styles.container}>
                <View style={{padding:5,backgroundColor:'#ffffff'}}>
                    <Text style={{fontSize:16,fontWeight:'700',color:'#333333'}}>{data.orgName}</Text>
                </View>
                <View style={{backgroundColor:'#FFFFFF',padding:5}}>
                    <View style={styles.title_box_left}>
                        <Text style={styles.title_box_left_list}>行业类别:{type[data.orgType]}</Text>
                        <Text style={styles.title_box_left_list}>设备总数量:{companyMessage.allDeviceSize}</Text>
                        {/* <Text style={styles.title_box_left_list}>建筑面积:{companyMessage.area}</Text> */}
                        {/* <Text style={styles.title_box_left_list}>安全责任人:{companyMessage.safety_manager}</Text> */}
                        {/* <Text style={styles.title_box_left_list}>公司参保金额:{companyMessage.org_name}</Text> */}
                        <Text style={styles.title_box_left_list}>联系电话:{data.legalPersonPhone}</Text>
                    </View>
                    <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                        <Image
                            style={styles.thumbnail}
                            source={{uri:'http://192.168.0.186:60080/'+data.orgImg}}
                        />
                    </View>
                </View>
                <View style={{padding:5,backgroundColor:'#FFFFFF',flexDirection:"row",borderTopWidth:1,borderTopColor:'#ccc',
                paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#ccc',}}>
                    <View style={{flex:1,borderRightWidth:1,borderRightColor:'#CCC'}}>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('mapDetail',{
                            id:''
                        })}> */}
                            <View>
                                {/* <Text style={{fontSize:16,color:'#3AA1FE',fontWeight:'600'}}>{street}</Text> */}
                                <Text style={styles.title_box_left_list}>{data.address}</Text>
                            </View>
                        {/* </TouchableOpacity> */}
                    </View>
                    <View style={{width:50,justifyContent:"center",alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.onChangeLink(data.phone)}>
                            <FontAwesome color="#3AA1FE" name="mobile-phone" size={28}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TabsCompanents onChangeTab={this.changeTab}>
                    {/* First tab */}
                    <View title="设备信息">
                        <MessageComponent 
                            { ...this.props }
                            companyMessage={companyMessage}
                            ref={ ref => this.popUp = ref } />
                    </View>
                    {/* Second tab */}
                    <View title="设备列表">
                        <CompanyDevice 
                            { ...this.props }

                            ref={ ref => this.popUp = ref } />
                    </View>
                </TabsCompanents>
                {/* <View style={{borderTopWidth:1,borderTopColor:'#ccc'}}>
                </View> */}
            </View>
        );
    }  

    changeTab = (index) => {
        console.log(index)
    }
    onChangeLink = (phone) => {
        // debugger;
        let tel = 'tel:' + phone// 目标电话
        Linking.canOpenURL(tel).then((supported) => {
            if (!supported) {
                console.log('Can not handle tel:' + tel)
            } else {
                return Linking.openURL(tel)
            }
        }).
        catch(error => console.log('tel error', error))
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
    container: {
        flex:1,
        backgroundColor:'#F2F7FB',
        padding:5
    },
    // Content header
    header: {
      margin: 10,                        // White color
      fontFamily: 'Avenir',               // Change font family
      fontSize: 26,                       // Bigger font size
    },
    // Content text
    text: {
      marginHorizontal: 20,               // Add horizontal margin
      color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
      textAlign: 'center',                // Center
      fontFamily: 'Avenir',
      fontSize: 18,
    },
    title_box_left_list:{
        fontSize:14,
        color:'#666666',
        paddingTop:5,
        paddingBottom:5,
    },
    
});

export default CompanyDetail;



// import React from 'react';
// import {
//   Text,
//   View,
// } from 'react-native';

// import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

// export default () => {
//   return <ScrollableTabView
//     style={{marginTop: 20, }}
//     initialPage={0}
//     renderTabBar={() => <ScrollableTabBar />}
//   >
//     <Text tabLabel='Tab #1'>My</Text>
//     <Text tabLabel='Tab #2 word word'>favorite</Text>
//     <Text tabLabel='Tab #3 word word word'>project</Text>
//     <Text tabLabel='Tab #4 word word word word'>favorite</Text>
//     <Text tabLabel='Tab #5'>project</Text>
//   </ScrollableTabView>;
// }