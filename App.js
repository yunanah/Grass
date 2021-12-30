import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import Tab from './Tab'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../grass/screens/Login'

const App = () => {

  const [showLogin, setShowLogin] = useState(true)

  //font
  const [ fontsLoaded, ERR ] = useFonts({
    'NanumMyeongjo-Regular': require('./assets/fonts/NanumMyeongjo-Regular.ttf'),
    'BMDoHyeon-OTF-Regular': require('./assets/fonts/BMDOHYEON.otf'),
  })

  //string
  const storeStr = async (key, str) => {
    try {
      await AsyncStorage.setItem(`@${key}`, str)
    } catch (e) {
      // saving error
    }
  }

  //string
  const getStr = async (key) => {
    try {
      const value = await AsyncStorage.getItem(`@${key}`)
      if(value !== null) {
        // value previously stored
        console.log(`${key}: ${value}`)
      }
    } catch(e) {
      // error reading value
    }
  }

  //object

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch(e) {
  //     // error reading value
  //   }
  // }  

  //object
  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem('@storage_Key', jsonValue)
  //   } catch (e) {
  //     // saving error
  //   }
  // }  

  // storeStr("name", "Yoora")
  getStr("name")

  return fontsLoaded ? 
          showLogin ? 
            <Login setShowLogin={setShowLogin} /> :
            <NavigationContainer>
              <Tab />
            </NavigationContainer>
           : <AppLoading />
}

export default App