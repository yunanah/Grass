import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Rank = (props) => {

    const { navigation, route } = props
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>랭킹페이지 입니다.</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CCE9BA'
    },
    title: {
      fontFamily: 'BMDoHyeon-OTF-Regular'
    }
})
  
export default Rank