import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { CustomIcon } from '../../components/common'
import Todo from '../../components/Todo'
import todoDummy from '../../assets/json/dummy.json'

const Year = (props) => {
  
    const { navigation, route } = props
  
    const [todos, setTodos] = useState(todoDummy)
    const [searchTodos, setSearchTodos] = useState([])
    const [searching, setSearching] = useState(false)

    console.log('params:',route.params)
  
    useEffect(() => {
      console.log('useEffect')
      
      if (route.params?.todo) {
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

        <TextInput 
          style={styles.searchBar}
          placeholder="검색어를 입력해주세요"
          // value={search}
          onChangeText={title => {
            console.log('검색어:', title)

            setSearching(title !== '')

            const result = todos.filter(todo => todo.title.includes(title))
            setSearchTodos(result)
          }}       
        />

        <Text>2021 달력입니다</Text>

        <ScrollView>
          {searching ?
            searchTodos.map(todo =>
              <Todo
                key={todo.key}
                title={todo.title}
                start={todo.start}
                end={todo.end}
                isKeywork={todo.isKeywork}
              />
            ) : 
            todos.length !== 0 ?
              todos.map(todo =>
                <Todo
                  key={todo.key}
                  title={todo.title}
                  start={todo.start}
                  end={todo.end}
                  isKeywork={todo.isKeywork}
                />
              ) :
                <Text>등록된 일정이 없습니다.</Text>
          }
        </ScrollView>
  
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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CCE9BA',
    },
    searchBar: {
      borderWidth: 1,
      height: 40
    }
})

  export default Year