import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Image } from 'react-native'; 
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../http/http'


class CameraComponent extends Component {


    state = {
        avatarSource: null,
        videoSource: null,
        avatar:''
    };

    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        // this.selectVideoTapped = this.selectVideoTapped.bind(this);
    }

    selectPhotoTapped() {
        const options = {
            title:'请选择照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', 
            chooseFromLibraryButtonTitle: '选择照片', 
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
            imgBase:''
        };

        ImagePicker.showImagePicker(options, (response) => {

            const { getImgBase } = this.props;
            getImgBase(response.data)

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }


    render() {
        console.log(this.state.avatar)
        return (
            <View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    {this.state.avatarSource === null ? (
                        <View style={styles.c_clock_update_box}>
                            <Image
                                style={{width:'100%',height:'100%',}}
                                source={{uri:this.state.avatar}}
                            />
                        </View>
                        ) : (
                        <View style={styles.c_clock_update_box}>
                            <Image style={{width:'100%',height:'100%'}} source={this.state.avatarSource} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    }  
    componentDidMount(){
        FetchManager.get('/app/acbuser/findUserById','', async (set) => {
            console.log(set)
            if(set.status==0){
                this.setState({
                    avatar:set.data.avatar
                })
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#D9E4ED',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: '100%',
        height: '100%',
    },
    c_clock_update_box:{
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default CameraComponent;