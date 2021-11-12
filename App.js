import { StatusBar } from 'expo-status-bar'
import React, { createElement } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
      let type = ''
      let icon = ''

      switch (route.name) {
          case 'Profile': 
              type = 'FontAwesome'
              icon = focused ? 'user-circle-o' : 'user-circle'
              break

          case 'Calendar':
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
  tabBarActiveTintColor: 'tomato'
})


const CustomIcon = (props) => {
  const { type, style, icon, size, color } = props
  let typeClass

  //set typeClass
  switch (type) {
      case 'AntDesign'                : typeClass = AntDesign;                break;
      case 'Ionicons'                 : typeClass = Ionicons;                 break;
      // case 'MaterialIcons'            : typeClass = MaterialIcons;            break;
      case 'FontAwesome'              : typeClass = FontAwesome;              break;
      case 'FontAwesome5'             : typeClass = FontAwesome5;              break;
      // case 'MaterialCommunityIcons'   : typeClass = MaterialCommunityIcons;   break;
      // case 'Entypo'                   : typeClass = Entypo;                   break;
  }

  //render element
  return createElement(typeClass, { style: style, name: icon, size: size, color: color }, null)
}

const Tabs = (props) => {

  return (
    <BottomTabs.Navigator 
      screenOptions={screenOptions} 
      initialRouteName='Calendar'
      backBehavior='none' 
    >
      <BottomTabs.Screen 
        name="Profile" 
        component={Profile} 
        options={{ 
          headerShown: true, 
          title: '통계', 
          tabBarLabel: '통계',
          headerStyle: {
              backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity 
                style={{ marginRight: 15, color: 'ivory' }}
                onPress={() => console.log('info')}
            >
                <CustomIcon
                    type='Ionicons'
                    icon='information-circle-outline'
                    color="ivory"
                    size={25}
                />
            </TouchableOpacity>
        )
        }}
      />
      <BottomTabs.Screen 
        name="Calendar" 
        component={Calendar} 
        options={{
          headerShown: true, 
          title: '오늘', 
          tabBarLabel: '오늘',
          headerStyle: {
              backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity 
                style={{ marginRight: 15, color: 'ivory' }}
                onPress={() => navigation.push('TodoInput')}
            >
                <CustomIcon
                    type='FontAwesome5'
                    icon='plus'
                    color="ivory"
                    size={25}
                />
            </TouchableOpacity>
        )
        }}
      />
      <BottomTabs.Screen 
        name="Rank" 
        component={Rank} 
        options={{
          headerShown: true, 
          title: '랭킹', 
          tabBarLabel: '랭킹',
          headerStyle: {
              backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          }
          
        }}
      />
    </BottomTabs.Navigator>
  )
}

const Root = (props) => {

  const { navigation, route } = props

  return (
    <View style={styles.container}>
      <Text>2021년!</Text>
      <TouchableOpacity onPress={() => {
        navigation.push('Details')
      }}>
        <Text>상세화면으로 이동</Text>
      </TouchableOpacity>
    </View>
  )
}

const Profile = (props) => {

  const { navigation, route } = props

  return (
    <View style={styles.container}>
      <Text>통계</Text>
    </View>
  )
}

const Calendar = (props) => {

  const { navigation, route } = props

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Year" component={Year} options={{ headerShown: false }}/>
        <Stack.Screen name="Day" component={Day} options={{ headerShown: false }}/>
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='TodoInput'    component={TodoInput}   options={{ headerShown: false }}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

const Year = (props) => {

  const { navigation, route } = props

  return (
    <View style={styles.container}>
      <Text>2021 달력입니다</Text>
      <TouchableOpacity onPress={() => {
        navigation.push('Day', {
          date: '2021-11-12',
          day: 'Friday'
        })
      }}
      >
        <Text>오늘</Text>
      </TouchableOpacity>
    </View>
  )
}

const Day = (props) => {

  const { navigation, route } = props
  const { date, day } = route.params

  return (
    <View style={styles.container}>
      <Text>오늘 할일목록입니다.</Text>
      <Text>{date}</Text>
      <Text>{day}</Text>
      <TouchableOpacity onPress={() => {
        navigation.push('Year')
      }}
      >
        <Text>2021 달력보기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.push('TodoInput')
      }}
      >
        <Text>할일등록</Text>
      </TouchableOpacity>
    </View>
  )
}

const TodoInput = (props) => {

  const { navigation, route } = props

  return (
    <View>
      <Text>할일 입력하는 모달입니다</Text>
      <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}
      >
        <Text>닫기</Text>
      </TouchableOpacity>
    </View>
  )
}

const Rank = (props) => {

  const { navigation, route } = props

  return (
    <View style={styles.container}>
      <Text>랭킹페이지 입니다.</Text>
      <TouchableOpacity onPress={() => {
        navigation.goBack()
      }}>
        <Text>뒤로 가기</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App