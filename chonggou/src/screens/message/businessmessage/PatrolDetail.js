import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../fetch/index';
import PatrolNameList from '../../components/patrolNameList';
import { getAllFloor,getSigleFloor } from '../../components/getSystex';
import ModelPop from '../../components/modelPop';

class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',marginTop:8,paddingLeft:15 }}>
                <View style={{width:120 }}>
                    <Text style={{ textAlign:'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{ fontSize:14,color:'#666' }}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}
export default class PatrolDetail extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { code } = navigation.state.params;
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>巡查点详情</Text>
            ),
            headerRight: (
                <TouchableOpacity onPress={()=>{ navigation.navigate('editPatrol',{
                    code:code
                })}}>
                    <Text style={{paddingRight:15}}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>编辑</Text>
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome color="#fff" name="angle-left" size={28}/>
                        <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3AA1FE',
                height: 50
            }
        };
    };
    constructor(props){
        super(props)
        this.state={
            obj:{},
            BuildDic:{},
            FloorDic:{},
            popUp: '',
        }
    }
    render(){
        const { obj,BuildDic,FloorDic } = this.state;
        // debugger;
        // let item = BuildDic.length > 0 ? BuildDic.filter( f=>f.value === obj.buildingId) : '';
        // debugger;
        // if(BuildDic.length > 0){
            console.log(obj)
        // }
        return(
            <View style={{padding:15}}>
                <ScrollView>
                    <View style={{marginBottom:10}}>
                        <Image source={require('../../../img/xck.png')} style={{width:'100%',height:185,borderRadius:10}}></Image>
                    </View>
                    <Content left="巡查卡编码：" right={obj.cardCode}></Content>
                    <Content left="巡查点名称：" right={obj.patrolPointName}></Content>
                    <Content left="巡查点类型：" right={PatrolNameList[obj.patrolPointType]}></Content>
                    <Content left="所在建筑：" right={obj.build}></Content>
                    <Content left="所在楼层/区域：" right={obj.floor}></Content>
                    <Content left="所在位置：" right={obj.location}></Content>
                </ScrollView>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        )
    }
    
    componentDidMount(){
        const { code } = this.props.navigation.state.params;
        this.props.navigation.addListener('didFocus', () => {
            this.getData(code);
        });
    }
    
    getData = (code) => {
        FetchManager.post('/safe/inner/safePoint/findPatrolCard?cardCode=' + code,'', async (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                this.setState({
                    obj:data ? data : {}
                })
            }else{
                this.popUp.showPop(set.errorMsg)
                this.setState({
                    obj:{}
                })
                // Alert.alert('数据错误，此巡查点ID不存在')
            }
        })  
    }
}
const styles=StyleSheet.create({
    
})