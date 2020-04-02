import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, AsyncStorage, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../components/getSystex';
import Select from '../components/select/selectobj';
import StatusName from '../components/statusName';

// let totalPage = 5; // 总的页数
// let itemNo = 0; // item的个数
export default class CaseDealRecordList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerLeft: (
        <View style={{flexDirection: 'row',paddingLeft:15, alignItems: 'center'}}>
          <FontAwesome color="#fff" name="angle-left" size={28} onPress={()=>navigation.goBack()}/>
          <Text style={{color:'#fff', fontSize: 16, paddingLeft:5}} onPress={()=>navigation.goBack()}>返回</Text>
        </View>
      ),
      headerTitle: (
          <Text style={styles.headerMiddle}>警情处理记录</Text>
      ),
      headerRight:<Text></Text>,
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

      system:['系统类别(全部)'],
      defaultSystem:"系统类别(全部)",
      systemId:'',
      list:{
          size:6,
          page:0,
          dealState: 1,
      },

    };
  }

  componentDidMount() {

    const { list } = this.state;
    // const { systemId } = this.props.navigation.state.params;

    getSystem().then(res => {
      this.setState({
          system:res,
      })
    });

    this._getHotList(list)

  }

  onChangeTerm = (item) => {
    const { list,data=[] } = this.state;
    list['alarmType'] = item.value;
    list['page'] = 0;
    this.page = 1;
    if(item.value === 0){
        delete list.alarmType
    }
    this.setState({
      warnConfirmType:item.value
    },this._getHotList(list))
  }


  onChangeSystem=(item)=>{
    const { list } = this.state;
    list['deviceSystem'] = item.id;
    list['page'] = 0;
    this.page = 1;
    if(item.value === 0){
        delete list.deviceSystem
    }
    this.setState({
        systemId:item.id
    },this._getHotList(list))
  }

  render() {
    const { system,defaultTerm,defaultSystem,dataTerm,data } = this.state;
    return (
      <View>
        <View style={styles.title_select}>
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
        </View>
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
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('caseRecordTab',{
        id:item.id,
        // disabled:false,
        companyId:item.companyId,
        deviceId:item.deviceId,
        // floorId:nub.floorId,
        // bolRelation:this.state.bolRelation
      })}>
        <View style={styles.container}>
          {/* <Image
              source={item.image}
              style={styles.thumbnail}
          /> */}
          <View style={styles.rightContainer}>
             <View style={styles.containerLine}>
               <Text style={styles.title}>上报时间：</Text>
               <Text style={styles.content}>{item.createTime}</Text>
             </View>
             <View style={styles.containerLine}>
               <Text style={styles.title}>设备名称：</Text>
               <Text style={styles.content}>{item.deviceName}</Text>
             </View>
             <View style={styles.containerLine}>
               <Text style={styles.title}>设备状态：</Text>
               <Text style={styles.content}>{StatusName[item.alarmType]}</Text>
             </View>
             <View style={styles.containerLine}>
               <Text style={styles.title}>设备位置：</Text>
               <Text style={styles.content}>{item.location}</Text>
             </View>
           </View>
           
          <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
              <FontAwesome color="#3AA1FE" name="angle-right" size={20} />
          </View>
           {/* <FontAwesome color="#3AA1FE" style={{width:40,justifyContent:'center',alignItems:'center'}} name="chevron-right" size={18} /> */}
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



  _getHotList(list) {
    const { data } = this.state;
    console.log(list)//1/devicealertdeal/page
    FetchManager.get('/alarm/inner/jtlAlarmRecord/getAlarmByOrg',list, async (set) => {
        // debugger;
        console.log(set)
        //下面的就是请求来的数据
        
        // debugger
        if(set&&set.success){
            let datas = set.value;
            if(this.page === 1){
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
        }else{
          this.setState({
            data: [],
            isLoadDone : true,
          })
        }
    })
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
  
  _onLoadMore(){
    const { list } = this.state;
    // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
    if (!this.state.isLoadMore && this.state.data.length > 0 && !this.state.isLoadDone){
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
    marginTop:5,
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
