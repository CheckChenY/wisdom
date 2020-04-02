import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image } from 'react-native'; 
import { StackActions, NavigationActions } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CaseDetail from '../deal/caseDetail';
import CaseDete from '../deal/caseDate';
import CaseImage from '../deal/caseImage';
import CaseVideo from '../deal/caseVideo';
import CaseDevice from '../deal/caseDevice';
import TabsCompanents from '../components/tabs';
import ModelPop from '../components/modelPop';
import FetchManager from '../fetch/index';

class TroublePublicTab extends Component {
    static navigationOptions = ({ navigation }) => {
        const { status } = navigation.state.params;
        console.log(navigation);
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
                <Text style={styles.headerMiddle}>警情处理</Text>
            ),
            headerRight:(
                <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,paddingRight:5,paddingTop:3}}>{ status === '1' ? '联动动作' : ''}</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'
            }
        };
    }

    constructor(props){
        super(props)
        this.state = {
            index:1
        }
        this.onChangeTab = this.onChangeTab.bind(this)
    }

    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this.onPressSubmit})
    }

    onPressSubmit = () => {
        const { id,deviceId } = this.props.navigation.state.params;
        let obj = {
            deviceId:deviceId,
            alarmId:id
        }
        console.log(obj)
        FetchManager.get('/device/inner/jtlLinkLogicGroup/startLinkDeviceByHand',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set && set.success){
                this.popUp.showPop('操作成功')
            }else{
                this.popUp.showPop(set.errorMsg)
            }
        })
    }

    onChangeTab = (val) => {
        console.log(val)
        // debugger;
        // this.popChanges.onChangeIndex(val)
    }

    render() {
        const { index } = this.state;
        // console.log(this.props.deviceId)
        return (
            <View style={styles.container}>
                <TabsCompanents
                    onChangeTab = {this.onChangeTab.bind(this)}
                >
                    <View title="警情信息">
                        <CaseDetail 
                            { ...this.props }

                            // ref={ ref => this.popChanges = ref }

                            // index={index} 
                            />
                    </View>
                    <View title="警情数据">
                        <CaseDete 
                            { ...this.props }

                            // ref={ ref => this.popChanges = ref }

                            // index={index} 
                            />
                    </View>
                    <View title="相关图片">
                        <CaseImage 
                            { ...this.props }

                            //  ref={ ref => this.popChanges = ref }

                            // index={index} 
                            />
                    </View>
                    <View title="关联视频">
                        <CaseVideo 
                            { ...this.props }

                            //  ref={ ref => this.popChanges = ref }

                            // index={index} 
                            />
                    </View>
                    <View title="联动设备">
                        <CaseDevice 
                            { ...this.props }

                            //  ref={ ref => this.popChanges = ref }
                            
                            // index={index} 
                            />
                    </View>
                </TabsCompanents>
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
    container: {
        // backgroundColor:'#F2F7FB',
        padding:5,
        flex:1,
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
    
});

export default TroublePublicTab;