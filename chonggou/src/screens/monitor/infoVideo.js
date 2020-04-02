import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Button,Dimensions,FlatList,NativeModules,
    NativeEventEmitter,ScrollView } from 'react-native'; 
// import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screenWidth = Dimensions.get('window').width;
import FetchManager from '../fetch/index';
import ModelPop from '../components/modelPop';

class InfoVideo extends Component{

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center',color:'#fff',fontSize:17 }}>{'关联视频'}</Text>
            ),
            headerRight:<View />,
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

    constructor(props, context){
        super(props, context)
        this.page = 1;
        
        this.state = {//rtmp://39.108.213.89:1935/live/c844150006c9
            paused:true,
            // data:[{url:'http://ivi.bupt.edu.cn/hls/zjtv.m3u8',title:'浙江卫视',id:0,bol:0},
            // {url:'http://ivi.bupt.edu.cn/hls/cctv8.m3u8',title:'中央一套',id:1,bol:0},
            // {url:'rtmp://39.108.213.89:1935/live/c844150006c9',title:'中山摄像头',id:2,bol:1},
            // {url:'rtmp://58.200.131.2:1935/livetv/hunant',title:'湖南卫视',id:3,bol:1}
            // ],
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比

            data:[],
            isRefresh:false,
            isLoadMore:true,
            pushserver:'rtmp://58.200.131.2:1935/',
            stream:'livetv/hunantv',
            list:{
                // size:6,
                // page:1,
                // warnState: 1
            },
        }
    }

 
    
    componentDidMount (){
        const { list } = this.state;
        const { deviceId } = this.props.navigation.state.params;
        // list.deviceId = '987654321'
        list.deviceId = deviceId;
        this._getHotList(list);
        // this._getDevice(deviceId)
    }
    
    // _getDevice = (deviceId) => {
    //     const { list } = this.state;
        
    //     FetchManager.get('1/unitdeviceApi/deviceId/' + deviceId,'', async (set) => {
    //         console.log(set)
    //         if(set&&set.data){
    //             list.deviceId = set.data.deviceId;
    //             this._getHotList(list);
    //         }
    //     })
    // }

    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        console.log(val)
    }

    render(){
        const { data } = this.state;
        return(
            <View>
                <FlatList
                    data={ data }
                    renderItem={({item,i}) => this._createListItem(item,i)}
                    // style={styles.list}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    // onRefresh={() => this._onRefresh()}
                    // refreshing={this.state.isRefresh}
                    // //加载更多
                    // onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        )
    }


    _createListItem(item){
        return (
            <View style={styles.container}>
                <Text style={{margin:10,textAlign:'center'}}>{item.location}</Text>
                <Button
                    onPress={ () => this.onEnterUrl(item.id) } 
                    title={item.deviceName}
                />
            </View>
        );
    }



    onEnterUrl = (id) => {
        let self = this;
        let obj = {
            deviceCameraId: id
        }
        FetchManager.get('/camera/inner/videoHead/rtmp',obj, async (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                let pushserver = data.substring(0,26);
                let stream = data.substring(26,data.length);
                self.props.navigation.push('infoVideoList',{
                    'pushserver': pushserver, 
                    'stream': stream 
                })
            }else{
                this.popUp.showPop('暂无视频')
            }
        })
    }

    _createEmptyView(){
        return (
            <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据
                </Text>
            </View>
        );
    }


    _getHotList(list) {
        const { data } = this.state;
        // console.log(list)
        FetchManager.get('/camera/inner/videoHead/list',list, async (set) => {
            console.log(set)
            if(set&&set.success){
                if(this.page === 1){
                    let datas = set.value;
                    this.setState({
                        data: datas
                    })
                }else{
                    this.setState({
                        // 加载更多 这个变量不刷新
                        isLoadMore : false,
                        // 数据源刷新 add
                        data: data.concat(datas)
                    })
                }
            }
        })
    }

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0 && !this.state.isLoadDone){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }

    _onRefresh=()=>{
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh && !this.state.isLoadDone && data.length > 5){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            console.log(list)
            this._getHotList(list)
        }
    };
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor:'#FFFFFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:10
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    player: {
      width: '90%',
      height:200
    }
});


export default InfoVideo;
