import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Animated,Easing,
    Alert,DeviceEventEmitter } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera'


class QscodeScreens extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center',color:'#FFFFFF',flex:1 }}>扫码添加</Text>
            ),
            headerRight: <View />,
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
            },
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            moveAnim: new Animated.Value(0),
            result:''
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.onBarCodeRead}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle}/>
                        <Animated.View style={[
                            styles.border,
                            {transform: [{translateY: this.state.moveAnim}]}]}/>
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                    </View>
                </RNCamera>
            </View>
        );
    }  

    //  识别二维码
    onBarCodeRead = (result) => {
        // console.waring(result)
        // const { data } = result; //只要拿到data就可以了
        const { item } = this.props.navigation.state.params;
        let titleName = item === '1' ? 'AddDev' : 'MonitorDev';
        // Alert.alert(result.data)
        this.props.navigation.replace(titleName,{
            code:result.data
        })
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:400
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});

export default QscodeScreens;