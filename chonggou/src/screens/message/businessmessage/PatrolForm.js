// import React, {Component} from 'react'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Radio from '../../components/Radio';
// import CameraComponent from '../../components/cammer'
// import FetchManager from '../../fetch/index';


// import {
//     View,
//     Text,
//     Image,
//     FlatList,
//     TextInput,
//     StyleSheet,
//     TouchableOpacity,
//     KeyboardAvoidingView
// } from 'react-native'

// class Content extends Component{
//     render(){
//     let required=null
//     if(this.props.required){
//         required=<Text style={{color:"red"}}>* </Text>
//     }
//       return(
//         <View style={{ flexDirection: 'row',marginTop:10 }}>
//           <View style={{ width:'30%',flexDirection:'row',justifyContent:'flex-end' }}>
//             {required}<Text style={{ textAlign: 'right',fontSize:16,color:'#333'}}>{this.props.left}</Text>
//           </View>
//           <View style={{ width:'70%',justifyContent:'center',width:'80%'}}>
//             <Text style={{color:'#666',fontSize:14}}>{this.props.right}</Text>
//           </View>
//         </View>
//       )
//     }
// }

// export default class PatrolForm extends Component{
//     static navigationOptions = ({ navigation, navigationOptions }) => {
//         return {
//             headerTitle: (
//                 <Text style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 18 }}>巡查任务</Text>
//             ),
//             headerRight: (
//                 <TouchableOpacity onPress={()=>{this.submit()}}>
//                     <Text style={{paddingRight:15}}>
//                         <Text style={{ color: '#fff', fontSize: 16 }}>提交</Text>
//                     </Text>
//                 </TouchableOpacity>
//             ),
//             headerLeft: (
//                 <TouchableOpacity onPress={()=>navigation.goBack()}>
//                     <View style={{paddingLeft:15,flexDirection:'row',alignItems:'center'}}>
//                         <FontAwesome color="#fff" name="angle-left" size={28}/>
//                         <Text style={{color:'#fff',fontSize:16,paddingLeft:5,paddingTop:3}}>返回</Text>
//                     </View>
//                 </TouchableOpacity>
//             ),
//             headerStyle: {
//                 backgroundColor: '#3AA1FE',
//                 height: 50
//             }
//         };
//     };
//     constructor(props){
//         super(props)
//         this.state={
//             SelectList:[{label:'合格',check:true},{label:'不合格',check:false}],
//             istrue:true,
//             obj:{},
//             remark:'',
//             patrolPhoto:''
//         }
//     }
//     render(){
//         return(
//             <View style={{paddingRight:15,paddingTop:5}}>
//                 <Content left="巡查点名称：" right={this.state.obj.patrolPointName} required={false}></Content>
//                 <Content left="巡查点类型：" right={this.state.obj.patrolPointType} required={false}></Content>
//                 <Content left="巡查卡编码：" right={this.state.obj.cardCode} required={false}></Content>
//                 <Content left="状态绑定：" right={this.state.obj.bindingState} required={false}></Content>
//                 <Content left="所在建筑：" right={this.state.obj.buildingId} required={false}></Content>
//                 <Content left="楼层区域：" right={this.state.obj.floorId} required={false}></Content>
//                 <Content left="所在位置：" right={this.state.obj.location} required={false}></Content>
//                 <View style={{flexDirection:'row',marginTop:10}}>
//                     <View style={{width:'28%',flexDirection:'row',justifyContent:'flex-end'}}>
//                         <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{color:'#333',fontSize:16}}> 是否合格：</Text>
//                     </View>
//                     <View style={{width:'42%',height:20}}>
//                         <Radio SelectList={this.state.SelectList} select={this.select.bind(this)}></Radio>
//                     </View>
//                 </View>
//                 <View style={{flexDirection:'row',marginTop:10}}>
//                     <View style={{flexDirection:'row'}}>
//                         <View style={{width:'30%',flexDirection:'row',justifyContent:'flex-end'}}>
//                             <Text style={{color:'#FD3E3C'}}>* </Text><Text style={{ color: '#333', fontSize: 16 }}>拍照：</Text>
//                         </View>
//                         <View style={{width:'70%'}}>
//                             <CameraComponent getImgBase={this.getImgBase.bind(this)}/>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{flexDirection:'row',marginTop:10}}>
//                     <View style={{flexDirection:'row'}}>
//                         <View style={{width:'30%',flexDirection:'row',justifyContent:'flex-end'}}>
//                             <Text style={{ color: '#333', fontSize: 16 }}>备注：</Text>
//                         </View>
//                         <View style={{width:'70%'}}>
//                             <TextInput 
//                                 placeholder="请输入" 
//                                 multiline={true} 
//                                 style={{textAlignVertical:'top',height:60,padding:10,borderWidth:1,borderRadius:2,borderColor:'#788A93'}}
//                                 onChangeText={(remark) => this.setState({remark})}
//                                 value={this.state.remark}
//                             ></TextInput>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
//     getImgBase = (val) => {
//         console.log(val)
//         this.setState({
//             patrolPhoto:'data:image/jpg;base64,' + val
//         });
//     }
//     submit=()=>{
//         var patrolResult=1 
//         //巡查结果 1 合格  2 不合格
//         if(this.state.istrue){
//             patrolResult=1
//         }else{
//             patrolResult=2
//         }
//         var params={
//             patrolTaskId:this.state.obj.patrolTaskId,
//             patrolPointName:this.state.obj.patrolPointName,
//             patrolPointType:this.state.obj.patrolPointType,
//             cardCode:this.state.obj.cardCode,
//             bindingState:this.state.obj.bindingState,
//             buildingId:this.state.obj.buildingId,
//             floorId:this.state.obj.floorId,
//             location:this.state.obj.location,
//             patrolResult:patrolResult,
//             patrolStatus:1,
//             patrolRemark:this.state.obj.patrolRemark,
//             patrolPhoto:this.state.patrolPhoto,
//             remark:this.state.remark
//         }
//         FetchManager.post('1/safepointrecord',params, async (set) => {
//             if(!parseInt(set.code)){
//                 this.props.navigation.navigate('PatrolPostSuccess',{
//                     patrolTaskId:this.state.obj.patrolTaskId
//                 })
//             }
//         })
//     }
//     componentDidMount(){
//         FetchManager.get('1/safepointrecord/info/'+this.props.navigation.state.params.code,{}, async (set) => {
//             if(!parseInt(set.code)){
//                 this.setState({
//                     obj:set.data
//                 })
//             }
//         })
//     }
//     //单选
//     select=(e)=>{
//         console.log(e)
//         //判断是否通过
//         if(e.label=='合格'){
//             this.setState({
//                 istrue:true
//             })
//         }else{
//             this.setState({
//                 istrue:false
//             })
//         }
//         //单选处理
//         this.state.SelectList.map((item,index)=>{
//             item.check=false
//             if(item.label==e.label){
//                 item.check=true
//             }
//         })
//         this.setState({
//             SelectList:this.state.SelectList
//         })
//         console.log(this.state.SelectList)
//     }
// }
// const styles=StyleSheet.create({
    
// })