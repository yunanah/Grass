import { StatusBar } from 'expo-status-bar'
import React, { useState, useLayoutEffect, createElement, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons'
import Todo from './Todo'

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
        //   headerRight: () => (
        //     <TouchableOpacity 
        //         style={{ marginRight: 15, color: 'ivory' }}
        //         onPress={() => console.log('info')}
        //     >
        //         <CustomIcon
        //             type='Ionicons'
        //             icon='information-circle-outline'
        //             color="ivory"
        //             size={25}
        //         />
        //     </TouchableOpacity>
        // )
        }}
      />
      <BottomTabs.Screen 
        name="Calendar" 
        component={Calendar} 
        options={{
          headerShown: false, 
          // title: '2021', 
          tabBarLabel: '오늘',
          // headerStyle: {
          //     backgroundColor: '#f4511e',
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //     fontWeight: 'bold',
          // },
        //   headerRight: () => (
            // <TouchableOpacity 
            //     style={{ marginRight: 15, color: 'ivory' }}
            //     onPress={() => navigation.push('TodoInput')}
            // >
            //     <CustomIcon
            //         type='FontAwesome5'
            //         icon='plus'
            //         color="ivory"
            //         size={25}
            //     />
            // </TouchableOpacity>
        // )
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

  // const [todos, setTodos] = useState([])

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
            // tabBarLabel: '2021',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
          }}
          // initialParams={{
          //   todos: todos,
          //   setTodos: setTodos
          // }}
          
        />
        <Stack.Screen 
          name="Day" 
          component={Day} 
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

const Year = (props) => {

  const { navigation, route } = props
  // const { todos, setTodos } = route.params

  const [todos, setTodos] = useState([])

  console.log('params:',route.params)

  // console.log('todos:', todos)
  // console.log('setTodos: ',setTodos)

  useEffect(() => {
    console.log('useEffect')
    
    if (route.params?.todo) {
      // console.log('기존의 할일: ', todos)
      console.log('ok ok ok')

      const { todo } = route.params

      console.log('todo', todo)
      const newTodos = [...todos, todo]
      console.log('newTodos', newTodos)

      setTodos(newTodos)
      console.log('todos:', todos)
    }

  }, [route.params])

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    navigation.setOptions({
      headerRight: () => (
          <TouchableOpacity 
            style={{ marginRight: 15, color: 'ivory' }}
            onPress={() => navigation.push('TodoInput', {
              name: 'yoora'
            })}
          >
            <CustomIcon
              type='FontAwesome5'
              icon='plus'
              color="ivory"
              size={25}
            />
          </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text>2021 달력입니다</Text>

      {todos.length !== 0 ?
        todos.map(todo =>
          <Todo
            title={todo.title}
            isKeywork={todo.isKeywork}
          />
        ) :
          <Text>등록된 일정이 없습니다.</Text>
      }

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

  useLayoutEffect(() => {
    navigation.setOptions({
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
    })
  }, [navigation])

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
  const [isKeywork, setIsKeywork] = useState(false)
  const toggleSwitch = () => setIsKeywork(previousState => !previousState)
  const [todoTitle, setTodoTitle] = useState('')

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        onChangeText={title => {
          console.log('title:', title)
          setTodoTitle(title)
        }}
        placeholder="무엇을 하실 계획인가요?"
        value={todoTitle}
      />

      <Text>오늘의 중요한 일인가요?</Text>
      <Switch
        trackColor={{ false: 'floralwhite', true: 'darkseagreen' }}
        thumbColor={isKeywork ? 'gloralwhite' : 'darkgreen'}
        ios_backgroundColor='yellowgreen'
        onValueChange={toggleSwitch}
        value={isKeywork}
      />
      <TouchableOpacity 
        onPress={() => {

          navigation.navigate('Year', {
            todo: {
              title: todoTitle,
              isKeywork: isKeywork,
            }
          })

          // navigation.push('Year', {
          //   todo: {
          //     title: todoTitle,
          //     isKeywork: isKeywork,
          //   }
          // })
        }}
      >
        <View style={styles.button_add}>
          <Text style={styles.button_add_title}>등록하기</Text>
        </View>
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
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    borderBottomWidth: 1,
    padding: 10
  },  
  button_add: {
    // color: 'white',
    backgroundColor: 'darkolivegreen',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
    margin: 12
  },
  button_add_title: {
    color: 'white'
  }
})

export default App