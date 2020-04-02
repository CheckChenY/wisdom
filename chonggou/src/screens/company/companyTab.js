import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import CompanyInfo from './companyInfo';
import CompanyRecord from './companyRecord';
import TabsCompanents from '../components/tabs';
import ModelPop from '../components/modelPop';


class TroublePublicTab extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { name,id,bolRelation,disabled } = navigation.state.params;
        console.log(id)
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:16 }}>{'单位警情'}</Text>
            ),
            headerRight:(
                    <View />
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
        console.log(val)
        // this.popCompany.onChangeIndex(val)
    }





    render() {
        const { index } = this.state;
        // console.log(this.props.deviceId)
        return (
            <View style={styles.container}>
                <TabsCompanents
                    onChangeTab = {this.onChangeTab.bind(this)}
                >
                    <View title="警情查看">
                        <CompanyInfo 
                            { ...this.props }

                            // ref={ ref => this.popCompany = ref }

                            // index={index} 
                            />
                    </View>
                    <View title="警情记录">
                        <CompanyRecord 
                            { ...this.props }
                            //  ref={ ref => this.popCompany = ref }

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