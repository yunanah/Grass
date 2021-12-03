import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Year from './Year'
import Day from './Day'
import TodoInput from './TodoInput'

const Stack = createNativeStackNavigator()

const Root = (props) => {

    const { navigation, route } = props
  
    console.log("navigation:" ,navigation)
  
    return (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen 
            name="Year" 
            component={Year} 
            options={{ 
              headerShown: true,
              title: '2021', 
              headerStyle: {
                  backgroundColor: '#CCE9BA',
              },
              headerTintColor: '#3D550C',
              headerTitleStyle: {
                  fontWeight: 'bold',
              }
            }}       
          />
          <Stack.Screen 
            name="Day" 
            component={Day} 
            options={{ 
              headerShown: true,
              title: '오늘', 
              tabBarLabel: '오늘',
              headerStyle: {
                  backgroundColor: '#CCE9BA',
              },
              headerTintColor: '#3D550C',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
            }}
          />
        </Stack.Group>
        <Stack.Group 
          screenOptions={{ presentation: 'modal' }}
        >
          <Stack.Screen 
            name='TodoInput'    
            component={TodoInput}   
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    )
}

export default Root