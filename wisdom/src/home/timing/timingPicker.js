import React , { Component } from 'react';
import {Text,View,SafeAreaView,TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { CheckBox,ListItem } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';

class MainDetail extends Component{
    constructor(){
        super()
        this.state = {
            time:'00:00',
            date:"00:00",
            checked:false,//fasle => 开闸 true => 合闸
            list:[{left:'周一',status:0,value:1},{left:'周二',status:0,value:2},{left:'周三',status:0,value:3},{left:'周四',status:0,value:4},{left:'周五',status:0,value:5},{left:'周六',status:0,value:6},{left:'周七',status:0,value:7}],
            checkedweek:false,
            deviceId:'',
            popUp: '',
            index:0,
            // status:0,
            // item:{}
        }
    }
    componentDidMount(){
        const { index,deviceId,gatewayIdIndex,status,item } = this.props.navigation.state.params;
        console.log(deviceId)
        this.setState({
            // deviceId:switchId,
            index:index,
            deviceId: deviceId,
            gatewayIdIndex:gatewayIdIndex,
            status:status
        })
        if(status === 0){
            let list=this.state.list
            list.forEach(s=>{
                if(item.repeatValue.split('.').indexOf(s.value+'')!=-1){
                    s.status=1
                }else{
                    s.status=0
                }
            })

            this.setState({
                checked:item.isSwitch==2?true:false,
                date:item.taskTime,
                list:list,
                item:item
            })
        }
    }

    add=()=>{
        const { index,gatewayIdIndex } = this.state;
        let temparr=[]
        this.state.list.forEach(s=>{
            if(s.status){
                temparr.push(s.value)
            }
        })
        let repeatValue=''
        if(temparr.length){
            repeatValue=temparr.join('.')
        }else{
            repeatValue='8'
        }
        let params={
            isSwitch:this.state.checked?'2':'1',
            deviceId:this.state.deviceId,
            id:'',
            repeatValue:repeatValue,
            taskTime:this.state.date.replace(/:/g,'')
        }
        console.log(params)
        FetchManager.post('/app/acbtask/save',params , async (set) => {
            console.log(set)
            this.props.navigation.navigate('timingOperation',{
                index:index,
                gatewayIdIndex:gatewayIdIndex
            })
        })
    }

    edit=()=>{
        const { index,gatewayIdIndex,item } = this.state;
        console.log(item)
        let temparr=[]
        this.state.list.forEach(s=>{
            if(s.status){
                temparr.push(s.value)
            }
        })
        let repeatValue=''
        if(temparr.length){
            repeatValue=temparr.join('.')
        }else{
            repeatValue='8'
        }
        let params={
            close:item.close,
            isSwitch:this.state.checked?'2':'1',
            deviceId:item.deviceId,
            id:item.id,
            repeatValue:repeatValue,
            taskTime:this.state.date.replace(/:/g,'')
        }
        console.log(params)
        FetchManager.post('/app/acbtask/update',params , async (set) => {
            console.log(set)
            if(set.status==0){
                // this.props.navigation.state.params.refresh()
                this.props.navigation.navigate('timingOperation',{
                    index:index,
                    gatewayIdIndex:gatewayIdIndex
                })
            }else{
                this.popUp.showPop(set.msg)
            }
        })
    }

    onSubmit = () => {
        const { status } = this.state;
        // console.log('......')
        // this.props.navigation.navigate('timerSuess')
        // console.log(this.state.date)
        // console.log(this.state.checked)
        // console.log(this.state.deviceId)
        // console.log(this.state.list)
        //添加
        if(status === 1){
            this.add()
        }
        if(status === 0){
            this.edit()
        }
    }

    onChangeWeek = (l,i) => {
        const { list } = this.state;
        list[i].status = l.status === 0 ? 1 : 0;
        // list[i].status = l
        console.log(list)
        this.setState({
            list:list
        })
    }
    render(){
        const { list,index,gatewayIdIndex } = this.state;
        return(
            <View>
                <SafeAreaView style={{backgroundColor:'#467cd4'}}>
                    <View style={{flexDirection:'row',backgroundColor:'#467cd4',paddingBottom:15,paddingTop:15}}>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('timingOperation',{
                                index:index,
                                gatewayIdIndex:gatewayIdIndex
                            })} style={{paddingRight:15,}}>
                                <FontAwesome style={{color:'#FFFFFF',paddingLeft:20,paddingTop:7}} name="chevron-left" size={18} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#467cd4',fontSize:16,color:'#ffffff',textAlign:'center'}}>定时任务</Text>
                        </View>
                        <View style={{flex:1,alignItems:'flex-end',paddingRight:15}}>
                            <TouchableOpacity onPress={this.onSubmit}>
                                <Text style={{color:'#FFFFFF'}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
                <View style={{flexDirection:'row',padding:5}}>
                    <View style={{width:100,justifyContent:'center'}}>
                        <Text style={{fontSize:14,textAlign:'right'}}>请选择时间：</Text>
                    </View>
                    <View style={{flex:1}}>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="time"
                        format="HH:mm"
                        confirmBtnText="确定"
                        cancelBtnText="取消"
                        showIcon={false}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />

                    </View>
                </View>
                <View><Text style={{color:'#666666',marginRight:15,marginLeft:15,fontSize:17,backgroundColor:'#F6F6F6',padding:5}}>操作</Text></View>
                <View style={{flexDirection:'row',paddingLeft:15}}>
                    <CheckBox
                        center
                        title='合闸'
                        checkedIcon='dot-circle-o'
                        containerStyle={{backgroundColor:'#FFFFFF',borderColor:'#FFFFFF'}}
                        uncheckedIcon='circle-o'
                        checked={this.state.checked ? false:true }
                        onPress={() => this.setState({checked: !this.state.checked})}
                    />
                    <CheckBox
                        center
                        title='分闸'
                        checkedIcon='dot-circle-o'
                        containerStyle={{backgroundColor:'#FFFFFF',borderColor:'#FFFFFF'}}
                        uncheckedIcon='circle-o'
                        checked={this.state.checked ? true:false }
                        onPress={() => this.setState({checked: !this.state.checked})}
                    />
                </View>
                <View><Text style={{color:'#666666',marginRight:15,marginLeft:15,fontSize:17,backgroundColor:'#F6F6F6',padding:5}}>重复</Text></View>
                <View>
                    {
                        list.map((l, i) => (
                            <ListItem
                                key={i}
                                // leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={l.left}
                                containerStyle={{padding:0,paddingLeft:30}}
                                contentContainerStyle={{padding:0}}
                                rightTitleStyle={{padding:0}}
                                titleStyle={{padding:0}}
                                rightTitle={
                                    <CheckBox
                                        center
                                        title=' '
                                        containerStyle={{backgroundColor:'#FFFFFF',borderColor:'#FFFFFF',padding:5}}
                                        checked={ l.status === 0 ? false : true }
                                        onPress={()=>this.onChangeWeek(l,i)}
                                    />
                                }
                                bottomDivider
                            />
                        ))
                    }
                </View>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
            </View>
        )
    }
}

export default MainDetail