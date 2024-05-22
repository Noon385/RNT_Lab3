import { View, Alert } from 'react-native'
import { Button,HelperText,Text,TextInput } from 'react-native-paper'
import {React,useState} from 'react'
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { createUserWithEmailAndPassword } from 'firebase/auth'


const Register = ({navigation}) => {
  const[fullname,setFullName] = useState("")
  const[email,setEmail]= useState("")
  const[password,setPassword] = useState("")
  const[passwordConfirm,setPasswordConFirm]=useState("")
  const[hiddenPassword,setHiddenPassword]=useState(true)
  const[hiddenPasswordConfirm,setHiddenPasswordConfirm]=useState(false)
  const[phone,setPhone]=useState("")
  const[address,setAddress]=useState("")
  const hasErrorFullName =()=>fullname==""
  const hasErrorPassword= ()=> password.length<6
  const hasErrorEmail =()=>!email.includes("@")
  const hasErrorPasswordConfirm= ()=> passwordConfirm !=password
  const USERS =firestore().collection("USERS")
  const handleCreateAccount = ()=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then( response =>{
      USERS.doc(email)
      .set({
        fullname,
        email,
        password,
        phone,
        address,
        role:"customer"
      })
      navigation.navigate("Login")
    } )
    .catch(e=>Alert.alert("Tai khoan ton tai"))
  }

  return (
    <View style={{flex:1, padding:10}}>
      <Text style={{
        fontSize:30,
        fontWeight:"bold",
        alignSelf:"center",
        color:"pink",
        marginBottom:50,
        marginTop:50

      }}>Register new account</Text>
      <TextInput 
        label={"Full Name"}
        value={fullname}
        onChange={setFullName}>
      </TextInput>
      <HelperText type='error' visible={hasErrorFullName}>
        Must have Fullname
      </HelperText>

      <TextInput
      label={"Email"}
      value={email}
      onChange={setEmail}>
      </TextInput>
      <HelperText type='error' visible={hasErrorEmail}>
        Email incorrect
      </HelperText>

      <TextInput
      label={"Password"}
      value={password}
      onChange={setPassword}
      secureTextEntry={hiddenPassword}
      right={<TextInput.Icon icon={"eye"} onPress={()=>setHiddenPassword(!hiddenPassword)}/>}/>

      <HelperText type='error' visible={hasErrorPassword}>
        Password need more than 5 character
      </HelperText>
      <TextInput 
        label={"Confirm Password"}
        value={passwordConfirm}
        onChangeText={setPasswordConFirm}
        secureTextEntry={!hiddenPasswordConfirm}
        right={<TextInput.Icon icon={"eye"} onPress={()=>setHiddenPassword(!hiddenPassword)}/>}/>
        <HelperText type='error'visible={hasErrorPasswordConfirm}>
          Confirm password need to match with password
        </HelperText>

        <TextInput
        label={"Address"}
        value={address}
        onChange={setAddress}
        style={{marginBottom:20}}
        />
        <TextInput
        label={"Phone"}
        value={phone}
        onChange={setPhone}
        style={{marginBottom:20}}
        />
        <Button mode="contained" onPress={handleCreateAccount}>
          Create Account
        </Button>


      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <Text>Do you have an account ? </Text>
        <Button onPress={()=>navigation.navigate("Login")}>Login account</Button>
      </View>
    </View>
  )
}

export default Register