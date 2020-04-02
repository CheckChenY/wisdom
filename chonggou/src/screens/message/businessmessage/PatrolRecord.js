import React, {Component} from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../fetch/index';
import ModelPop from '../../components/modelPop';
import PatrolNameList from '../../components/patrolNameList';


class Content extends Component{
    render(){
        let required=null
        if(this.props.required){
            required=<Text style={{color:"red"}}>* </Text>
        }
        return(
            <View style={{ flexDirection: 'row',marginTop:5 }}>
                <View style={{ flexDirection:'row',justifyContent:'flex-end' }}>
                    {required}
                    <Text style={{ textAlign: 'right',fontSize:16,color:'#333'}}>{this.props.left}</Text>
                </View>
                <View style={{justifyContent:'center',width:'80%'}}>
                    <Text style={{color:'#666',fontSize:14}}>{this.props.right}</Text>
                </View>
            </View>
        )
    }
}

export default class PatrolRecord extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>巡查详情</Text>
            ),
            headerRight: (
                <Text></Text>
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
            bindingState:{
                '1':'未绑定',
                '2':'已绑定'
            },
            patrolResult:{
                '1':'合格',
                '2':'不合格'
            },
            patrolState:{
                '1':'已巡查',
                '2':'待巡查'
            },
            BuildDic:{},
            FloorDic:{}
        }
    }
    render(){
        const { patrolStatus } = this.props.navigation.state.params ? this.props.navigation.state.params : '';
        const { obj,patrolState,bindingState,patrolResult } = this.state;
        let patrolPhoto = null;
        if (obj.patrolPhoto) {
            patrolPhoto = <Image style={{width:88,height:88,marginLeft:15}} source={{uri:'http://192.168.0.186:60080/' + obj.patrolPhoto}}/>
        }
        return(
            <View style={{paddingLeft:15,paddingRight:15}}>
                <Content left="巡查时间：" right={obj.patrolTime} required={false}></Content>
                <Content left="巡查状态：" right={obj.patrolStatus === '1' ? '已巡查' : 
                obj.patrolStatus === '2' ? '待巡查' : obj.patrolStatus === '3' ? '漏巡查' : ''} required={false}></Content>
                <Content left="巡查点名称：" right={obj.patrolPointName} required={false}></Content>
                <Content left="巡查点类型：" right={PatrolNameList[obj.patrolPointType]} required={false}></Content>
                <Content left="巡查卡编码：" right={obj.cardCode} required={false}></Content>
                <Content left="状态绑定：" right={obj.bindingState === '1' ? '绑定' : obj.bindingState === '2' ? '未绑定' : ''} required={false}></Content>
                <Content left="所在建筑：" right={obj.building} required={false}></Content>
                <Content left="所在楼层/区域：" right={obj.floor} required={false}></Content>
                <Content left="所在位置：" right={obj.location} required={false}></Content>
                <Content left="是否合格：" right={obj.patrolResult === '1' ? '合格' : obj.patrolResult === '2' ? '不合格' : '' } required={false}></Content>
                <View style={{flexDirection:'row',marginTop:5}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ color: '#333', fontSize: 16 }}>拍照：</Text>
                        {patrolPhoto}
                    </View>
                </View>
                <Content left="备注：" right={obj.patrolRemark} required={false}></Content>

                {
                    patrolStatus === 3 || patrolStatus === 2 ? (
                        <TouchableOpacity
                            onPress={this.getPatrol}
                        style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                            <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:45,backgroundColor:'#3AA1FE',borderRadius:4}}>
                                <Text style={{color:'#FFFFFF',fontSize:18}}>去巡查</Text>
                            </View>
                        </TouchableOpacity>
                    ): <Text />
                }

                <ModelPop ref={ref => this.popUp = ref}></ModelPop>
            </View>
        )
    }

    getPatrol = () => {
        this.props.navigation.navigate('actionPatrolFrom')
    }
    
    componentDidMount(){
        const { id } = this.props.navigation.state.params;
        let obj = {
            id:id
        }
        FetchManager.get('/safe/inner/safePatrolRecord/findById',obj, async (set) => {
            console.log(set)
            if(set.success){
                this.setState({
                    obj:set.value
                })
            }else{
                this.popUp.showPop(set.errorMsg)
            }
        })  
    }
}