import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView,SafeAreaView,Dimensions,Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import EchartComponent from '../echarts';
import EchartComponentList from '../echartsList';
import HeaderComponent from '../../components/header';
import FetchManager from '../../http/http';
import ModelPop from '../../components/modelPop';
import {getDeviceModal,getDeviceModalList,getEchartModal} from '../../components/home/deviceModal';
import Page from './page';

import { getDay,getMonth } from '../../components/home/changeTime';
const { width,height } = Dimensions.get('window');

const isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);  



class ActiveCurve extends Component {
    
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header: null
        }
    };
    constructor() {
        super()
        this.state = {
            wangguanList: [],
            wangguandefault: '',
            detail:{},
            timeType: true,
            EchartsTypeList: [],
            EchartsType: '电压',
            lineList:[],
            n_year:moment().format('YYYY'),
            n_month:moment().format('M'),
            n_day:moment().format('D'),

            bol_date:true,
            deviceId:'',
            time:moment().format('YYYY-MM-DD'),
            type:'3',
            xdata:[],
            ydata:[],
            arrdata1:[],
            arrdata2:[],
            arrdata3:[],
            legend:[],
            url:'getDynamicCurveByDay',
            unit:'V',
            page:0,
            size:10,

            PageAllNum:1,//总页数
            activePage:1,//当前活动页码数 （当PageAllNum小于activePage时会自动显示最后一页）
            // current:1,//回调的当前页面数
            pageBol:false,
            arr:[]
        }
    }

    componentDidMount(){
        this.findAllNet();
    }

    findAllNet = () => {
        FetchManager.get('/app/acbdevice/findAllNet','', async (set) => {
            console.log(set)
            if(set.status === 0 && set.data.length > 0){
                let detail = set.data;
                let arr = [],arrdefault;
                // let modal = getDeviceModal(detail.deviceModel);
                detail.forEach((show,i) => {
                    if(i === 0){
                        arrdefault = show.deviceName
                    }
                    arr.push(show.deviceName)
                })

                this.setState({
                    wangguanList:arr,
                    wangguandefault:arrdefault,
                    detail:detail,
                })

                this.findSwitchList(detail[0].deviceId)

            }
        })
    }


    findSwitchList = (id) => {
        const { deviceId } = this.state;
        let obj = {
            parDeviceId: id ? id : deviceId
        }
        console.log(obj)
        FetchManager.get('/app/acbdevice/findSwitchList',obj, async (set) => {
            console.log(set)
            if(set.status === 0 && set.data.length > 0){
                let data = set.data;
                let modal = getDeviceModal(data[0].deviceModel);
                let list = getDeviceModalList(modal);
                console.log(modal)
                data[0].status = 0;
                this.setState({
                    lineList:data,
                    EchartsTypeList:list,
                    deviceId:data[0].deviceId,
                    modal:modal
                })
            }
            this.getHotDate();
        })
    }

    getHotDate = () => {
        const { deviceId,time,type,url,modal,page,size,} = this.state;
        let obj = {
            breakDeviceId:deviceId,
            time:time,
            type:type,
            page:page,
            pageSize:size
        }
        // console.log(PageAllNum)
        // console.log(activePage)
        console.log(obj)
        FetchManager.get('/app/acbElectricityAlarm/' + url,obj, async (set) => {
            console.log(set)
            // let x = [],y = [];
            this.ChangeRusult(set.data.pages,set.data.current)
            if(set.status === 0 && set.data.data.length > 0){
                let detail = set.data.data;
                let objs = getEchartModal(detail,modal);


                if(modal === 2){
                    this.setState({
                        xdata:objs.time,
                        ydata:objs.data,
                        legend:objs.legend,
                        pageBol:true,
                        PageAllNum:set.data.pages,
                        activePage:set.data.current,
                        // current:set.data.current

                    })
                }else if(modal === 4 || modal === 5){
                    this.setState({
                        xdata:objs.time,
                        arrdata1:objs.arrdata1,
                        arrdata2:objs.arrdata2,
                        arrdata3:objs.arrdata3,
                        legend:objs.legend,
                        pageBol:true,
                        PageAllNum:set.data.pages,
                        activePage:set.data.current,
                    })
                }
            }else if(set.status === 1){
                this.popUp.showPop(set.msg)
            }else{
                this.setState({
                    xdata:[],
                    ydata:[],
                    arrdata1:[],
                    arrdata2:[],
                    arrdata3:[],
                    legend:[],
                    pageBol:true,
                    PageAllNum:1,
                    activePage:1
                })
            }
        })
    }

    //fen
    callBack = (CB) => {
        console.log(CB)
        this.setState({
          current:CB,
          page:CB - 1,
        },this.getHotDate)
    }

    //时间转化
    onChangeTime = (time) => {
        let nativeDate2 = new Date(time)
        let t = moment(nativeDate2).format('YYYYMMDD')
        return t;
    }

    getDayNow = (nub,bol_date) => {
        const { n_year,n_month,n_day } = this.state;
        let n_d = bol_date ? getDay(Number(n_year),Number(n_month),Number(n_day),nub) : getMonth(Number(n_year),Number(n_month),Number(n_day),nub)
        console.log(bol_date);
        this.setState({
            n_day:n_d.day,
            n_month:n_d.month,
            n_year:n_d.year,
            time:bol_date ? n_d.year + '-' + n_d.month + '-' + n_d.day : n_d.year + '-' + n_d.month
        },this.getHotDate)
    }

    getListData = (e,i,item) => {
        let modal = getDeviceModal(item.deviceModel);
        let list = getDeviceModalList(modal);
        console.log(modal)
        this.setState({
            EchartsTypeList:list,
            modal:modal,
            page:0,
            activePage:1
        })
        this.findSwitchList(item.deviceId)
    }

    onChangeBtn = (e,i) => {
        console.log(e)
        const { n_year,n_month,n_day } = this.state;
        this.setState({
            bol_date:!this.state.bol_date,
            time:e === 1 ? n_year + '-' + n_month : n_year + '-' + n_month + '-' + n_day,
            url:e === 1 ? 'getDynamicCurveByMonth' : 'getDynamicCurveByDay',
            page:0,
            activePage:1
        },this.getHotDate)
    }

    render() {
        const { wangguanList,wangguandefault,n_day,n_month,n_year,bol_date,EchartsTypeList,lineList,detail,pageBol,
            xdata,ydata,unit,modal,arrdata1,arrdata2,arrdata3,legend,EchartsType,PageAllNum,activePage } = this.state;
            // console.log(pageBol)
            // console.log(activePage)
            // console.log(PageAllNum)
        return (
            <ScrollView>
                <ModelPop ref={ ref => this.popUp = ref }></ModelPop>
                <SafeAreaView style={{backgroundColor:'#467cd4'}}>
                    <HeaderComponent {...this.props} arr={wangguanList} arrDefault={wangguandefault}
                        onChangeBtn = {this.onChangeBtn} item = {detail}
                        getListData={this.getListData} >
                        
                        <Text title="按日">按日</Text>
                        <Text title="按月">按月</Text>
                    </HeaderComponent>
                </SafeAreaView>                
                {/* 页面 */}
                <View>
                    <View style={{ backgroundColor: '#fff',flexDirection:'row',padding:10 }}>
                        <View style={{flex:1,alignItems:'flex-end',paddingRight:20}}>
                            <TouchableOpacity onPress={()=>this.getDayNow(0,bol_date)}>
                                <FontAwesome name={'chevron-left'} color='#999999' size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                            <Text style={{color:'#000000'}}>
                                {n_year}年{n_month < 10 ? '0' + n_month : n_month}月
                                {
                                    bol_date ? (
                                        <Text>{ Number(n_day) < 10 ? '0' + n_day : n_day}日</Text>
                                    ) : <Text />
                                }
                                
                            </Text>
                            <FontAwesome name={'calendar'} color={'#999999'} size={20} />
                        </View>
                        <View style={{flex:1,paddingLeft:20}}>
                            <TouchableOpacity onPress={()=>this.getDayNow(1,bol_date)}>
                                <FontAwesome name={'chevron-right'} color={'#999999'} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
                        <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}>
                            {
                                EchartsTypeList.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={item.select ? style.sixboxed : style.sixbox} onPress={() => { this.selectEchartstype(item) }}>
                                            <Text style={item.select ? style.sixboxtexted : style.sixboxtext}>{item.EchartsType}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ backgroundColor: '#fff', height: 260,padding:15 }}>
                            {
                                modal === 2 || modal === 1 ? 
                                <EchartComponent xdata={xdata} ydata={ydata} EchartsType={EchartsType}
                                legend={legend} unit={unit} />:
                                <EchartComponentList xdata={xdata} arrdata1={arrdata1} EchartsType={EchartsType}
                                arrdata2={arrdata2} arrdata3={arrdata3} legend={legend} unit={unit} />
                            }
                        </View>
                        <View>
                            {
                                pageBol ? 
                                <Page PageAllNum={PageAllNum} activePage={activePage} 
                                arr={this.state.arr}
                                callBack={(CB)=>this.callBack(CB)}/>
                                : <View />
                            }
                        </View>
                    </View>
                    <View style={{ width:'100%', paddingTop: 10, paddingLeft: 15, 
                        paddingRight: 15, backgroundColor: '#fff', marginTop: 10,flexWrap:'wrap',
                        flexDirection:'row',justifyContent:'space-between'}}>
                        {
                            lineList.length > 0 && lineList.map((item,index)=>{
                                return(
                                    <TouchableOpacity onPress={()=>{this.selectLine(item,index)}} key={index} 
                                        style={ item.status === 0 ? style.eightboxed:style.eightbox}>
                                        <Image style={{width:45,height:36,marginBottom:6}} source={{uri:item.modelPhoto}}></Image>
                                        {/* <View style={{backgroundColor:'#467cd4',width:45,height:36,marginBottom:6}}></View> */}
                                        <Text style={{fontSize:12,color:'#333'}}>{item.deviceName}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }

    selectLine=(item,index)=>{
        const { lineList } = this.state;
        // console.log(item)
        let modal = getDeviceModal(item.deviceModel);
        let list = getDeviceModalList(modal);
        // console.log(modal)
        
        lineList.length > 0 && lineList.forEach((show,i)=>{
            if(index === i){
                show.status = 0
            }else{
                show.status = 1
            }
        })
        this.setState({
            deviceId:item.deviceId,
            EchartsTypeList:list,
            modal:modal,
            type:list[0].id,
            unit:list[0].unit,
            EchartsType:list[0].EchartsType,
            page:0,
            activePage:1
        },this.getHotDate)
    }

    selectEchartstype = (item) => {
        var EchartsTypeList = this.state.EchartsTypeList
        EchartsTypeList.forEach(s => {
            s.select = false
            if (item.EchartsType == s.EchartsType) {
                s.select = true
            }
        })
        this.setState({
            EchartsTypeList: EchartsTypeList,
            type:item.id,
            unit:item.unit,
            EchartsType:item.EchartsType,
            page:0,
            activePage:1
        },this.getHotDate)
    }
    selectDate = () => {
        this.setState({ bol_date: !this.state.bol_date })
    }


    //总页数 当前页
    ChangeRusult(PAN,AC){
		var result=[];
		PAN=parseInt(PAN);
		AC=parseInt(AC);

		if(AC<=1){//禁用上一步
			AC=1;
			this.setState({
				prevDis:true,
			});
		}else{
			this.setState({
				prevDis:false,
			});
		}
		if(AC>=PAN){//禁用下一步
			AC=PAN
			this.setState({
				nextDis:true,
			});
		}else{
			this.setState({
				nextDis:false,
			});
        }


        if(PAN>5&&AC>2&&PAN-AC>=2){
			result=[AC-2,AC-1,AC,AC+1,AC+2];
		}else if(PAN>5&&AC<=2){
			result=[1,2,3,4,5];
		}else if(PAN>5&&PAN-AC==1){
			result=[AC-3,AC-2,AC-1,AC,AC+1];
		}else if(PAN>5&&PAN-AC<1){
			result=[AC-4,AC-3,AC-2,AC-1,AC];
		}else if(PAN<=5){
			for(var i=0; i<PAN;i++){
				result.push(i+1);
			}
		}
        
        // console.log(result)
        // console.log(AC)
		this.setState({
			arr:result,
			activePage:AC,
		});
		// this.props.callBack(AC);//向父组件回调传值
		// this.callBack(AC);//当前组件回调传值
      }
      
}
const style = StyleSheet.create({
    dateselect: {
        backgroundColor: '#467cd4',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        padding:3,
        flex:1
    },
    dateselectTexted: {
        color: '#FFFFFF',
    },
    dateselectText: {
        color: '#467cd4',
    },
    dateselected: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:3,
        padding:3,
        flex:1
    },
    sixbox: { width: 50, height: 30, backgroundColor: '#f6f6f6', borderWidth: 1, borderColor: '#788A93', borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
    sixboxtext: { fontSize: 14, color: '#333' },
    sixboxed: { width: 50, height: 30, backgroundColor: '#467cd4', borderWidth: 1, borderColor: '#467cd4', borderRadius: 2, justifyContent: 'center', alignItems: 'center' },
    sixboxtexted: { fontSize: 14, color: '#fff' },
    eightboxed:{width:80,height:80,borderWidth:1,borderRadius:3,borderColor:'#467cd4',
    justifyContent:'center',alignItems:'center',marginBottom:10,backgroundColor:'rgba(74,101,255,0.1)'},
    eightbox:{width:80,height:80,borderWidth:1,borderRadius:3,borderColor:'#E6E6E6',justifyContent:'center',alignItems:'center',marginBottom:10,}
})
export default ActiveCurve