import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageSourcePropType
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
const Work: React.FC = () => {
  interface MenuType {
    name: string;
    img: string;
    route: string;
    background: string[];
  }
  const [menu] = useState<MenuType[]>([
    {
      name: "实时数据",
      img: require("./image/real.png"),
      background: ["rgba(10, 148, 228, 0.08)", "rgba(36, 200, 233, 0.08)"],
      route: "",
    },
    {
      name: "告警记录",
      img: require("./image/alarm.png"),
      background: ["rgba(252, 163, 62, 0.08)", "rgba(196, 42, 42, 0.08)"],
      route: "",
    },
    {
      name: "收益统计",
      img: require("./image/income.png"),
      background: ["rgba(212, 212, 70, 0.08)", "rgba(84, 210, 54, 0.08)"],
      route: "",
    },
    {
      name: "高级诊断",
      img: require("./image/display.png"),
      background: ["rgba(86, 252, 196, 0.08)", "rgba(29, 127, 213, 0.08)"],

      route: "",
    },
    {
      name: "运维记录",
      img: require("./image/operation.png"),
      background: ["rgba(169, 86, 252, 0.08)", "rgba(29, 127, 213, 0.08)"],

      route: "",
    },
    {
      name: "工单管理",
      img: require("./image/work.png"),
      background: ["rgba(81, 204, 229, 0.08)", "rgba(35, 91, 245, 0.08)"],

      route: "",
    },
    {
      name: "更多期待",
      img: require("./image/more.png"),
      background: ["rgba(24, 31, 57, 1)", "rgba(24, 31, 57, 1)"],

      route: "",
    },
  ]);
  return (
    <View style={[styles.workContainer]}>
      {menu.map((el) => (
        <TouchableOpacity key={el.name}>
          <LinearGradient style={[styles.itemBase]} colors={el.background}>
            <View style={[styles.contentBase]}>
              <Image style={[styles.imageBase]} source={el.img as ImageSourcePropType}></Image>
              <Text style={[styles.textBase]}>{el.name}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Work;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  workContainer: {
    backgroundColor: "#0f1529",
    flex: 1,
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemBase: {
    height: 128,
    width: (screenWidth - 16 * 4) / 3,
    margin: 8,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center'
  },
  imageBase:{
    width:40,
    height:40
  },
  contentBase:{
    justifyContent:'center',
    alignItems:'center'
  },
  textBase:{
    fontSize:12,
    color:'rgba(255,255,255,0.8)',
    marginTop:16
  }
});
