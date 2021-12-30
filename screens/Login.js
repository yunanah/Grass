import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const Login = (props) => {

  const { setShowLogin } = props

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  return (
    <View style={styles.container}>
      <Text>로그인</Text>
      <TextInput
        onChangeText={id => {
          setId(id)
        }}
        placeholder='아이디 입력'
        value={id}
      />
      <TextInput
        onChangeText={pw => {
          setPw(pw)
        }}
        placeholder='비밀번호 입력'
        secureTextEntry={true}
        value={pw}
      />
      <TouchableOpacity onPress={() => setShowLogin(false)}>
        <Text>로그인하기</Text>
      </TouchableOpacity>     
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

export default Login