import { createStackNavigator } from "@react-navigation/stack"; 
import Services from "../screens/Services";
import AddNewService from '../screens/AddNewService'
import ServiceDetail from '../screens/ServiceDetail'
import { useMyContextController } from '../store' 
import { IconButton } from "react-native-paper"; 
import { Colors } from "react-native/Libraries/NewAppScreen";
const Stack =createStackNavigator()
const RouterService = () => {
    const [controller,dispath]=useMyContextController()
     const {userLogin} =controller
  return (
    <Stack.Navigator
     initialRouteName="Service"
     screenOptions={{
        title:(userLogin!=null)&&(userLogin.name),
        headerTitleAlign:"center",
        headerStyle: {
            backgroundColor:"pink"},
            headerRight: (props)=><IconButton icon="account"/>
     }}
     >
        <Stack.Screen name="Services" component={Services}/>
        <Stack.Screen name="AddNewService" component={AddNewService}/>
        <Stack.Screen name="ServiceDetail" component={ServiceDetail}/>

    </Stack.Navigator>
  )
}

export default RouterService
