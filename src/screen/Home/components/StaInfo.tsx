import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import useFetch from "../../../api/useFetch";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Chart from "../../../components/Charts";
import { EChartsOption } from "echarts";

// type RootStackParamList = {
//   StaInfo: { stationNum: string }
// }

// type StaInfoScreenRouteProp = RouteProp<RootStackParamList, 'StaInfo'>

// type StaInfoScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'StaInfo'
// >

// type Props = {
//   route: StaInfoScreenRouteProp
//   navigation: StaInfoScreenNavigationProp
// }
const StaInfo: React.FC = (props: any) => {
  interface StationInfoType {
    alarmCount: number;
    conversionEfficiency: number;
    stationSOC: string;
    stationSOH: string;
    status: number;
    statusText: string;
  }

  const [stationInfo, setStationInfo] = useState<StationInfoType>({
    alarmCount: 0,
    conversionEfficiency: 0.0,
    stationSOC: "",
    stationSOH: "",
    status: 0,
    statusText: "--",
  });

  const [effiOptions, setEffiOptions] = useState<EChartsOption>();
  const [socOptions, setSocOptions] = useState<EChartsOption>();
  const [sohOptions, setSohOptions] = useState<EChartsOption>();

  const [loading, setLoading] = useState<boolean>(false);

  // 创建图表option
  const createOptions = (val: number, color: string): EChartsOption => {
    return {
      series: [
        {
          type: "pie",
          emphasis: {
            scale: false, // 设置为 false 禁用饼图的放大效果
            // 可以针对其他需要的样式调整在这里配置
          },
          radius: "100%",
          data: [
            {
              value: val,
              name: "Search Engine",
              itemStyle: {
                color,
              },
              labelLine: {
                show: false,
              },
            },
            {
              value: 100 - val,
              name: "Search Engine",
              itemStyle: {
                color: "rgba(0, 255, 0, 0)",
              },
            },
          ],
        },
      ],
    };
  };

  // 单站详情
  useEffect(() => {
    setLoading(true);
    const stationCode = props.route.params.stationNum;
    const apiUrl = `http://211.140.29.44:9999/prod-api/dataaccess/mobile/station/${stationCode}`;
    useFetch(apiUrl, {
      method: "GET",
    }).then((res: any) => {
      setStationInfo(res.data);
      setLoading(false);
    });
  }, []);

  //
  useEffect(() => {
    //设置options
    setEffiOptions(createOptions(stationInfo.conversionEfficiency, "#a956fc"));
    setSocOptions(createOptions(parseFloat(stationInfo.stationSOC), "#08ef8b"));
    setSohOptions(createOptions(parseFloat(stationInfo.stationSOH), "#fca33e"));
  }, [stationInfo]);

  return (
    <View style={[styles.staInfoContainer]}>
      <View style={[styles.top]}>
        <Text style={[styles.tit]}>投运日期</Text>
        <Text style={[styles.val]}>2023-06-11</Text>
        <Text style={[styles.tit, { marginLeft: 32 }]}>运行天数(天)</Text>
        <Text style={[styles.val]}>58</Text>
      </View>

      <View style={[styles.mainBox]}>
        <View style={[styles.itemBox]}>
          <Image
            style={[styles.image]}
            source={require("./images/state.png")}
          ></Image>
          <View>
            <Text style={[styles.itemBoxVal]}>
              {stationInfo.statusText || "--"}
            </Text>
            <Text style={[styles.itemBoxTit]}>状态</Text>
          </View>
        </View>

        <View style={[styles.itemBox, { marginLeft: 16 }]}>
          <View style={[styles.chartBack]}>
            {/* echarts 图表 */}
            <Chart
              option={effiOptions as EChartsOption}
              style={{ width: 32, height: 32 }}
            />
          </View>
          <View>
            <Text style={[styles.itemBoxVal]}>
              {stationInfo.conversionEfficiency || "0.0"}%
            </Text>
            <Text style={[styles.itemBoxTit]}>转换效率</Text>
          </View>
        </View>
        <View style={[styles.itemBox]}>
          <View style={[styles.chartBack, { borderColor: "#08ef8b" }]}>
            {/* echarts 图表 */}
            <Chart
              option={socOptions as EChartsOption}
              style={{ width: 32, height: 32 }}
            />
          </View>
          <View>
            <Text style={[styles.itemBoxVal]}>
              {stationInfo.stationSOC || "0.0"}%
            </Text>
            <Text style={[styles.itemBoxTit]}>SOC</Text>
          </View>
        </View>
        <View style={[styles.itemBox, { marginLeft: 16 }]}>
          <View style={[styles.chartBack, { borderColor: "#fca33e" }]}>
            {/* echarts 图表 */}
            <Chart
              option={sohOptions as EChartsOption}
              style={{ width: 32, height: 32 }}
            />
          </View>
          <View>
            <Text style={[styles.itemBoxVal]}>
              {stationInfo.stationSOH || "0.0"}%
            </Text>
            <Text style={[styles.itemBoxTit]}>SOH</Text>
          </View>
        </View>

        <View style={[styles.itemBox]}>
          {stationInfo.alarmCount > 0 ? (
            <View style={[styles.chartBack, { borderColor: "#ff4718" }]}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require("./images/alarm.png")}
              ></Image>
            </View>
          ) : (
            <View style={[styles.chartBack, { borderColor: "#08ef8b" }]}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require("./images/noAlarm.png")}
              ></Image>
            </View>
          )}

          <View>
            <Text style={[styles.itemBoxVal]}>
              {stationInfo.alarmCount || "0"}
            </Text>
            <Text style={[styles.itemBoxTit]}>告警</Text>
          </View>
        </View>
        {/* <View style={[styles.itemBox, { marginLeft: 16 }]}>
           
            <View>
              <Text style={[styles.itemBoxVal]}>18</Text>
              <Text style={[styles.itemBoxTit]}>告警</Text>
            </View>
          </View> */}
      </View>
    </View>
  );
};

export default StaInfo;

const ScreenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  staInfoContainer: {
    paddingTop: 18,
    flex: 1,
    backgroundColor: "#181f39",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  tit: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  val: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginLeft: 8,
  },
  mainBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  itemBox: {
    width: (ScreenWidth - 64 - 16) / 2,
    height: 80,
    backgroundColor: "#202848",
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  itemBoxVal: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 16,
  },
  itemBoxTit: {
    color: "rgba(255,255,2555,0.4)",
    fontSize: 12,
    marginTop: 8,
  },
  chartBack: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: "#a956fc",
    borderRadius: 50,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
