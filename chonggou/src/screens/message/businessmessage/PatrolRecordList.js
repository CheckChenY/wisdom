import React, { Component } from "react";
import { Image, FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ListScreens from '../../components/patrollist';
import FetchManager from '../../fetch/index';


let totalPage = 5; // 总的页数
let itemNo = 0; // item的个数
export default class PatrolRecordList extends Component {
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
          <Text style={styles.headerMiddle}>巡查记录</Text>
      ),
      headerRight:<Text style={{color:'#fff',fontSize: 16,marginRight:15}}></Text>,
      headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
    };
  }
 
  constructor(props) {
    super(props);
    this.page = 1
    this.state = {
      // 列表数据结构
      data:[],
      // 下拉刷新
      isRefresh:false,
      // 加载更多
      isLoadMore:true,
      page:1,
      list:{
          size:6,
          page:0,
      },
    };
  }


  componentDidMount() {
    const { list } = this.state;

    this._getHotList(list)
  }

  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <View>
        <FlatList
          style={{height: '100%', marginBottom: -80}}
          data={data.content}
          //item显示的布局
          renderItem={({item}) => this._createListItem(item)}
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
    );
  }


  /**
     * 创建布局
     */
    _createListItem(item){
      const { navigation } = this.props;
      return (
          <TouchableOpacity onPress={() => navigation.navigate('portRecordTabList',{
            patrolTaskId:item.id, // 数据端id
          })}>
              <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <View style={styles.containerLine}>
                    <Text style={styles.title}>巡查人:</Text>
                    <Text style={styles.content}>{item.orgId}</Text>
                    </View>
                    <View style={styles.containerLine}>
                    <Text style={styles.title}>任务名称:</Text>
                    <Text style={styles.content}>{item.patrolName}</Text>
                    </View>

                    <View style={styles.containerLine}>
                      <Text style={styles.title}>开始时间:</Text>
                      <Text style={styles.content}>{item.startTime}</Text>
                    </View>
                    <View style={styles.containerLine}>
                      <Text style={styles.title}>结束时间:</Text>
                      <Text style={styles.content}>{item.endTime}</Text>
                    </View>
                    <View style={styles.containerLine}>
                      <Text style={styles.title}>巡查进度:</Text>
                      <Text style={styles.content}>
                        {item.completed}/{item.leakCheck }  (已巡查)/(漏巡查)
                      </Text>
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


    _getHotList(list) {
      const { data } = this.state;
      //巡查记录列表  4
      FetchManager.post('/safe/inner/safeTask/patrolTaskRecordLIst',list, async (set) => {
          // debugger;
          console.log(set)
          //下面的就是请求来的数据
          if(set&&set.success){
            let datas = set.value;
              if(this.page === 1){
                  this.setState({
                      data: datas
                  })
              }else{
                // console.log(this.page)
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
      console.log(list);
      // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
      if (!this.state.isLoadMore && this.state.data.length > 0){
          list['page'] = this.page + 1;
          this.page = this.page + 1;
          this._getHotList(list)
      }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F7FB",
    marginTop:5,
    padding:5
  },
  rightContainer: {
    flex: 1,
    paddingLeft:8,
  },
  containerLine: {
    flexDirection: "row",
    paddingTop:3
  },
  title: {
    fontSize: 14,
    color: "#333",
  },
  content: {
    fontSize: 14,
  },
  list: {
    backgroundColor: "#fff",
    height: '100%',
  },
  headerMiddle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
});
