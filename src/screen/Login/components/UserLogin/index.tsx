import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/index'
import { login} from '@/store/features/Login/loginSlice'

const UserLogin: React.FC = () => {
  const dispatch = useAppDispatch()

  interface LoginFormType {
    username: string
    password: string
    smscode: string
  }
  const [bottomSwitch, setBottomSwitch] = useState<number>(0)
  // 登录表单数据
  const [loginForm, setLoginFrom] = useState<LoginFormType>({
    username: '',
    password: '',
    smscode: '',
  })

  //登录回调
  const loginHandle = () => {
    dispatch(login({username:'admin',password:'admin123'}))
  }
  return (
    <View style={[styles.formContainer]}>
      <Text style={[styles.formLable]}>用户名/手机号：</Text>
      <TextInput
        style={[styles.formInput]}
        autoCapitalize="none"
        placeholder="请输入账号"
        placeholderTextColor="rgba(255,255,255,0.4)"
        value={loginForm.username}
        onChangeText={(text) =>
          setLoginFrom((pre) => ({ ...pre, username: text }))
        }
      />
      <View style={[styles.fromBr]}></View>
      {bottomSwitch === 0 ? (
        <>
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
        </>
      ) : (
        <>
          {/*  验证码登录 */}
          <Text style={[styles.formLable]}>短信验证码：</Text>
          <View style={[styles.authCodeInput]}>
            <TextInput
              style={[{ color: 'rgba(255,255,255,0.8)' }]}
              autoCapitalize="none"
              placeholder="请输入验证码"
              placeholderTextColor="rgba(255,255,255,0.4)"
            />
            <TouchableOpacity>
              <View style={[styles.authCodeBtn]}>
                <Text style={[styles.authCodeBtnText]}>获取验证码</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.fromBr]}></View>
        </>
      )}

      <TouchableOpacity onPress={loginHandle}>
        <View style={[styles.loginBtn]}>
          <Text style={[styles.loginBtnText]}>登录</Text>
        </View>
      </TouchableOpacity>

      {/* 密码登录 / 短信登录切换 */}
      <View style={[styles.bottomSwitch]}>
        <TouchableOpacity onPress={() => setBottomSwitch(0)}>
          <Text
            style={[
              styles.bottomSwitchText,
              bottomSwitch === 0 ? { color: 'rgba(255,255,255,0.8)' } : null,
            ]}
          >
            密码登录
          </Text>
        </TouchableOpacity>
        <View style={[styles.bottomSwitchBr]}></View>
        <TouchableOpacity onPress={() => setBottomSwitch(1)}>
          <Text
            style={[
              styles.bottomSwitchText,
              bottomSwitch === 1 ? { color: 'rgba(255,255,255,0.8)' } : null,
            ]}
          >
            短信登录
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserLogin

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
