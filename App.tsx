import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabBar from "./src/routers";
import "./src/utils/Storage.ts";
import Constants from "expo-constants";

export default function App() {
  storage.save({
    key: "token",
    data: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6IumrmOeJueeUteWtkCIsImNvbXBhbnljb2RlIjoiZ29sZCIsInRlbmFudGlkIjo5OTk5LCJkc2tleSI6Im1hc3RlciIsInBsYXRmb3JtdXNlcmlkIjoxLCJwbGF0Zm9ybXVzZXJuYW1lIjoiYWRtaW4iLCJwZXJtaXNzaW9uc1JlZGlzS2V5IjoicGVybWlzc2lvbjoxIiwicm9sZXMiOlsiYWRtaW4iXSwidG9rZW5SZWRpc0tleSI6ImxvZ2luX3Rva2VuczplYjlmNGE5MS03MWRkLTQyNjYtYWM0OS0zNTliY2RmYjJhYTYifQ.jwaV4zpsR2T8qlKuFPZsnK1jQgkyaYgU2AJIEH94to2-kL2gouQ1DYLiuYkTppfZm9EzK_Aa_r8VKQLbMEiFlQ",
  });

  return (
    <SafeAreaView
      style={[
        styles.app,
        {
          paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
        },
      ]}
    >
      {/* 状态条 */}
      <StatusBar
        translucent={true}
        networkActivityIndicatorVisible={true}
        animated={true}
        barStyle={"light-content"}
        backgroundColor={"#0f1529"}
      />
      <NavigationContainer>
        <BottomTabBar />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0f1529",
  },
});
