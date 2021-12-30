import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { convertDate } from '../components/common'

const Todo = (props) => {
    //props
    const { navigation, id, title, isKeywork, start, end } = props
    
    const startDate = convertDate(start)
    const endDate = convertDate(end)

    //logic   

    //render
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{startDate} ~ {endDate}</Text>
            <Text style={styles.title}>{isKeywork ? '중요함!!' : '안중요함'}</Text>
            <TouchableOpacity
              onPress={()=> navigation.push('TodoInput', {
                todo: {
                  id: id,
                  title: title,
                  isKeywork: isKeywork,
                  start: start,
                  end: end
                }
              })}
            >
              <Text>수정하기</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFF8F',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        margin: 5,
        padding: 20,
        borderRadius: 4
    },
    title: {
        fontFamily: 'BMDoHyeon-OTF-Regular'
    }
})

export default Todo