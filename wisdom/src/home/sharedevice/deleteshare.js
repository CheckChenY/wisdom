import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';


class DeleteShare extends Component {
    constructor() {
        super()
        this.state = {
            personlist:[]
        }
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header: null,
        };
    };
    render() {
        const personlist=this.props.navigation.state.params.personlist
        return (
            <View style={style.page}>
                <View style={{ height: 55, backgroundColor: '#467cd4', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome color="#fff" name="angle-left" size={28} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, color: '#fff' }}>移除权限</Text>
                    <TouchableOpacity onPress={() => this.delete()}>
                        <Text style={{ fontSize: 14, color: '#fff', paddingRight: 15, }}>移除</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 10, backgroundColor: '#F6F6F6', }}></View>
                {
                    personlist.map((item,index)=>{
                        return(
                            <View key={index} style={{paddingLeft:15,paddingRight:15,position:'relative',}}>
                                <View style={{ flexDirection: 'row', paddingLeft: 15, paddingRight: 15, backgroundColor: '#fff',borderBottomColor:'#EBEBEB',borderBottomWidth:1, }}>
                                    <View style={{ width: '20%', height: 80, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'blue', }}>

                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16, color: '#333', }}>{item.tag}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={()=>this.select(item)} style={{width:20,height:20,borderColor:'#EBEBEB',borderWidth:1,borderRadius:3,position:'absolute',right:45,top:30,justifyContent:'center',alignItems:'center',}}>
                                    {
                                        item.select?(
                                            <AntDesign color="#999" name="check" size={16}/>
                                        ):(
                                            <View/>
                                        )
                                    }
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    componentDidMount(){
        let personlist=this.props.navigation.state.params.personlist
        personlist.forEach(s=>{
            s.select=false
        })
        this.setState({
            personlist:personlist
        })
    }
    delete = () => {
        console.log(this.state.personlist)
        this.props.navigation.goBack()
    }
    select = (a) => {
        let personlist=this.state.personlist
        personlist.forEach(s=>{
            if(s.name==a.name){
                s.select=!s.select
            }
        })
        this.setState({
            personlist:personlist
        })
    }
}
const style = StyleSheet.create({
    page: {
        // backgroundColor:'rgb(246,246,246)',
        height: '100%',
    },
})
export default DeleteShare