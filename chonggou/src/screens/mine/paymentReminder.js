import React, { Component } from "react";
import Modal from "react-native-modal";
import { Image, FlatList, StyleSheet, Text, View, RefreshControl,Dimensions,TextInput,Button, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
// let dataList = [{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// },{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// },{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// },{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// },{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// },{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// },{
//   time: '2019-01-01 12:01:12',
//   content: '尊敬的【项目名称】, 贵单位的智慧安全用电管理云平台服务即将到期，为避免影响使用请及时缴费，缴费服务电话 400-624-149'
// }];
let totalPage = 5; // 总的页数
let itemNo = 0; // item的个数
const { height, width } = Dimensions.get('window');
export default class paymentReminder extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerLeft: (
        <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
          <FontAwesome color="#fff" name="angle-left" size={28} onPress={()=>navigation.goBack()}/>
          <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}} onPress={()=>navigation.goBack()}>返回</Text>
        </View>
      ),
      headerTitle: (
        <Text style={styles.headerMiddle}>续费提醒</Text>
      ),
      headerRight:<Text style={{color:'blue',marginRight:15}}></Text>,
      headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
    };
  }
 
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: true,
      refreshing: false,
      fresh: true,
      animating: true,
      nomore: false,
      pageSize: 10,
      pageNumber: 1,
      showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
      dialog:false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    // this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() { //初始化的时候要判断长度 控制上拉加载
    this.onEndReachedCalled = false;
//     this.fetchData();
  }

  //网络请求——获取数据
  fetchData() {
    //这个是js的访问网络的方法
    console.log(REQUEST_URL+this.state.pageNumber)
    fetch(REQUEST_URL+this.state.pageNumber,{
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseData) => {
      let data = responseData.results;//获取json 数据并存在data数组中
      let dataBlob = [];//这是创建该数组，目的放存在key值的数据，就不会报黄灯了
      let i = itemNo;
      data.map(function (item) {
        dataBlob.push({
          key: i,
          desc: item.desc,
          time: item.createdAt,
          who:item.who, 
          url:item.url
        })
        i++;
      });
      itemNo = i;
      let foot = 0;
      if(this.state.pageNumber >= totalPage){
        foot = 1;//listView底部显示没有更多数据了
      }
      this.setState({
        //复制数据源
        //  dataArray:this.state.dataArray.concat( responseData.results),
        dataArray:this.state.dataArray.concat( dataBlob),
        isLoading: false,
        showFoot:foot,
        isRefreshing:false,
      });
      data = null;//重置为空
      dataBlob = null;
    })
    .catch((error) => {
      this.setState({
        error: true,
        errorInfo: error
      })
    })
    .done();
  }

  handleRefresh = () => {
    this.setState({
      pageNumber:1,
      refreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
      data:[],
    });
    setTimeout(() => {
      this.setState({
        refreshing:false,//tag,下拉刷新中，加载完全，就设置成flase
        // data: dataList,
      });
    })
    // this.fetchData()
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <Modal isVisible={this.state.dialog}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
            <View style={{flexDirection:"column",padding:5,borderRadius:3,backgroundColor:"#FFFFFF",width:width-50}}>
                <Text style={{fontWeight:"900",fontSize:18,paddingLeft:20,paddingRight:20,fontWeight:'900',marginTop:20}}>
                    {/* <FontAwesome color="#fff" name="exclamation-circle" size={28}/> */}
                    提示
                </Text>
                <View style={{flexDirection:'row',padding:10,marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                    <Text style={{fontWeight:"600",fontSize:16}}>删除成功</Text>
                </View>
                <View style={{flexDirection:"row",marginTop:25,paddingBottom:25}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:1,marginLeft:10}}>
                        <Button 
                            title='确定'
                            style={{width:80}}
                            onPress={()=>{this.success()}}
                        />
                    </View>
                    <View style={{flex:1}}></View>
                </View>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={this.renderMovie}
          style={styles.list}
          // keyExtractor={item => item.id}
          ListFooterComponent={this._renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.1}
          // ItemSeparatorComponent={this._separator}
          //为刷新设置颜色
          // refreshControl={<RefreshControl
          //   refreshing={this.state.refreshing}
          //   onRefresh={this.handleRefresh}//因为涉及到this.state
          //   colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
          //   progressBackgroundColor="#ffffff"
          // />}
        />
      </View>
      
    );
  }
  success=()=>{
    this.setState({
      dialog:false
    })
  }
  _separator = () => {
    return <View style={{height:2,backgroundColor:'rgba(235,235,235,1)'}}/>;
  }
  _renderFooter = () => {
    if (this.state.showFoot === 1) {
      return (
        <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
          <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if(this.state.showFoot === 2) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text>正在加载更多数据...</Text>
        </View>
      );
    } else if(this.state.showFoot === 0){
      return (
        <View style={styles.footer}>
          <Text></Text>
        </View>
      );
    }
  }

  _onEndReached = () => {
    //如果是正在加载中或没有更多数据了，则返回
    if (this.state.showFoot != 0 ) {
      return ;
    }
    //如果当前页大于或等于总页数，那就是到最后一页了，返回
    if((this.state.pageNumber != 1) && (this.state.pageNumber >= totalPage)) {
      return;
    } else {
      this.state.pageNumber++;
    }
    //底部显示正在加载更多数据
    // this.setState({showFoot:2});
    //获取数据，在componentDidMount()已经请求过数据了
    if (this.state.pageNumber > 1) {
      // this.fetchData();
      this.setState({
        // data: this.state.data.concat(dataList),
      });
    }
  }

  renderLoadingView = () => {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }
  deleteMsg=(data)=>{
    console.log(data)
    this.setState({
      dialog:true
    })
  }
  renderMovie = ({ item }) => {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <Text style={styles.dateTime}>{item.time}</Text>
            <Text style={styles.contStyle}>{item.content}</Text>
          </View>
          <FontAwesome style={styles.iconStyle} name="trash" onPress={()=>{this.deleteMsg(item)}}/>
        </View> 
      </TouchableOpacity>
    );
  }
  
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F7FB",
    paddingLeft: 15,
    paddingRight: 15,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 30,
    paddingBottom: 15,
  },
  dateTime: {
    fontSize: 13,
    marginBottom: 16,
    color: "#999",
    fontFamily: "PingFang-SC-Medium",
    fontWeight: "500",
  },
  contStyle: {
    fontSize: 14,
    color: "#333",
    height: "100%",
    fontFamily: "PingFang-SC-Medium",
    fontWeight: "500",
  },
  iconStyle: {
    fontSize: 25,
    color: "#999",
    height: '100%', 
    paddingTop: 15,
  },
  list: {
    backgroundColor: "#F2F7FB",
  },
  headerMiddle: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
},
});
