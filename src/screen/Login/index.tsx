import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { CheckBox } from '@rneui/themed'
import { StackScreenProps } from '@react-navigation/stack'

type LoginScreenprops = StackScreenProps<Record<string, object>, 'Login'>

const Login: React.FC<LoginScreenprops> = ({ navigation }) => {
  const [tipChecked, setTipChecked] = useState<boolean>(false)

  const loginPressHandle = () => {
    if (!tipChecked) {
      Alert.alert(
        '温馨提示',
        '阅读并同意我们的服务协议与隐私条款以及个人信息保护指引',
        [
          {
            text: '不同意',
            onPress: () => {},
          },
          {
            text: '同意',
            onPress: toLogin,
          },
        ]
      )
    } else {
      toLogin()
    }
  }

  // 跳转到账号密码登录页面
  const toLogin = () => {
    navigation.navigate('Password', {})
  }
  return (
    <View style={[styles.loginContainer]}>
      {/* log0 */}
      <Image
        style={[styles.logoImage]}
        source={require('./image/logo.png')}
      ></Image>
      <Text style={[styles.titleText]}>欢迎登录BMS+平台</Text>
      <TouchableOpacity style={{ width: '100%' }}>
        <View style={[styles.btns, styles.primaryBtn]}>
          <Text style={[styles.btnsText]}>手机号一键登录</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '100%' }} onPress={loginPressHandle}>
        <View style={[styles.btns]}>
          <Text style={[styles.btnsText]}>账号密码登录</Text>
        </View>
      </TouchableOpacity>

      {/* tips */}
      <View style={[styles.tipContainer]}>
        <CheckBox
          checked={tipChecked}
          onPress={() => setTipChecked(!tipChecked)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{ backgroundColor: '#0f1529' }}
          size={14}
        ></CheckBox>
        <Text style={[styles.tipText]}>
          阅读并同意我们的
          <Text style={[styles.priText]}>“服务协议与隐私条数”</Text>以及
          <Text style={[styles.priText]}>“个人信息保护指引”</Text>
        </Text>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#0f1529',
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoImage: {
    width: 64,
    height: 64,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 40,
  },
  btns: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181f39',
  },
  btnsText: {
    color: '#fff',
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: '#0079f6',
    marginBottom: 16,
  },
  tipContainer: {
    width: 228,
    marginTop: 'auto',
    marginBottom: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    color: '#fff',
    fontSize: 12,
  },
  priText: {
    color: 'rgba(0, 121, 246, 1)',
  },
})
