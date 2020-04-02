import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,TouchableOpacity,Image, ImageBackground } from 'react-native';
const {width, height} = Dimensions.get('window');
import FetchManager from '../fetch/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuImg from '../../img/menu';
import { ScrollView } from 'react-native-gesture-handler';
class mineScreens extends Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>更多菜单</Text>
            ),
            headerRight:(
                <Text></Text>
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

    constructor(){
        super()
        this.state = {
            data:[],
        }
    }

    componentDidMount(){
        console.log(width + '+++++' + height)
        let obj = {
            sysCodes: 103
        }
        //消息通知GET /noticemessage/selectTwoMessage
        FetchManager.get('/menu/inner/jtlRole/findByUserId',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                this.setState({
                    data : data
                })
            }
        })
    }

    getCompanyList = (item) => {
        this.props.navigation.navigate(item)
    }
  

    render() {
        const { data } = this.state;

        return (
            <View style={{flex:1}}>
                <ImageBackground source={require('../../img/video.png')} style={styles.imgBg}>
                    <View style={{ flexDirection:'row' }}>
                        <View style={styles.title_btn}>
                            <View style={styles.title_btn_list}>
                                {
                                    data.map((show,i) => (
                                        <View key={i} style={styles.title_btn_list_normal}>
                                            <TouchableOpacity onPress={ ()=>this.getCompanyList(show.menuPath) } >
                                                <View style={{alignItems:'center'}}>
                                                    <Image
                                                        style={styles.c_Img}
                                                        source={MenuImg['png' + show.menuCode]}
                                                    />

                                                    <Text style={{fontSize:12,paddingTop:10}}>
                                                        {show.menuName}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    c_Img: {
        height: 60,
        width: 60,
    },
    imgBg:{
        flex:1,resizeMode: 'contain'
    },

    title_btn: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    title_btn_list: {
        width: width,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection: 'row',
    },

    title_btn_list_normal: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        width:(width-80)/4,
        margin: 10,
        borderRadius:4,
        alignItems:"center",
        paddingTop:5,
        paddingBottom:5,
        // elevation: 4,
    },

})

export default mineScreens