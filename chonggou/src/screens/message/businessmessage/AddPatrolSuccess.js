import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import { getSystem,getDevice,getAllFloor,getSigleFloor } from '../../components/getSystex';
import patrolNameList from '../../components/patrolNameList';

class Content extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{width:120}}>
                    <Text style={{fontSize:14,color:'#333',textAlign:'right'}}>{this.props.left}：</Text>
                </View>
                <View style={{flex:1}}>
                    <Text>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

export default class AddPatrolSuccess extends Component{
    constructor(props){
        super(props)
        this.state={
            second:3,
            timer:'',
            buildingDic:[],
            floorDic:[],
            list:{}
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        console.log(navigationOptions)
        return {
            header:null
        };
    };
    render(){
        const { list }=this.props.navigation.state.params
        console.log(list)
        // debugger;
        return(
            <ScrollView>
                <View style={{padding:10}}>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Image style={{width:75,height:75,marginTop:80}} source={require('../../../img/cg.png')}></Image>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{fontSize:18,marginTop:10,color:'#333'}}>添加成功</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{marginTop:8,color:'#3AA1FE',fontSize:14}}>{this.state.second}S后自动关闭</Text>
                    </View>
                    <Content left="巡查点名称" right={list.patrolPointName}></Content>
                    <Content left="巡查点类型" right={patrolNameList[list.patrolPointType]}></Content>
                    <Content left="巡查点编码" right={list.cardCode}></Content>
                    <Content left="所在建筑" right={list.build}></Content>
                    <Content left="楼层区域" right={list.floor}></Content>
                    <Content left="所在位置" right={list.location}></Content>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:77}} onPress={()=>{this.goonAdd()}}>
                        <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:45,backgroundColor:'#3AA1FE',borderRadius:4}}>
                            <Text style={{color:'#fff',fontSize:18}}>继续添加</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginTop:20}} onPress={()=>{this.reback()}}>
                        <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:45,backgroundColor:'#D9E4ED',borderRadius:4}}>
                            <Text style={{color:'#788A93',fontSize:18}}>返回</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
    reback=()=>{
        clearInterval(this.state.timer)
        this.props.navigation.navigate('PatrolDotList')
    }
    goonAdd=()=>{
        clearInterval(this.state.timer)
        this.props.navigation.push('AddPatrol')
    }
    componentDidMount(){
        getAllFloor().then(res=>{
            var buildingDic={}
            if(res.length){
                res.forEach(s=>{
                buildingDic[s.value]=s.label
                })
            }
            this.setState({
                buildingDic:buildingDic
            })
        })

        getSigleFloor().then(res=>{
            var floorDic={}
            if(res.length){
                res.forEach(s=>{
                    floorDic[s.value]=s.label
                })
            }
            this.setState({
                floorDic:floorDic
            })
        })


        this.setState({
            timer:setInterval(()=>{
                    this.setState({
                        second:parseInt(this.state.second)-1
                    })
                    if(parseInt(this.state.second)==0){
                        clearInterval(this.state.timer)
                        this.props.navigation.push('PatrolDotList')
                    }
                },1000)
        })
    }
}
const styles=StyleSheet.create({
    img:{
        width:100,
        height:100
    }
})