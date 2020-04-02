import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,PixelRatio,Button,Dimensions,FlatList,NativeModules,
    NativeEventEmitter,ScrollView } from 'react-native'; 
const screenWidth = Dimensions.get('window').width;
import FetchManager from '../fetch/index';
import ModelPop from '../components/modelPop';

class CaseVideo extends Component{

    constructor(props, context){
        super(props, context)
        this.page = 1;
        this.state = {
            paused:true,
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
            
            data:[],
            isRefresh:false,
            isLoadMore:true,
            isLoadDone : false,
            pushserver:'rtmp://58.200.131.2:1935/',
            stream:'livetv/hunantv',
            list:{
                size:6,
                page:0,
                // warnState: 1
            },
        }
    }

 
    
    componentDidMount (){
        const { list } = this.state;
        const { deviceId } = this.props.navigation.state.params;
        // this._getDevice(deviceId)
        list.deviceId = deviceId
        this._getHotList(list);
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
        // const { deviceId } = this.props.navigation.state.params;
        // this._getDevice(deviceId)
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
                    //加载更多
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
                    onPress={ () => this.onEnterUrl(item) } 
                    title={item.deviceName}
                />
            </View>
        );
    }



    onEnterUrl = (item) => {
        // console.log(item)
        let self = this;

        let obj = {
            deviceCameraId:item.id
        }
        FetchManager.get('/camera/inner/videoHead/rtmp',obj, async (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                // let data = 'rtmp://47.105.145.192:1935/live/c844150006c9';
                // let data = 'rtmp://58.200.131.2:1935/livetv/hunantv';
                let pushserver = data.substring(0,26);
                let stream = data.substring(26,data.length);
                self.props.navigation.push('caseVideoList',{
                    'pushserver': pushserver, 
                    'stream': stream ,
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
                    this.setState({
                        data: set.value
                        // data: [{url:'http://ivi.bupt.edu.cn/hls/zjtv.m3u8',title:'浙江卫视',id:0,bol:0}]
                    })
                }else{
                    if(set.value.length < 6){
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : true,
                            isLoadDone : true,
                            // 数据源刷新 add
                            data: this.state.data.concat(set.value)
                        })
                      }else{
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : false,
                            // 数据源刷新 add
                            data: this.state.data.concat(set.value)
                        })
                      }
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
        if(!this.state.isRefresh && !this.state.isLoadDone){
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
        // justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#F2F7FB',
        marginTop:10
        // marginTop:10
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

