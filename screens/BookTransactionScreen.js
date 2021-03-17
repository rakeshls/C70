import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput  } from 'react-native';
import * as Permissions from 'expo-permissions' ;
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
     scannedBookId:'',
     scannedStudentId:'',
      ButtonState:'normal'
    }
  }
  getCameraPermissions = async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status ==='granted',
      ButtonState:'clicked',
      scanned:false
    })
  }
  handleBarCodeScanned = async({type,data})=>{
   const {ButtonState}=this.state
   if (ButtonState === "BookId"){
     this.setState({
       scanned: true,
       scannedBookId: data,
       ButtonState:'normal'
     })
   }
   else
   if (ButtonState === "StudentId"){
    this.setState({
      scanned: true,
      scannedStudentId: data,
      ButtonState:'normal'
    })
  }
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned=this.state.scanned
      const ButtonState=this.state.ButtonState
      if(ButtonState !== 'normal' && hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned} 
          style={StyleSheet.absoluteFillObject}></BarCodeScanner>
        )
      }
      else if(ButtonState ==='normal'){
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Image source={require("../assets/booklogo.jpg")}
              style={{width:200,height:200}}></Image>
              <Text style={{textAlign:'center',fontSize:30}}>Wily App</Text>
            </View>
            <View style={styles.myView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Book Id"
              value={this.state.scannedBookId}/>
            <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions("BookId")}>
              <Text>scan</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.myView}>
            <TextInput 
              style={styles.inputBox}
              placeholder="Student Id"
              value={this.state.scannedStudentId}/>
            <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions("StudentId")}>
              <Text>scan</Text>
            </TouchableOpacity>
            </View>
          </View>
        );
      }
      
    }
  }
  const styles=StyleSheet.create({
    scanButton:{
      backgroundColor:'yellow',
      borderRadius:20,
      margin:10,
      padding:10
    },
    text:{
      fontSize:20,
      color:'black'
    },
    myView:{
    flexDirection:'row',
    margin:25
    }
  })