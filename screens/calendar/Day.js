import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { CustomIcon } from '../../components/common'

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
        <Text style={styles.title}>오늘 할일목록입니다.</Text>
        <Text style={styles.title}>{date}</Text>
        <Text style={styles.title}>{day}</Text>
        <TouchableOpacity onPress={() => {
          navigation.push('Year')
        }}
        >
          <Text style={styles.title}>2021 달력보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.push('TodoInput')
        }}
        >
          <Text style={styles.title}>할일등록</Text>
        </TouchableOpacity>
      </View>
    )
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CCE9BA',
    },
    title: {
        fontFamily: 'BMDoHyeon-OTF-Regular'
    }
})

export default Day