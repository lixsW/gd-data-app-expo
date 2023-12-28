import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import './src/utils/Storage'
import store from '@/store/index'
import Root from '@/Root'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  )
}
