import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PatrolNameList from '../../components/patrolNameList';
import FetchManager from '../../fetch/index';

export default class PatrolDotList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
                <FontAwesome color="#fff" name="angle-left" size={28}/>
                <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}}>返回</Text>
            </View>
        </TouchableOpacity>
      ),
      headerTitle: (
          <Text style={styles.headerMiddle}>巡查点列表</Text>
      ),
      headerRight: (
          <Text style={{paddingRight:15}} onPress={()=>{ navigation.navigate('AddPatrol')}}>
              <Text style={{ color: '#fff', fontSize: 16 }}>添加</Text>
          </Text>
      ),
      headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
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
          iconDic:{},
          list:{
            page:0,
            size:6
          }

      }
  }

  componentDidMount() { //初始化的时候要判断长度 控制上拉加载
    const { list } = this.state;
    this.props.navigation.addListener('didFocus', () => {
      this._getHotList(list)
    });
  }
    _createListHeader(){
      return (
          <View style={styles.headView}>
              <Text style={{color:'white'}}>
                  头部布局
              </Text>
          </View>
      )
  }

   /**
     * 创建脚部布局
     */
    _createListFooter(){
      return (
          <View style={styles.footerView}>
              <Text style={{color:'white'}}>
                  底部底部
              </Text>
          </View>
      )
    }

    /**
     * 创建布局
     */
    _createListItem(item){
      const { navigation } = this.props;
      // const { iconDic } = this.state;
      return (
        <TouchableOpacity onPress={() => navigation.navigate('PatrolDetail',{
          id:item.id,
          code:item.cardCode
        })}>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
              <View style={styles.containerLine}>
                <Text style={styles.title}>巡查点名称：</Text>
                <Text style={styles.content}>{item.patrolPointName}</Text>
              </View>
              <View style={styles.containerLine}>
                <Text style={styles.title}>巡查点类型：</Text>
                <Text style={styles.content}>{PatrolNameList[item.patrolPointType]}</Text>
              </View>
              <View style={styles.containerLine}>
                <Text style={styles.title}>巡查卡编码：</Text>
                <Text style={styles.content}>{item.cardCode}</Text>
              </View>
              <View style={styles.containerLine}>
                <Text style={styles.title}>所在位置：</Text>
                <Text style={styles.content}>{item.location}</Text>
              </View>
            </View>
            
            <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
              <FontAwesome color="#3AA1FE" name="angle-right" size={20} />
            </View>
            {/* <FontAwesome color="#666666" name="chevron-right" size={16} /> */}
          </View> 
        </TouchableOpacity>
      );
    }

  _onRefresh=()=>{
    const { list } = this.state;
    console.log(this.page)
    // 不处于 下拉刷新
    if(!this.state.isRefresh && !this.state.isLoadDone){
      list['page'] = list.page + 1;
      this.page = this.page + 1
      this._getHotList(list)
    }
  };

  _onLoadMore(){
    const { list } = this.state;
    if (!this.state.isLoadMore && this.state.data.length > 0 && !this.state.isLoadDone){
      list['page'] = list.page + 1;
      this.page = this.page + 1
      this._getHotList(list)
    }
  }

  _getHotList(list) {
    const { data } = this.state;
    console.log(list)
    //巡查点列表  1
    FetchManager.post('/safe/inner/safePoint/findPageList ',list, async (set) => {
      console.log(set)
      if(set&&set.success){
        let datas = set.value;
        // console.log(data)
        if(this.page === 1){
            // console.log("重新加载")
            this.setState({
                data: datas.content
            })
        }else{
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

  _createEmptyView(){
    return (
        <View style={{height:'100%', alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:16}}>
                暂无列表数据，下拉刷新
            </Text>
        </View>
    );
  }

  render() {
    return (
        <View>
          <FlatList
            data={this.state.data}
            // style={styles.list}
            //item显示的布局
            renderItem={({item}) => this._createListItem(item)}
            // 空布局
            ListEmptyComponent={this._createEmptyView}
            //添加头尾布局
            ListHeaderComponent={this._createListHeader}
            ListFooterComponent={this._createListFooter}
            //下拉刷新相关
            onRefresh={() => this._onRefresh()}
            refreshing={this.state.isRefresh}
            //加载更多
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.1}
          />
        </View>
    );
  }

  // toDetail = (val) => {
  //   this.props.navigation.navigate("PatrolDetail",{
  //     id:val
  //   })
  // }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F7FB",
    padding: 5,
    marginBottom:5
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  containerLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: "#333",
  },
  content: {
    fontSize: 14,
    color: "#666",
  },
  contentAlarm: {
    fontSize: 14,
    color: "#FD3E3C",
  },
  contentMalfunction: {
    fontSize: 14,
    color: "#FEB52E",
  },
  contentOffline: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  contentNormal: {
    fontSize: 14,
    color: "#2BD957",
  },
  thumbnail: {
    width: 80,
    height: 86
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
});
