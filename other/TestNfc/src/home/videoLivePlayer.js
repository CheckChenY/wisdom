import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Button,Dimensions,FlatList,NativeModules,
    NativeEventEmitter,ScrollView } from 'react-native'; 
// import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const screenWidth = Dimensions.get('window').width;
// import FetchManager from '../fetch/index';
// import {LivePlayer} from "react-native-live-stream";
// import {  NodePlayerView } from 'react-native-nodemediaclient';

//不能呢个播放
class CaseVideo extends Component{

    constructor(props, context){
        super(props, context)
        this.page = 1;
        // this.player = null;


        // const RNRtmpEventManager = NativeModules.RNRtmpEventManager;

        // if (!(typeof RNRtmpEventManager === "undefined")) {
        //     const RNRtmpEventManager = new NativeEventEmitter(
        //         NativeModules.RNRtmpEventManager
        //     );

        //     RNRtmpEventManager.addListener(
        //         "RNRtmpEvent",
        //         (data) => this.handleRNRtmpEvent(data)
        //     );

        //     console.log("React Native Received: Just finished adding listeners");
        // }
        
        this.state = {//rtmp://39.108.213.89:1935/live/c844150006c9
            paused:true,
            data:[{url:'http://ivi.bupt.edu.cn/hls/zjtv.m3u8',title:'浙江卫视',id:0,bol:0},
            {url:'http://ivi.bupt.edu.cn/hls/cctv8.m3u8',title:'中央一套',id:1,bol:0},
            {url:'rtmp://39.108.213.89:1935/live/c844150006c9',title:'中山摄像头',id:2,bol:1},
            {url:'rtmp://58.200.131.2:1935/livetv/hunant',title:'湖南卫视',id:3,bol:1}
            ],
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比

            // data:[],
            isRefresh:false,
            isLoadMore:true,
            list:{
                limit:6,
                page:1,
                // warnState: 1
            },
        }
    }

 
    
    componentDidMount (){
        // console.log(this)
        // debugger
        // this.player.initialize();


        // const { list } = this.state;
        // const { deviceId } = this.props.navigation.state.params;
        // list.deviceId = deviceId;
        // this._getHotList(list);
    }

    onChangeIndex = (val) => {
        // let nub = val === 0 ? Number(val) + 2 : 1;
        console.log(val)
    }

    onBuffer = (val) => {
        console.log(val)
    }

    videoError = (val) => {
        console.log(val)
    }

    // onchangeBol = (val,i) => {
    //     // let data = this.state.data;
    //     // val.bol = val.bol === 0 ? 1 : 0;
    //     // data[i] = val
    //     console.log(val)
    //     this.player.play()

    //     // this.setState({
    //     //     data : data
    //     // })
    // }

    render(){
        const { data } = this.state;
        return(
            <ScrollView>
            <View>
                
                <FlatList
                    data={ data }
                    renderItem={({item,i}) => this._createListItem(item,i)}
                    // style={styles.list}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.isRefresh}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
            </View>
            </ScrollView>
        )
    }


    _createListItem(item,i){
        const { videoWidth,videoHeight } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={{margin:10,backgroundColor:'pink',textAlign:'center',color:'blue'}}>{item.title}</Text>
                {/* <TouchableOpacity>
                    <NodePlayerView 
                        style={styles.player}
                        // style={{ height: 200 }}
                        ref={(vp) => { this.vp = vp }}
                        inputUrl={item.url}
                        scaleMode={"ScaleAspectFit"}
                        bufferTime={300}
                        maxBufferTime={1000}
                        autoplay={true}
                    />
                </TouchableOpacity> */}
                {/* <LivePlayer source={{uri:item.url}}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={styles.player}
                    paused={true}
                    muted={false}
                    bufferTime={300}
                    maxBufferTime={1000}
                    resizeMode={"contain"}
                    onLoading={()=>{}}
                    onLoad={()=>{}}
                    onEnd={()=>{}}
                /> */}
                <Button
                    onPress={() =>  navigation.navigate('nodemediaclient',{
                        url:item.url
                    })} 
                    title="Play"
                />
            </View>
        );
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
        // FetchManager.get('1/unitdeviceApi/getDevice',list, async (set) => {
        //     console.log(set)
        //     if(set&&set.data){
        //         if(this.page === 1){
        //             this.setState({
        //                 data: set.data
        //             })
        //         }else{
        //             this.setState({
        //                 // 加载更多 这个变量不刷新
        //                 isLoadMore : false,
        //                 // 数据源刷新 add
        //                 data: data.concat(set.data)
        //             })
        //         }
        //     }
        // })
    }

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        const { list } = this.state;
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }

    _onRefresh=()=>{
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
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


export default CaseVideo;
