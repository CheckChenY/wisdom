import React, {Component} from 'react'
import { View,Text,Image,StyleSheet,TouchableOpacity,ScrollView,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../fetch/index';
import PatrolNameList from '../components/patrolNameList';
import { getAllFloor,getSigleFloor } from '../components/getSystex';
import ModelPop from '../components/modelPop';

class Content extends Component{
    render(){
        return(
            <View style={{ flexDirection: 'row',marginTop:8,paddingLeft:15 }}>
                <View style={{width:110}}>
                    <Text style={{ textAlign: 'right',fontSize:14,color:'#333' }}>{this.props.left}</Text>
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
        return {
            headerTitle: (
                <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>巡查点详情</Text>
            ),
            headerRight:(<TouchableOpacity onPress={()=>navigation.navigate('actionPatrolFrom')}>
                            <Text style={{color:'#fff',fontSize: 16,marginRight:15}}> {''}  </Text>
                        </TouchableOpacity>),
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
            popUp: '',
        }
    }
    render(){
        const { obj } = this.state;
        const { status,patrolStatus } = this.props.navigation.state.params ? this.props.navigation.state.params : '';
        return(
            <View style={{padding:15}}>
                <ScrollView>
                    {
                        status === '1' ? (
                            <View>
                                <Content left="巡查时间：" right={obj.createTime}></Content>
                                <Content left="巡查人员：" right={obj.orgId}></Content>
                                <Content left="巡查状态：" right={obj.patrolStatus === '1' ? '已巡查' : '待巡查'}></Content>
                            </View>
                        ) : <Image style={{width:'100%',height:200}} source={require('../../img/xck.png')}></Image>
                    }
                    <Content left="巡查点名称：" right={obj.patrolPointName}></Content>
                    <Content left="巡查点类型：" right={PatrolNameList[obj.patrolPointType]}></Content>
                    <Content left="巡查卡编码：" right={obj.cardCode}></Content>
                    <Content left="所在建筑：" right={obj.building}></Content>
                    <Content left="所在楼层/区域：" right={obj.floor}></Content>
                    <Content left="所在位置：" right={obj.location}></Content>

                    {
                        status === '1' ? (
                            <View>
                                <Content left="是否合格：" right={obj.patrolResult === '1' ? '合格' : '不合格'}></Content>
                                <Content left="备注：" right={obj.remark}></Content>
                                <View style={{flexDirection:'row',marginTop:10}}>
                                    <View style={{width:110}}>
                                        <Text style={{textAlign:'right',fontSize:16}}>
                                            拍照:
                                        </Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Image style={{width:150,height:100}} source={{uri:obj.patrolPhoto}}></Image>
                                    </View>
                                </View>
                            </View>
                        ) : <Text />
                    }

                    {
                       patrolStatus === 2 ? (
                            <TouchableOpacity
                                onPress={this.getPatrol}
                            style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                                <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:45,backgroundColor:'#3AA1FE',borderRadius:4}}>
                                    <Text style={{color:'#FFFFFF',fontSize:18}}>开始巡查</Text>
                                </View>
                            </TouchableOpacity>
                       ): <Text />
                    }


                </ScrollView>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
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
        }///inner/safePoint/findById
        FetchManager.get('/safe/inner/safePatrolRecord/findById',obj, async (set) => {
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                this.setState({
                    obj:data
                })
            }else{
                this.popUp.showPop('数据错误，此巡查点ID不存在')
            }
        })  
    }
}