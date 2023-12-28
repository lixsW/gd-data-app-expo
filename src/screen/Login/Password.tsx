import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextStyle,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Tab } from '@rneui/themed'
import UserLogin from './components/UserLogin'
import FirmLogin from './components/FirmLogin'

const Password: React.FC = () => {
  const [tableIndex, setTableIndex] = React.useState(0)
  const titleStyleHandle = (active: boolean): TextStyle => {
    return active
      ? { color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'left' }
      : { color: 'rgba(255,255,255,0.4)', fontSize: 14, textAlign: 'left' }
  }
  return (
    <View style={[styles.passwordContainer]}>
      {/* tabs */}
      <View style={[styles.tabsBox]}>
        <Tab
          value={tableIndex}
          onChange={setTableIndex}
          dense
          titleStyle={titleStyleHandle}
          indicatorStyle={{
            backgroundColor: '#0079f6',
            width: 24,
            marginLeft: 32,
          }}
        >
          <Tab.Item>个人用户</Tab.Item>
          <Tab.Item>企业用户</Tab.Item>
        </Tab>
      </View>

      {/* 登录表单 */}
      {tableIndex === 0 ? <UserLogin /> : <FirmLogin />}
    </View>
  )
}

export default Password

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  passwordContainer: {
    flex: 1,
    backgroundColor: '#0f1529',
    paddingVertical: 24,
  },
  tabsBox: {
    width: screenWidth / 2 - 10,
  },
})
