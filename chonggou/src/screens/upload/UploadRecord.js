// import React, { Component } from "react";
// import { Image, FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FetchManager from '../fetch/index';


// let totalPage = 5; // 总的页数
// let itemNo = 0; // item的个数
// export default class UploadRecord extends Component {
//   static navigationOptions = ({ navigation, navigationOptions }) => {
//     return {
//       headerLeft: (
//         <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
//           <FontAwesome color="#fff" name="angle-left" size={28} onPress={()=>navigation.push('Home')}/>
//           <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}} onPress={()=>navigation.goBack()}>返回</Text>
//         </View>
//       ),
//       headerTitle: (
//         <Text style={styles.headerMiddle}>上传记录</Text>
//       ),
//       headerRight:<Text style={{color:'blue',marginRight:15}}></Text>,
//       headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
//     };
//   }
 
//   constructor(props) {
//     super(props);
//     this.state = {
//       data:[],
//       loaded: true,
//       refreshing: false,
//       fresh: true,
//       animating: true,
//       nomore: false,
//       pageSize: 10,
//       pageNumber: 1,
//       showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
//       page:1
//     };
//     // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
//     // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
//     // this.fetchData = this.fetchData.bind(this);
//   }

//   componentDidMount() { //初始化的时候要判断长度 控制上拉加载
//     this.onEndReachedCalled = false;
//     this.fetchData(this.state.page)
//   }

//   fetchData=(n)=>{
//     var params={
//       limit:6,
//       page:n
//     }
//     FetchManager.get('/inner/safeHiddenTrouble/findPageList',params, async (set) => {
//       console.log('一键上传列表',set.data)
//       set.data.forEach(s=>{
//         s.reportTime=s.reportTime.replace('T',' ')
//       })
//       if(!parseInt(set.code)){
//         if(this.state.page==1){
//           this.setState({
//             data:set.data
//           })
//         }else{
//           this.setState({
//               // 加载更多 这个变量不刷新
//               refreshing : false,
//               // 数据源刷新 add
//               data: this.state.data.concat(set.data)
//           })
//         }
//       }
//     })
//   }
  
//   handleRefresh = () => {
//     if(!this.state.refreshing){
//         this.setState({
//           page:1
//         })
//         this.fetchData(this.state.page)
//     }
//   }
//   render() {
//     if (!this.state.loaded) {
//       return this.renderLoadingView();
//     }

//     return (
//       <FlatList
//         data={this.state.data}
//         renderItem={this.renderMovie}
//         style={styles.list}
//         onRefresh={() => this.handleRefresh}
//         refreshing={this.state.refreshing}
//         // keyExtractor={item => item.id}
//         ListHeaderComponent={this._createListHeader}
//         ListFooterComponent={this._renderFooter}
//         ListEmptyComponent={this._createEmptyView}
//         onEndReached={this._onEndReached}
//         onEndReachedThreshold={0.1}
//       />
//     );
//   }
//   _createListHeader(){
//       return (
//           <View style={styles.headView}>
//               <Text style={{color:'white'}}>
//                   头部布局
//               </Text>
//           </View>
//       )
//   }
//   _renderFooter = () => {
//     return (
//         <View style={styles.footerView}>
//             <Text style={{color:'white'}}>
//                 底部底部
//             </Text>
//         </View>
//     )
//   }

//   _onEndReached = () => {
//     if (!this.state.refreshing && this.state.data.length > 0){
//       console.log(this.state.page+1)
//       this.fetchData(this.state.page+1)
//       this.setState({
//         page:this.state.page+1,
//       })
//     }
//   }

//   _createEmptyView(){
//       return (
//           <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
//               <Text style={{fontSize:16}}>
//                   暂无列表数据
//               </Text>
//           </View>
//       );
//   }
//   renderLoadingView = () => {
//     return (
//       <View style={styles.container}>
//         <Text>Loading movies...</Text>
//       </View>
//     );
//   }

//   toDetail = (id) => {
//     this.props.navigation.navigate("UploadRecordDetail",{
//       ID:id
//     })
//   }

//   renderMovie = ({ item,key }) => {
//     // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
//     // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
//     let imgObj = null
//     if (item.scenePhoto) {
//       imgObj = <Image
//         source={{uri:item.scenePhoto}}
//         style={styles.thumbnail}
//       />
//     }
//     return (
//       <TouchableOpacity onPress={()=>this.toDetail(item.id)} key={key}>
//         <View style={styles.container}>
//           {imgObj}
//           <View style={styles.rightContainer}>
//             <Text style={styles.title}>上传时间：{item.reportTime}</Text>
//             <Text style={styles.year}>所在位置：{item.position}</Text>
//           </View>
//           <AntDesign color="#666666" name="right" size={18} />
//         </View> 
//       </TouchableOpacity>
//     );
//   }
// }

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F2F7FB",
//     paddingLeft: 15,
//     paddingRight: 15,
//     paddingTop: 15,
//     paddingBottom: 15,
//   },
//   rightContainer: {
//     flex: 1,
//     marginLeft: 15,
//     height: 58,
//     marginTop: 7,
//     marginBottom: 7,
//   },
//   title: {
//     fontSize: 15,
//     marginBottom: 15,
//     color: "rgba(51,51,51,1)",
//     fontFamily: "PingFang-SC-Medium",
//     fontWeight: "500",
//   },
//   year: {
//     fontSize: 13,
//     color: "rgba(102,102,102,1)",
//     fontFamily: "PingFang-SC-Medium",
//     fontWeight: "500",
//   },
//   thumbnail: {
//     width: 58,
//     height: 58
//   },
//   list: {
//     backgroundColor: "#F2F7FB",
//     height: '100%',
//   },
//   headerMiddle: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 18,
//     fontWeight: "bold",
//     flex: 1,
//     textAlign: 'center',
//   },
//   footer:{
//     flexDirection:'row',
//     height:24,
//     justifyContent:'center',
//     alignItems:'center',
//     marginBottom:10,
// },
// });





import React, {Component} from 'react';
import {
    View,Text,StyleSheet,Platform,RefreshControl,
    TouchableOpacity, FlatList, Image,AsyncStorage
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Select from '../components/select/selectobj';
import FetchManager from '../fetch/index';
import { getSystem } from '../components/getSystex';
import ModalDropdown from 'react-native-modal-dropdown';
import ModelPop from '../components/modelPop';


//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {width, height} = dimensions.get('window');

export default class HomeView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                    <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerTitle: (
                <Text style={styles.headerMiddle}>上传记录</Text>
            ),
            headerRight:(<View />),
            headerStyle: {
                backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'
            }
        };
    }

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
            isLoadDone:false,
            list:{
                size:10,
                page:0,
                source:1
            },
        }
    }

    componentDidMount(){
        const { list } = this.state;
        this._getHotList(list)
    }


    render() {
        const { data } = this.state;
        return (
            <View>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                <View>
                    <FlatList
                        style={{height: '100%',}}
                        data={data}
                        //item显示的布局
                        renderItem={({item}) => this._createListItem(item)}
                        // 空布局
                        ListEmptyComponent={this._createEmptyView}
                        // ListFooterComponent={this._renderFooter}
                        //下拉刷新相关
                        onRefresh={() => this._onRefresh()}
                        //加载更多
                        onEndReached={() => this._onLoadMore()}
                        refreshing={this.state.isRefresh}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
        );
    }


    /**
     * 创建布局
     */
    _createListItem(item){
        // console.log(item)
        const { navigation } = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('UploadRecordDetail',{
                item:item,
            })}>
                <View style={styles.container}>
                    <Image
                        style={styles.thumbnail}
                        source={{uri:'http://192.168.0.186:60080/'+item.scenePhoto}}
                    />
                    <View style={styles.rightContainer}>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>上传时间：</Text>
                            <Text style={styles.content}>{item.updateTime}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>上传人员：</Text>
                            <Text style={styles.content}>{item.uploadName}</Text>
                        </View>
                        <View style={styles.containerLine}>
                            <Text style={styles.title}>所在位置：</Text>
                            <Text style={styles.content}>{item.position}</Text>
                        </View>
                    </View>
                    
                    <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
                        <FontAwesome color="#3AA1FE" name="angle-right" size={20} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

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
     * 获取360 下载列表
     * @private
     */
    _getHotList(list) {
        console.log(list)//
        FetchManager.post('/safe/inner/safeHiddenTrouble/findPageList',list, async (set) => {
            //下面的就是请求来的数据
            console.log(set);
            if(set&&set.success){
                let datas = set.value;
                if(this.page === 1){
                    this.setState({
                        data: datas.content
                    })
                }else{
                    console.log("加载更多")
                    if(datas.content.length < 6){
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : true,
                            isLoadDone : true,
                            // 数据源刷新 add
                            data: this.state.data.concat(datas.content)
                        })
                    }else{
                        this.setState({
                            // 加载更多 这个变量不刷新
                            isLoadMore : false,
                            // 数据源刷新 add
                            data: this.state.data.concat(datas.content)
                        })
                    }
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
        console.log(list)
        // 不处于 下拉刷新
        if( !this.state.isRefresh && !this.state.isLoadDone){
            list['page'] = list.page + 1;
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
            list['page'] = list.page + 1;
            this.page = this.page + 1;
            this._getHotList(list)
        }
    }

    // _renderFooter(){
    //     return(
    //         <View>
    //             <Text style={{height:55}}>&nbsp;</Text>
    //         </View>
    //     )
    // }
}

const styles = StyleSheet.create({
    headerMiddle: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: 'center',
    }, 
    title_select:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        // height:40,
        borderColor:'#ccc',borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F7FB",
        // backgroundColor: "red",
        padding: 5,
        marginTop:5,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 10,
    },
    containerLine: {
        flexDirection: "row",
        alignItems: "center",
        // height: 25,
    },
    title: {
        fontSize: 15,
        color: "#333",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    content: {
        fontSize: 14,
        color: "#666",
        fontFamily: "PingFang-SC-Medium",
        fontWeight: "500",
    },
    thumbnail: {
        width: 70,
        height: 76
    },
});
