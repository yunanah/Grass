import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Profile = (props) => {

    const { navigation, route } = props
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>통계</Text>
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


export default Profile
