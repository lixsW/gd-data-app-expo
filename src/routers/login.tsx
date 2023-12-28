import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
//登录页面
import LoginScreen from '../screen/Login'
//密码登录页面
import Password from '../screen/Login/Password'

// 创建堆栈导航
const Stack = createStackNavigator()

const login: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* 添加堆栈的屏幕 */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen as any}
      />

      {/* 账号密码登录页面 */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Password"
        component={Password}
      />
    </Stack.Navigator>
  )
}

export default login

const styles = StyleSheet.create({})
