import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomIcon } from './components/common'
import Profile from './screens/Profile'
import Root from './screens/calendar/Root'
import Rank from './screens/Rank'

const BottomTab = createBottomTabNavigator()

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
      let type = ''
      let icon = ''

      switch (route.name) {
          case 'Profile': 
              type = 'FontAwesome'
              icon = focused ? 'user-circle-o' : 'user-circle'
              break

          case 'Root':
              type = 'AntDesign'
              icon = 'calendar'
              break

          case 'Rank': 
              type = 'Ionicons'
              icon = focused ? 'md-people-circle' : 'md-people-circle-outline'
              break
      }

      return <CustomIcon
                  type={type}
                  icon={icon}
                  color={color}
                  size={size}
              />
  },
  tabBarInactiveTintColor: 'black',
  tabBarActiveTintColor: '#70A32B'
})


const Tab = (props) => {

  return (
    <BottomTab.Navigator 
      screenOptions={screenOptions} 
      initialRouteName='Root'
      backBehavior='none' 
    >
      <BottomTab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ 
          headerShown: true, 
          title: '통계', 
          tabBarLabel: '통계',
          headerStyle: {
              backgroundColor: '#CCE9BA',
          },
          headerTintColor: '#3D550C',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
        }}
      />
      <BottomTab.Screen 
        name="Root" 
        component={Root}
        options={{
          headerShown: false,  
          tabBarLabel: '오늘',
        }}
      />
      <BottomTab.Screen 
        name="Rank" 
        component={Rank} 
        options={{
          headerShown: true, 
          title: '랭킹', 
          tabBarLabel: '랭킹',
          headerStyle: {
              backgroundColor: '#CCE9BA',
          },
          headerTintColor: '#3D550C',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
          
        }}
      />
    </BottomTab.Navigator>
  )
}

export default Tab