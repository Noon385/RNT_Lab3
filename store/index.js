import { View, Text } from 'react-native'
import {Children, React,createContext,useContext,useMemo,useReducer} from 'react'
import {auth} from '@react-native-firebase/auth'
import { firestore } from '@react-native-firebase/firestore'
import { Alert } from 'react-native'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const MyContext = createContext()
MyContext.displayName="vbdvabv"
const reducer =(state,action)=>{

    switch (action.type) {
        case 'USER_LOGIN':
            return {...state, userLogin: action.value}
        case 'LOGOUT':
            return{...state,userLogin:null}
            default: return new Error("Action not found")
            break;
    }
}
const MyContextControllerProvider=({children})=>{
    const initialState={
        userLogin:null,
        services:[],
    }
    const [controller,dispath]= useReduccer(reducer,initialState)
    const value=useMemo(()=>[controller,dispath],[controller,dispath])
    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}
const useMyContextController=()=>{
    const context = useContext(MyContext)
    if(context==null){
        return new Error("useMyContextController must inside in MyContextControllerProvider")
    }return context
}
const USERS= firestore().collection("USERS")
const login =(dispath,email,password)=>{
    auth().signInWithEmailAndPassword(email,password)
    .then(response => 
        USERS.doc(email)
        .onSnapShot(
            u=> dispath({type:"USER_LOGIN",value: u.data()})
        )
    )
    .catch(e=> Alert.alert("Wrong Email and Password"))  
}
const logout=(dispath)=>{
    auth().signOut()
    .then(()=>dispath({type :"LOGOUT"}))
}
export{
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout
}



    