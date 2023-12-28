import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'

const FirmLogin: React.FC = () => {
  interface LoginFormType {
    username: string
    password: string
    smscode: string
  }
  // 登录表单数据
  const [loginForm, setLoginFrom] = useState<LoginFormType>({
    username: '',
    password: '',
    smscode: '',
  })
  return (
    <View style={[styles.formContainer]}>
      <Text style={[styles.formLable]}>企业邮箱：</Text>
      <TextInput
        style={[styles.formInput]}
        autoCapitalize="none"
        placeholder="请输入企业邮箱"
        placeholderTextColor="rgba(255,255,255,0.4)"
        value={loginForm.username}
        onChangeText={(text) =>
          setLoginFrom((pre) => ({ ...pre, username: text }))
        }
      />
      <View style={[styles.fromBr]}></View>
      {/*  密码登录 */}
      <Text style={[styles.formLable]}>登录密码：</Text>
      <TextInput
        secureTextEntry={true}
        style={[styles.formInput]}
        autoCapitalize="none"
        placeholder="请输入密码"
        placeholderTextColor="rgba(255,255,255,0.4)"
      />
      <View style={[styles.fromBr]}></View>
      <TouchableOpacity>
        <View style={[styles.loginBtn]}>
          <Text style={[styles.loginBtnText]}>登录</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default FirmLogin

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 14,
  },
  formLable: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  formInput: {
    marginTop: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  fromBr: {
    height: 1,
    backgroundColor: '#1b2134',
    marginTop: 8,
    marginBottom: 24,
  },
  loginBtn: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#0079f6',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    fontSize: 16,
    color: '#fff',
  },
  bottomSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  bottomSwitchText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
  bottomSwitchBr: {
    height: 16,
    width: 1,
    backgroundColor: '#1b2134',
    marginHorizontal: 8,
  },
  authCodeInput: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authCodeBtn: {
    width: 88,
    height: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 121, 246, 0.08);',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authCodeBtnText: {
    fontSize: 12,
    color: '#0079f6',
  },
})
