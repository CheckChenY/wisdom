import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Animated,Easing,
    Alert,DeviceEventEmitter } from 'react-native'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera'


class QscodeScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        // debugger;
        return{
            title: '扫码',
            headerStyle: {
              backgroundColor: '#f4511e',
              alignItems: 'center',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex:1
            },
            headerLeft:(
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <FontAwesome style={{paddingLeft:20}} name="th" size={18} />
                </TouchableOpacity>
            ),
            headerRight: <View />
        }
    };

    constructor() {
        super();
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