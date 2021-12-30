import React, { useState, useEffect } from 'react'
import { convertDate, dateID } from '../../components/common'
import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'

const TodoInput = (props) => {
  
    //props
    const { navigation, route } = props
  
    //state
    const [isKeywork, setIsKeywork] = useState(false)
    const toggleSwitch = () => setIsKeywork(previousState => !previousState)
    const [todoId, setTodoId] = useState(null)
    const [todoTitle, setTodoTitle] = useState('')
    const [showStartPicker,  setShowStartPicker]  = useState(false)
    const [showEndPicker,  setShowEndPicker]  = useState(false)
    const [startDate,   setStartDate]   = useState(new Date())
    const [endDate,     setEndDate]     = useState(new Date())
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
      console.log('useEffect')      

      if (route.params?.todo) {
        const { id, title, isKeywork, start, end } = route.params.todo 

        console.log(`isKeywork: ${isKeywork}`)

        setIsEditing(true)
        setTodoId(id)
        setTodoTitle(title)
        setIsKeywork(isKeywork === 1 ? true : false)
        setStartDate(start)
        setEndDate(end)
      }
            
    }, [route.params])
  
    //logic
    const onStartDateChange = (event, selectedDate) => {
        console.log(`selectedDate: ${JSON.stringify(selectedDate)}`)
        setStartDate(selectedDate)
    }
  
    const onEndDateChange = (event, selectedDate) => {
      console.log(`selectedDate: ${JSON.stringify(selectedDate)}`)
      setEndDate(selectedDate)
    }
  
  
  
    //render
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
  
  
        <View style={{ 
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={styles.text_style}>시작</Text>
            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setShowStartPicker(!showStartPicker)}>
                <Text style={styles.text_style}>{convertDate(startDate)}</Text>
            </TouchableOpacity>
        </View>
        {showStartPicker ?
            <DateTimePicker
                display="inline"
                locale={'ko-kr'}
                value={startDate}
                mode={'datetime'}
                is24Hour={true}
                onChange={onStartDateChange}
            /> : null
        }
        
        <View style={{ 
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={styles.text_style}>종료</Text>
            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setShowEndPicker(!showEndPicker)}>
                <Text style={styles.text_style}>{convertDate(endDate)}</Text>
            </TouchableOpacity>
        </View>
        {showEndPicker ?
            <DateTimePicker
                display="inline"
                locale={'ko-kr'}
                value={endDate}
                mode={'datetime'}
                is24Hour={true}
                onChange={onEndDateChange}
            /> : null
        }      
  
        <View style={{ 
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <Text>오늘의 중요한 일인가요?</Text>
          <Switch style={{ marginLeft: 20 }}
            trackColor={{ false: 'floralwhite', true: '#70A32B' }}
            thumbColor={isKeywork ? 'gloralwhite' : '#3D550C'}
            ios_backgroundColor='#CCE9BA'
            onValueChange={toggleSwitch}
            value={isKeywork}
          />
        </View>
        <TouchableOpacity 
          onPress={ async () => {

            const aa = a => a + 1
            const ressult = aa(4)

            if (isEditing) {
              
              await axios.put(`http://13.125.252.204:3000/api/todos/${todoId}`,
              {
                "title": todoTitle,
                "start": convertDate(startDate),
                "end": convertDate(endDate),
                "isKeywork": isKeywork
              },
              {
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
              })
              .then(res => {
                if (res.status === 200) {
                  console.log('res.data: ', res.data)
                }
              })
              .catch(function (error) {
                console.log(`(axios) updateTodo error: ${error}`)
              })

            } else {

              //execute
              await axios.post('http://13.125.252.204:3000/api/todos', 
              {
                "title": todoTitle,
                "start": convertDate(startDate),
                "end": convertDate(endDate),
                "isKeywork": isKeywork
              }, 
              {
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
              })
              .then(res => {
                // console.log(`fetchServices res: ${JSON.stringify(res)}`)
                if (res.status === 200) {
                  console.log('res: ', res)
                }
              })
              .catch(function (error) {
                console.log(`(axios) createTodo error: ${error}`)
              })
            }
            console.log('white rabbit')

            navigation.navigate('Year', {
              // todo: {
              //   key: dateID(new Date()),
              //   title: todoTitle,
              //   start: convertDate(startDate),
              //   end: convertDate(endDate),
              //   isKeywork: isKeywork,
              // }

              success: true

            })
          }}
        >
          <View style={styles.button_add}>
            <Text style={styles.button_add_title}>등록하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CCE9BA',
    },
    input: {
      height: 40,
      margin: 12,
      borderBottomWidth: 1,
      padding: 10,
      marginHorizontal: 30
    }, 
    text_style: {
      fontSize: 18
    },  
    button_add: {
      color: '#3D550C',
      backgroundColor: 'darkolivegreen',
      alignItems: 'center',
      padding: 10,
      borderRadius: 4,
      margin: 12,
      marginHorizontal: 130,
      marginVertical: 10
    },
    button_add_title: {
      color: 'white'
    }
})

export default TodoInput