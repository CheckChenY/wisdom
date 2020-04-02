import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, FlatList, Image,ScrollView
} from 'react-native';
import FetchManager from '../fetch/index';
import { getAllFloor,getSigleFloor } from '../components/getSystex';
import DeviceName from '../components/deviceName';
export default class DeviceMessageList extends Component {

    constructor(props){
        super(props);
        //当前页
        this.page = 1
        //状态
        this.state = {
            // 列表数据结构
            data:[],
            // 下拉刷新
            isRefresh:false,
            // 加载更多
            isLoadMore:true,
            page:1,
            list:{
                page:1,
                limit:6,
                type:1,
            },
            buildingDic:'',
            floorDic:'',
            index:1,
            bolRelation:false,
        }
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.getData();
        });
        
        this._getRelation();//关联动作
    }


    componentWillUnmount() {
        this._navListener.remove();
    }

    _getRelation = () => {
        FetchManager.get('1/unitdeviceApi/state','', async (set) => {
            console.log(set)
            if(set&&set.msg === '成功'&&set.data === '2'){
                //1 是自动  2 手动
                this.setState({
                    bolRelation:true
                })
            }
        })
    }

    onChangeIndex = (val) => {
        // debugger;
        const { list } = this.state;
        // console.log(val)
        list.type = val;
        list.page = 1;
        this.setState({
            index:val,
            data:[]
        },this.clearData)
        
        // this._getHotList(list)
    }
    
    clearData = () => {
        const { list } = this.state;
        this._getHotList(list)
    }

    getData = () => {
        const { list } = this.state;

        getAllFloor().then(res => {
            this.setState({
                buildingDic:res,
            })
        }); 

        getSigleFloor().then(res=>{
            // console.log(res) 
            if(res.length){
                this.setState({
                    floorDic:res,
                })
            }
        })

        this._getHotList(list)
    }


    render() {
        const { data } = this.state;
        return (
            <View>
                <FlatList
                    // style={styles.container}
                    data={data}
                    //item显示的布局
                    renderItem={({item}) => this._createListItem(item)}
                    // 空布局
                    ListEmptyComponent={this._createEmptyView}
                    //下拉刷新相关
                    onRefresh={this._onRefresh}
                    refreshing={this.state.isRefresh}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        const { navigation } = this.props;
        const { index } = this.state;
        let time = item.createdDate ? item.createdDate.replace('T',' ') : item.createdDate;
        // let getId = url === 'infoDetail' ? item.deviceAlertId : url === 'NoticeAnnounce' ? item.id : ''
        let url = index === 1 ? 'infoDetailTab' : index === 3 ? 'NoticeAnnounce' : index === 2 && item.satate === '1' ? 'PatrolRecordList' : index === 2 ? 'PatrolDetaiList' : '';
        // console.log(url);
        let bol = index === 1 && item.satate === '2' ? true : false;
        if(index === 1){
            if(item.satate === '1'){
                debugger;
            }
        }else if(index === 2){
            if(item.satate === '1'){
                debugger;
            } 
        }
        // let id = index === 1 ? 'id' : index === 3 ? 'id' : 'patrolTaskId';
        let getId = index === 1 ? item.deviceAlertId : index === 3 ? item.id : item.safeTaskId

        // debugger
        let mes = '',tit = '',noticeTitle2 = '';
        if(index === 3){
            mes = this.getChangeMessage(item.noticeTitle2,item.noticeType,item.deviceAlertId);
            // tit = this.getChangeTitle(item.noticeTitle,item.noticeType,item.deviceAlertId)
            // console.log(mes)
        }else if(index === 1){
            // tit = this.getChangeTitle(item.noticeTitle,item.deviceAlertId)
            mes = this.getChangeMessage(item.noticeTitle2,item.noticeType,item.deviceAlertId);
            // tit = this.getChangeTitle(item.noticeTitle,item.noticeType,item.deviceAlertId)
        }else{
            noticeTitle2 = item.noticeTitle2 ? item.noticeTitle2.split('~') : item.noticeTitle2
        }
        // console.log(item)
        return (
            <View style={styles.container}> 
                <Text style={styles.title}>{time}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate(url,{
                    id:getId,
                    name:"详情信息",
                    disabled:bol,

                    systemId:item.systemId,
                    floorId:item.floorId,
                    deviceId:item.deviceId,
                    bolRelation:this.state.bolRelation
                })}>
                    <View style={styles.box}>
                        <Text style={styles.box_title}>
                            {item.noticeTitle}
                        </Text>
                        <View style={styles.box_localtion}>
                            <Text style={styles.box_localtion_left}>
                                { 
                                    index === 3 || index === 1 ? mes : (
                                        noticeTitle2.map((show,index)=>(
                                            <Text key={index}>
                                                &nbsp;&nbsp;&nbsp;&nbsp;{ show.replace('T',' ') }
                                            </Text>
                                        ))
                                    ) 
                                }
                            </Text>
                        </View>
                        <Text style={styles.box_localtion_message}>{item.noticeContent}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    getChangeMessage = (mes,type,deviceAlertId) => {
        const { buildingDic,floorDic } = this.state;
        // debugger;
        let s = ''
        if(type === 3 || type === 1){
            if(!deviceAlertId){
                s = mes
            }else{
                //所在位置修改
                if(mes.split('+~+').indexOf('null')!=-1){
                    s='无'
                }else if(mes.indexOf('null')!=-1){
                    s = mes
                }else{
                    let building=Number(mes.split('+~+')[0])
        
                    let item = buildingDic ? buildingDic.filter(f=>f.value === building) : []
                    // debugger;
                    // console.log(mes.split('+~+')[0])
                    let floor=Number(mes.split('+~+')[1])
        
                    let show = floorDic ? floorDic.filter(f=>f.value === floor): []
        
                    let loca=mes.split('+~+')[2]
        
                    s = item[0] && show[0] ? item[0].label+'--'+show[0].label+'--'+loca : ''
                }
            }
        }else{
            s = mes
        }
        return s
    }

    // getChangeTitle = (tit,type,deviceAlertId) => {
    //     let s = ''
    //     if(type === 3 || type === 1){
    //         if(!deviceAlertId){
    //             s = tit
    //         }else{
    //             //所在位置修改
    //             if(tit.indexOf('null')!=-1){
    //                 s = tit
    //             }
    //             if(tit.split('-').indexOf('null')!=-1){
    //                 s='无'
    //             }else{
    //                 let arr=Number(tit.split('-')[0])
    //                 let obj=tit.split('-')[1]
    //                 // debugger
    //                 let name = DeviceName[arr]
    //                 s = name + '-' + obj
    //             }
    //         }
    //     }else{
    //         s = tit
    //     }
    //     // console.log(s)
    //     return s;
    // }

    /**
     * 空布局
     */
    _createEmptyView(){
        return (
            <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据
                </Text>
            </View>
        );
    }

    /**
     * @private
     */
    _getHotList(list) {
        // const { index } = this.props;
        // list['type'] = index;
        // debugger;
        // const {  data } = this.state;
        console.log(list);
        FetchManager.get('1/noticemessage/selcetPage',list, async (set) => {
            console.log(set);
            if(set&&set.records){
                if(this.page === 1){
                    // data = [];
                    this.setState({
                        data: set.records
                    })
                }else{
                    this.setState({
                        isLoadMore : false,
                        data: data.concat(set.records)
                    })
                }
            }
        })
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        const { list } = this.state;
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            list['page'] = this.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    };

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
}

const styles = StyleSheet.create({
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    },
    container:{
        padding:10,
        backgroundColor:"#F5FCFF"
    },
    title:{
        textAlign:'center',fontSize:13,color:"#788A93"
    },
    box:{
        backgroundColor:"#FFFFFF",padding:15,flexDirection:"column",marginTop:10
    },
    box_title:{fontSize:16,color:"#333333",fontWeight:"900"},
    box_localtion:{flexDirection:"row",paddingBottom:15,paddingTop:15},
    box_localtion_left:{fontSize:15,fontWeight:"600",color:"#333333",},
    box_localtion_right:{flex:1,color:"#666666",fontSize:14},
    box_localtion_message:{color:"#999999",fontSize:14},
    thumbnail: {
        width: 80,
        height: 86
    },
});