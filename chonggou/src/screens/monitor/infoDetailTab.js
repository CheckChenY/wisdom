import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import InfoDetail from './infoDetail';
import InfoImage from './infoImage';
import InfoVideo from './infoVideo';
import InfoDevice from './infoDevice';
import TabsCompanents from '../components/tabs';
import ModelPop from '../components/modelPop';


class TroublePublicTab extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { name,id,bolRelation,disabled } = navigation.state.params;
        console.log(id)
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:16 }}>{name}</Text>
            ),
            headerRight:(
                <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,paddingRight:5,paddingTop:3}}>{ bolRelation && disabled === false ? '联动动作' : ''}</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerLeft:(
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                    <FontAwesome color="#fff" name="angle-left" size={28}/>
                    <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                </View>
            </TouchableOpacity>
            ),
            headerStyle:{
                backgroundColor: '#3AA1FE',
                height:50
            }
        };
    };

    constructor(props){
        super(props)
        this.state = {
            index:1
        }
    }

    onChangeTab = (val) => {
        // console.log(val)
        this.popChange.onChangeIndex(val)
    }

    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this.onPressToChang})
    }

    onPressToChang = () => {
        // console.log('123456')
        let stateNub = this.props.navigation.state.params.bolRelation ? '1' : '2';
        let obj = {};
        obj.state = stateNub
        console.log(obj)
        FetchManager.post('1/unitdeviceApi/setState',obj, (set) => {
            console.log(set)
            if(set&&set.msg === '成功'){
                this.popUp.showPop(set.msg)
            }else{
                this.popUp.showPop(set.errorMsg)  
            }
        })
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
                        <InfoDetail 
                            { ...this.props }

                            ref={ ref => this.popChange = ref }

                            index={index} />
                    </View>
                    <View title="相关图片">
                        <InfoImage 
                            { ...this.props }

                             ref={ ref => this.popChange = ref }

                            index={index} />
                    </View>
                    <View title="关联视频">
                        <InfoVideo 
                            { ...this.props }

                             ref={ ref => this.popChange = ref }

                            index={index} />
                    </View>
                    <View title="联动设备">
                        <InfoDevice 
                            { ...this.props }

                             ref={ ref => this.popChange = ref }

                            index={index} />
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
        backgroundColor:'#F2F7FB',
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