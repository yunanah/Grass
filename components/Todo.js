import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Todo = (props) => {
    //props
    const { title, isKeywork, start, end } = props

    //logic   

    //render
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{start} ~ {end}</Text>
            <Text style={styles.title}>{isKeywork ? '중요함!!' : '안중요함'}</Text>
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