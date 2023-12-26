import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screen/Home";
import MineScreen from "../screen/Mine";
import WorkScreen from "../screen/Work";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0f1529",
          borderTopWidth: 0,
        },

        headerStyle: {
          height: 44,
          backgroundColor: "#0f1529",
          shadowOpacity: 0, // 去除阴影
          elevation: 0, // 安卓上的阴影
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 17,
          color: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "首页",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Work"
        component={WorkScreen}
        options={{
          headerShown: false,
          title: "工作台",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                name={focused ? "grid" : "grid-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MineStacks"
        component={MineScreen}
        options={{
          headerShown: false,
          title: "我的",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Icon
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
