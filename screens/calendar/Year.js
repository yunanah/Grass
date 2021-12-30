import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { CustomIcon } from '../../components/common'
import Todo from '../../components/Todo'
// import todoDummy from '../../assets/json/dummy.json'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';
const Year = (props) => {
  
    const { navigation, route } = props
  
    const [todos, setTodos] = useState([])
    const [searchTodos, setSearchTodos] = useState([])
    const [searching, setSearching] = useState(false)
  
    useEffect( async () => {
      console.log('useEffect')      

      let subscribed = true

      if (subscribed) {
      
        await axios.get('http://13.125.252.204:3000/api/todos', {
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then(res => {
          console.log('res:', res.data)
          setTodos(res.data)
        })
        .catch(err => console.log('에러', err))  

      } 
      
      return () => {
        subscribed = false
      }      

        
        
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
    
        const fetchTodos = async () => {
          try {
            console.log('useFocusEffect')
            await axios.get('http://13.125.252.204:3000/api/todos', {
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            })
            .then(res => {
              console.log('res:', res.data)
              setTodos(res.data)
            })
            .catch(err => console.log('에러', err))              
    
            if (isActive) {
              setUser(user);
            }
          } catch (e) {
            // Handle error
          }
        };

    
        fetchTodos();
    
        return () => {
          isActive = false;
        };
      }, [])
    );    

    useEffect( async () => {
       if (route.params?.success) {

        await axios.get('http://13.125.252.204:3000/api/todos', {
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then(res => {
          console.log('res:', res.data)
          setTodos(res.data)
        })
        .catch(err => console.log('에러', err))  


        // console.log('params:',route.params) 
        // const { todo } = route.params  
        // const newTodos = [...todos, todo]
        // setTodos(newTodos)
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
            searchTodos.map(todo => {

                //parse date
                const dateStart = new Date(todo.start)
                const dateEnd   = new Date(todo.start)
                              
                return (
                  <Todo
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  start={dateStart}
                  end={dateEnd}
                  isKeywork={todo.isKeywork}
                  navigation={navigation}
                />
                )

              }
            ) : 
            todos.length !== 0 ?
              todos.map(todo => {
                console.log(`todo.start: ${typeof todo.start}`)

                //parse date
                const dateStart = new Date(todo.start)
                const dateEnd   = new Date(todo.start)

                return (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  start={dateStart}
                  end={dateEnd}
                  isKeywork={todo.isKeywork}
                  navigation={navigation}
                />
                )
              }  
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