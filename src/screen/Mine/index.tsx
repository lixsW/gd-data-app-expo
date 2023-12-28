import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ImageSourcePropType,
  Button,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useAppDispatch } from '@/hooks/index'

import { logout } from '@/store/features/Login/loginSlice'

const Mine: React.FC = () => {
  const dispatch = useAppDispatch()

  interface MenusType {
    name: string
    icon: string
    route: string
  }
  const [menus] = useState<MenusType[]>([
    { name: '账号管理', icon: require('./image/accicon.png'), route: '' },
    { name: '企业管理', icon: require('./image/firmicon.png'), route: '' },
    { name: '运维记录', icon: require('./image/opicon.png'), route: '' },
    { name: '工单记录', icon: require('./image/workicon.png'), route: '' },
  ])

  const renderItem = ({ item }: { item: MenusType }) => {
    return (
      <TouchableOpacity style={[styles.menuListBase]}>
        <View style={[styles.renderItem]}>
          <Image
            style={{ width: 20, height: 20, marginRight: 12 }}
            source={item.icon as ImageSourcePropType}
          ></Image>
          <Text style={[styles.menuListText]}>{item.name}</Text>
          <Icon
            style={{ marginLeft: 'auto' }}
            size={20}
            name="chevron-forward-outline"
            color="rgba(255,255,255,0.6)"
          />
        </View>
      </TouchableOpacity>
    )
  }

  const logoutHandle = () => {
    Alert.alert('提示', '确认退出当前账号', [
      {
        text: '取消',
        onPress: () => {},
      },
      {
        text: '确定',
        onPress: () => dispatch(logout()),
      },
    ])
  }
  return (
    <View style={[styles.mineContainer]}>
      <View style={[styles.userCard]}>
        <TouchableOpacity>
          <View style={[styles.userCardTop]}>
            <Image
              style={[styles.avatar]}
              source={require('./image/avatar.png')}
            />
            <View>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                Devding
              </Text>
              <Text style={[styles.phoneBase]}>173****9016</Text>
              <ImageBackground
                source={require('./image/tipback.png')} // 背景图片的 URI 或本地资源
                style={styles.userTip}
              >
                <View>
                  <Text style={[styles.userTipText]}>个人用户</Text>
                </View>
              </ImageBackground>
            </View>
            {/* icon */}
            <Icon
              style={{ marginLeft: 'auto' }}
              size={20}
              name="chevron-forward-outline"
              color="rgba(255,255,255,0.6)"
            />
          </View>
        </TouchableOpacity>

        <View style={[styles.userCardBottom]}>
          <Text style={[styles.bottomTit]}>所属企业：</Text>
          <Text style={[styles.bottomVal]}>杭州高特电子设备股份有限公司</Text>
        </View>
      </View>

      {/* 操作列表 */}
      <View style={[styles.flatListContainer]}>
        <FlatList
          data={menus} // 数据源
          renderItem={renderItem} // 渲染每一行的函数
          keyExtractor={(item) => item.name} // 提供给FlatList用来识别各个列表项的关键
        ></FlatList>
      </View>

      {/* 退出登陆按钮 */}
      <TouchableOpacity onPress={logoutHandle}>
        <View style={[styles.outBtn]}>
          <Text style={[styles.outBtnText]}>退出登录</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Mine

const styles = StyleSheet.create({
  mineContainer: {
    flex: 1,
    backgroundColor: '#0f1529',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userCard: {
    backgroundColor: '#181f39',
    borderRadius: 8,
    height: 156,
    padding: 8,
  },
  userCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 88,
    height: 88,
  },
  phoneBase: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginVertical: 2,
  },
  userTip: {
    width: 48,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTipText: {
    fontSize: 8,
    color: '#fff',
  },
  userCardBottom: {
    height: 36,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 121, 246, 0.08)',
    marginHorizontal: 8,
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bottomTit: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
  bottomVal: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 8,
  },
  menuListBase: {
    height: 56,
    backgroundColor: '#181f39',
    justifyContent: 'center',
  },
  menuListText: {
    color: '#fff',
    fontSize: 14,
  },
  flatListContainer: {
    backgroundColor: '#181f39',
    marginTop: 12,
    borderRadius: 8,
    padding: 16,
  },
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outBtn: {
    height: 48,
    backgroundColor: '#181f39',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  outBtnText: {
    color: '#fff',
    fontSize: 16,
  },
})
