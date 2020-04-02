import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Select from '../components/select/select';
import FetchManager from '../fetch/index';

let totalPage = 5; // 总的页数
let itemNo = 0; // item的个数
export default class CommitRecords extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                <FontAwesome color="#fff" name="angle-left" size={28}/>
                <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
            </View>
        </TouchableOpacity>
      ),
      headerTitle: (
          <Text style={styles.headerMiddle}>操作记录</Text>
      ),
      headerRight:<Text></Text>,
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
      build:[],
      floor:['全部','消音','自检','复位'],
      selectSystem:'请选择操作类型',
      selectTerm:'请选择操作人',
      isopen:false,
      language:'',
      operationType:{
        '0':'全部',
        '1':'消音',
        '2':'自检',
        '3':'复位',
        '4':'上电',
        '5':'断电',
        '6':'屏蔽',
      },
      operation:'1',
      operator:'1'
    };
    this.onChangeSystem=this.onChangeSystem.bind(this)
    this.onChangeTerm=this.onChangeTerm.bind(this)
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    // this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() { //初始化的时候要判断长度 控制上拉加载
    this.onEndReachedCalled = false;
//     this.fetchData();
    FetchManager.get('1/user/findAllUser',{}, (set) => {
      var userDic={}
      set.forEach(s=>{
        userDic[s.id]=s.realName
      })
      var userList=[]
      set.forEach(s=>{
        userList.push(s.realName)
      })
      this.setState({
        userDic:userDic,
        build:userList
      })
    })
    var _params={
      deviceId:this.props.navigation.state.params.deviceId
    }
    FetchManager.get('1/deviceoperationrecord/page',_params, (set) => {
      console.log(set)
      if(!parseInt(set.code)){
        if(set.data.length){
          set.data.forEach(s=>{
            s.operationTime=s.operationTime.replace('T',' ')
          })
        }
        this.setState({
          data:set.data,
          initData:set.data
        })
      }
    })
  }

  handleRefresh = () => {
    this.setState({
      pageNumber:1,
      refreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
      data:this.state.data,
    });
    setTimeout(() => {
      this.setState({
        refreshing:false,//tag,下拉刷新中，加载完全，就设置成flase
        data: this.state.data,
      });
    })
    // this.fetchData()
  }

  onChangeSystem = (index,item) => {
    console.log(item);
    for(let i in this.state.operationType){
      if(this.state.operationType[i]==item){
        if(this.state.selectSystem=='请选择操作类型'){
          this.setState({
            selectSystem: item,
            operation:i,
            data:this.state.initData.filter(s=>s.operationType==i)
          })
        }else{
          this.setState({
            selectSystem: item,
            operation:i,
            data:this.state.initData.filter(s=>s.operationType==i).filter(s=>parseInt(s.operator)==this.state.operator)
          })
        }
      }
    }
  }

  onChangeTerm = (index,item) => {
    for(let i in this.state.userDic){
      if(this.state.userDic[i]==item){
        if(this.state.selectTerm=='请选择操作人'){
          this.setState({
            operator:i,
            data: this.state.initData.filter(s=>s.operator==i),
            selectTerm: item
          })
        }else{
          this.setState({
            operator:i,
            data: this.state.initData.filter(s=>s.operator==i).filter(s=>parseInt(s.operationType)==this.state.operation),
            selectTerm: item
          })
        }
      }
    }
    
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <View style={styles.title_select}>
          <Select
              options={this.state.floor} 
              onSelect={this.onChangeSystem}
              defaultValue={this.state.selectSystem}/>
          <Select
              options={this.state.build} 
              onSelect={this.onChangeTerm}
              defaultValue={this.state.selectTerm}/>
        </View>
        <View>
          <FlatList
            data={this.state.data}
            renderItem={this.renderMovie}
            style={styles.list}
            keyExtractor={item => item.id}
            ListEmptyComponent={this._createEmptyView}
            ListFooterComponent={this._renderFooter}
            onEndReachedThreshold={0.1}
            //为刷新设置颜色
            // refreshControl={<RefreshControl
            //   refreshing={this.state.refreshing}
            //   onRefresh={this.handleRefresh}//因为涉及到this.state
            //   colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}
            //   progressBackgroundColor="#ffffff"
            // />}
          />
        </View>
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
      // this.setState({
      //   data: this.state.data.concat(dataList),
      // });
    }
  }

  renderLoadingView = () => {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  renderMovie = ({ item }) => {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
        <View style={styles.container}>
            <View style={styles.rightContainer}>
            <View style={styles.containerLine}>
                <Text style={styles.title}>操作时间：</Text>
                <Text style={styles.content}>{item.operationTime}</Text>
            </View>
            <View style={styles.containerLine}>
                <Text style={styles.title}>操作人：</Text>
                <Text style={styles.content}>{this.state.userDic[item.operator]}</Text>
            </View>
            <View style={styles.containerLine}>
                <Text style={styles.title}>操作：</Text>
                <Text style={styles[item.statusColor]}>{this.state.operationType[item.operationType]}</Text>
            </View>
            <View style={styles.containerLine}>
                <Text style={styles.title}>操作反馈：</Text>
                <Text style={styles.content}>{item.operationFeedback}</Text>
            </View>
            </View>
        </View> 
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
    paddingTop: 15,
    paddingBottom: 15,
    height: 119,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  containerLine: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
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
  contentAlarm: {
    fontSize: 14,
    color: "#FD3E3C",
    fontFamily: "PingFang-SC-Medium",
    fontWeight: "500",
  },
  contentMalfunction: {
    fontSize: 14,
    color: "#FEB52E",
    fontFamily: "PingFang-SC-Medium",
    fontWeight: "500",
  },
  contentOffline: {
    fontSize: 14,
    color: "#9E9E9E",
    fontFamily: "PingFang-SC-Medium",
    fontWeight: "500",
  },
  contentNormal: {
    fontSize: 14,
    color: "#2BD957",
    fontFamily: "PingFang-SC-Medium",
    fontWeight: "500",
  },
  thumbnail: {
    width: 80,
    height: 86
  },
  list: {
    backgroundColor: "#F2F7FB",
    height: '100%',
  },
  headerMiddle: {
    color: "#fff",
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
  title_select:{
    flexDirection:'row',alignItems:'center',width:'100%',height:40,borderColor:'#ccc',borderRadius:4,borderWidth:1,padding:10,backgroundColor:"#F2F7FB"
  }
});
