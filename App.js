import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {MyContextControllerProvider} from './store'
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './routers/Router'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const App = () => {
  const USERS = firestore().collection("USERS")
  const admin={
    fullname:"admin",
    email:"admin@gmail.com",
    password:"123456",
    address:"binh duong",
    role:"admin"

  }
  useEffect(()=>
  USERS.doc(admin.email)
  .onSnapShot(
    u=>{
      if(!u.exists){[
        createUserWithEmailAndPassword(auth,admin.email,admin.password)
        .then(response =>{
          USERS.doc(admin.email).set(admin)
          console.log("add new admin")
        })
      ]}
    }
  )
  )
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}

export default App

const styles = StyleSheet.create({})