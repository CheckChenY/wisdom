import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,AsyncStorage } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PatrolPublicTab from './patrolPublicTab';
import TabsCompanents from '../../components/tabs';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

class CompanyDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        // const { id,code } = navigation.state.params;
        return {
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                    <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={styles.headerMiddle}>巡查任务详情</Text>
            ),
            headerRight:(<TouchableOpacity onPress={()=>navigation.push('actionPatrolFrom')}>
                            <Text style={{color:'#fff',fontSize: 16,marginRight:15}}>开始巡查</Text>
                        </TouchableOpacity>),
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
    }

    componentDidMount(){
        this._stopDetection();
    }

    onChangeTab = (val) => {
        console.log(val)
        this.popUp.onChangeIndex(val)
    }


    //关闭NFC功能
    _stopDetection = () => {
        console.log('已关闭NFC功能')
        this.setState({
            nfcbool:false
        })
        NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
    }

    render() {
        // const { id } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <TabsCompanents
                    onChangeTab = {this.onChangeTab.bind(this)}
                >
                    <View title="已巡查">
                        <PatrolPublicTab 
                            { ...this.props }

                             ref={ ref => this.popUp = ref }

                             patrolStatus={1} 
                             />
                    </View>
                    <View title="待巡查">
                        <PatrolPublicTab 
                            { ...this.props }

                            ref={ ref => this.popUp = ref }

                            patrolStatus={2} 
                            />
                    </View>
                    <View title="漏巡查">
                        <PatrolPublicTab 
                            { ...this.props }

                             ref={ ref => this.popUp = ref }

                             patrolStatus={3} 
                             />
                    </View>
                </TabsCompanents>
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

export default CompanyDetail;