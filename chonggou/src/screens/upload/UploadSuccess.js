import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { getAllFloor,getSigleFloor } from '../components/getSystex';
export default class UpLoadSuccess extends Component{
    static navigationOptions = ({ navigation, navigationOptions }) => {
        
        return {
            header:null
        };
    };
    constructor(props){
        super(props)
        this.state={
            second:3,
            timer:'',
            floor: '',
            build:'',
            desc:'',
            scenePhoto:''
        }
    }
    render(){
        return(
            <ScrollView style={{paddingLeft:44,paddingRight:44}}>
                <View style={[styles.flexcenter,{paddingTop:40}]}>
                    <Image style={{width:75,height:75}} source={require('../../img/cg.png')} />
                </View>
                <View style={styles.flexcenter}>
                    <Text style={{fontSize:18,marginTop:10,color:'#333'}}>上传成功</Text>
                </View>
                <View style={styles.flexcenter}>
                    <Text style={{marginTop:8,color:'#3AA1FE',fontSize:14}}><Text>{this.state.second}</Text>S后自动关闭，</Text>
                </View>
                <View style={styles.flexcenter}>
                    <Text style={{marginTop:8,color:'#3AA1FE',fontSize:14}}>可在【上传记录】中跟踪处理进度</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:25}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text> </Text><Text style={{fontSize:16,color:'#333'}}> 现场图片：</Text>
                    </View>
                    <View>
                    <View style={{width:100,height:100}}>
                        <Image style={styles.img} source={{uri:this.state.scenePhoto}} />
                    </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text> </Text><Text style={{fontSize:16,color:'#333'}}> 隐患描述：</Text>
                    </View>
                    <View style={{width:'65%'}}>
                        <Text style={{lineHeight:20}}>{this.state.desc}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text> </Text><Text style={{fontSize:16,color:'#333'}}>所在位置：</Text>
                    </View>
                    <View style={{width:'65%'}}>
                        {/* <Text>{this.props.navigation.state.params.buildingId}{this.props.navigation.state.params.floorId}</Text> */}
                        <Text>{this.state.build +' '+this.state.floor}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:10,marginBottom:60}}>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text> </Text><Text style={{fontSize:16,color:'#333'}}>具体位置：</Text>
                    </View>
                    <View style={{width:'65%'}}>
                        <Text>{this.state.position}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.flexcenter} onPress={()=>{this.goBack()}}>
                    <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:45,backgroundColor:'#3AA1FE',borderRadius:4}}>
                        <Text style={{color:'#fff',fontSize:18}}>返回</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
    goBack=()=>{
        clearInterval(this.state.timer)
        this.props.navigation.push("Home")
    }
    componentDidMount(){
        const { scenePhoto,desc,build,floor,position } = this.props.navigation.state.params;
        // this.setState({
        //     scenePhoto:'http://192.168.0.186:60080/' + imgBase,
        //     desc:desc,
        //     buildingId:build,
        //     floorId:floor,
        //     position:position,
        // })
        console.log(desc)
        this.setState({
            scenePhoto:'http://192.168.0.186:60080/' + scenePhoto,
            desc:desc,
            build:build,
            floor:floor,
            position:position,
        },this.timerFun)

    }

    timerFun = () => {
        this.setState({
            timer : setInterval(()=>{
                this.setState({
                    second:parseInt(this.state.second)-1
                })
    
                if(parseInt(this.state.second)==0){
                    clearInterval(this.state.timer)
                    this.props.navigation.push("Home")
                }
            },1000)
        })
    }
}
const styles=StyleSheet.create({
    flexcenter:{
        flexDirection:'row',
        justifyContent:'center'
    },
    img:{
        width:100,
        height:100
    }
})