import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import {useMyconTextController,logout} from '../store/index'
import {useEffect} from 'react'

const Setting = ({navigation}) => {
    const[controller,dispath]=useMyconTextController()
    const {userLogin}=controller
    const handleLogOut= ()=>{
        logout(dispath)
    }
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate('Login')
    },[userLogin])
  return (
    <View style={{flex:1, justifyContent:"center"}}>
     <Button mode="contained" onPress={handleLogOut}>Logout</Button>
    </View>
  )
}

export default Setting