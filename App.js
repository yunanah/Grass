import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import Tab from './Tab'

const App = () => {

  //font
  const [ fontsLoaded, ERR ] = useFonts({
    'NanumMyeongjo-Regular': require('./assets/fonts/NanumMyeongjo-Regular.ttf'),
    'BMDoHyeon-OTF-Regular': require('./assets/fonts/BMDOHYEON.otf'),
  })


  return fontsLoaded ? (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  ) : <AppLoading />;
}

export default App