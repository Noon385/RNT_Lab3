import { View, Image } from 'react-native'
import { IconButton,Text } from 'react-native-paper'
import React from 'react'

const Services = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <Image source={require("../assets/logo.png")}
      style={{
        alignSelf:"center"
        ,marginVertical:"50"
      }}/>

      <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between"} }>
        <Text style={{fontSize:40,fontWeight:"bold"}}>Service List</Text>
        <IconButton icon={"plus-circle"} iconColor='red' size={40}onPress={()=>navigation.navigate("AddNewService")}></IconButton>
      </View>
    </View>
  )
}

export default Services