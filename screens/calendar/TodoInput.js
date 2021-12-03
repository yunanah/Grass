import React, { useState } from 'react'
import { convertDate, dateID } from '../../components/common'
import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const TodoInput = (props) => {
  
    //props
    const { navigation, route } = props
  
    //state
    const [isKeywork, setIsKeywork] = useState(false)
    const toggleSwitch = () => setIsKeywork(previousState => !previousState)
    const [todoTitle, setTodoTitle] = useState('')
    const [showStartPicker,  setShowStartPicker]  = useState(false)
    const [showEndPicker,  setShowEndPicker]  = useState(false)
    const [startDate,   setStartDate]   = useState(new Date())
    const [endDate,     setEndDate]     = useState(new Date())
  
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
          onPress={() => {
            navigation.navigate('Year', {
              todo: {
                key: dateID(new Date()),
                title: todoTitle,
                start: convertDate(startDate),
                end: convertDate(endDate),
                isKeywork: isKeywork,
              }
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