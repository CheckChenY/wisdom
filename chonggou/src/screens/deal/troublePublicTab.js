import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TroubleTabList from './troubleTabList';
import TabsCompanents from '../components/tabs';

class TroublePublicTab extends Component {

    static navigationOptions = ({ navigation }) => {
        // const { id,name } = navigation.state.params;
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
                <Text style={styles.headerMiddle}>隐患处理</Text>
            ),
            headerRight:<View />,
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

    onChangeTab = (val) => {
        // console.log(val)
        this.popUp.onChangeIndex(val)
    }

    render() {
        const { index } = this.state;
        return (
            <View style={styles.container}>
                <TabsCompanents
                    onChangeTab = {this.onChangeTab.bind(this)}
                >
                    <View title="待处理">
                        <TroubleTabList 
                            { ...this.props }

                            ref={ ref => this.popUp = ref }

                            index={index} />
                    </View>
                    <View title="已处理">
                        <TroubleTabList 
                            { ...this.props }

                             ref={ ref => this.popUp = ref }

                            index={index} />
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

export default TroublePublicTab;