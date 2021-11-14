import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Todo = (props) => {

    const { title, isKeywork } = props

    return (
        <View style={styles.container}>
            <Text>{ title }</Text>
            <Text>{ isKeywork ? '중요함!!' : '안중요함' }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

        margin: 5,
        padding: 20,
        borderWidth: 1
    }
})

export default Todo