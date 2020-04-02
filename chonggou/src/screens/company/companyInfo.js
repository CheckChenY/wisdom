import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, AsyncStorage, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import Select from '../components/select/selectobj';
import StatusName from '../components/statusName';

export default class CaseDealList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                <FontAwesome color="#fff" name="angle-left" size={28}/>
                <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
            </View>
        </TouchableOpacity>
      ),
      headerTitle: (
          <Text style={styles.headerMiddle}>警情处理</Text>
      ),
      headerRight:<Text style={{color:'#fff',fontSize: 16,marginRight:15}} onPress={()=>navigation.navigate('CaseDealRecordList')}>处理记录</Text>,
      headerStyle: {backgroundColor: 'linear-gradient(-30deg,rgba(58,161,254,1) 0%,rgba(48,191,251,1) 100%)'}
    };
  }
 
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      data:[],
      isRefresh:false,
      isLoadMore:true,
      isLoadDone:false,
      dataTerm:[{label:'全部',value:0},{label:'报警',value:1},{label:'故障',value:2},{label:'报警&故障',value:3},
      {label:'离线',value:4}],
      defaultTerm:'状态(全部)',
      bolRelation:false,

      system:['系统类别(全部)'],
      defaultSystem:"系统类别(全部)",
      systemId:'',

      page:1,
      list:{
          size:6,
          page:0,
          dealState: 0,
      },
      // page=0&size=4&companyId=1575882844349224&dealState=0
    };
    // this.onChangeTerm=this.onChangeTerm.bind(this)
    // this.onChangeSystem=this.onChangeSystem.bind(this)
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    // this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { list,system } = this.state;
    const { companyId } = this.props.navigation.state.params;
    list.companyId = companyId;
      
    this._getHotList(list);

  }
  


  onChangeIndex = (val) => {
    // const { onPressToChang } = this;
    console.log(val)
    // const { list,system } = this.state;
      
    //   this._getHotList(list);

  }


  // onChangeTerm = (item) => {
  //   const { list } = this.state;
  //   list['alarmType'] = item.value;
  //   list['page'] = 0;
  //   this.page = 1;
  //   if(item.value === 0){
  //       delete list.alarmType
  //   }
  //   this.setState({
  //       warnState:item.value
  //   },this._getHotList(list))
  // }


  // onChangeSystem=(item)=>{
  //   const { list } = this.state;
  //   list['deviceSystem'] = item.id;
  //   list['page'] = 0;
  //   this.page = 1;
  //   if(item.value === 0){
  //       delete list.deviceSystem
  //   }
  //   this.setState({
  //       systemId:item.id
  //   },this._getHotList(list))
  // }
  render() {
    const { system,defaultTerm,defaultSystem,dataTerm,data } = this.state;
    return (
      <View style={{backgroundColor:'#FFFFFF',height:'100%'}}>
        {/* <View style={styles.title_select}>
          <View style={{flex:1}}>
            <Select
              options={dataTerm} 
              onSelect={this.onChangeTerm}
              defaultValue={defaultTerm}
              downMarginTop={11}
              dropdownWidth={130}
            />
          </View>
          
          <View style={{flex:1}}>
            <Select
              options={system} 
              onSelect={this.onChangeSystem}
              defaultValue={defaultSystem}
              downMarginTop={11}
              dropdownWidth={130}/>
          </View>
        </View> */}
        <View>
          <FlatList
            data={ data }
            renderItem={({item}) => this._createListItem(item)}
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
      </View>
    );
  }


  _createListItem(item){
    const { navigation } = this.props;
    return (//companyDetailTab
      <TouchableOpacity onPress={()=>navigation.navigate('companyRecordTab',{
        disabled:true,
        deviceId:item.deviceId,
        id:item.id,
        status:item.linkState,//判断联动动作是否是自动  0 自动 1 手动
        // url:'companyTab',
        // id:item.id,
        // // disabled:false,
        companyId:item.companyId,
        // deviceId:item.deviceId,
      })}>
        <View style={styles.container}>
          <View style={styles.rightContainer}>
            <View style={styles.containerLine}>
              <Text style={styles.title}>报警时间：</Text>
              <Text style={styles.content}>{item.createTime}</Text>
            </View>
            <View style={styles.containerLine}>
              <Text style={styles.title}>设备名称：</Text>
              <Text style={styles.content}>{item.deviceName}</Text>
            </View>
            <View style={styles.containerLine}>
              <Text style={styles.title}>所属系统：</Text>
              <Text style={styles.content}>{item.system}</Text>
            </View>
            <View style={styles.containerLine}>
              <Text style={styles.title}>报警类型：</Text>
              {/* <Text style={styles.content}>{StatusName[item.alarmType]}</Text> */}

              <Text style={[styles.content,{
                  color:item.alarmType === '0' ? '#149E5B' :
                  item.alarmType === '1' || item.alarmType === '3' || item.alarmType === '11' ? '#DC4D41' :
                  item.alarmType === '2' ? '#FFCD41' :
                    '#666'
              }]}>{StatusName[item.alarmType]}</Text>
            </View>
            <View style={styles.containerLine}>
              <Text style={styles.title}>设备位置：</Text>
              <Text style={styles.content}>{item.location}</Text>
            </View>
          </View>
          
          <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
              <FontAwesome color="#3AA1FE" name="angle-right" size={20} />
          </View>
        </View> 
      </TouchableOpacity>
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

  _onRefresh=()=>{
    const { list } = this.state;
    // 不处于 下拉刷新
    if(!this.state.isRefresh && !this.state.isLoadDone){
        list['page'] = list.page + 1;
        this.page = this.page + 1;
        console.log(list)
        this._getHotList(list)
    }
  };

  _getHotList(list) {
    const { data } = this.state;
    console.log(list)
    ///warn/inner/jtlAlarmRecord/getAlarmByOrg
    // /warn/inner/jtlAlarmRecord/getAlarmByOrg?page=0&size=4&companyId=1575882844349224&dealState=0
    FetchManager.get('/alarm/inner/jtlAlarmRecord/getAlarmByOrg',list, async (set) => {
        console.log(set)
        if(set&&set.success){
          let datas = set.value;
          if(this.page === 1){
              this.setState({
                  data: set.value.content
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

  /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
      const { list } = this.state;
      // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
      if (!this.state.isLoadMore  && this.state.data.length > 0 && !this.state.isLoadDone){
          list['page'] = list.page + 1;
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
    padding: 5,
    marginBottom:5,
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
    marginBottom: -80
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
