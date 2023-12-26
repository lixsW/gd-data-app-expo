import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import globalStyles from "../../assets/styles/index";
import { EChartsOption } from "echarts";
import useFetch from "../../api/useFetch";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StaInfo from "./components/StaInfo";
import dayjs from "dayjs";
import Chart from "../../components/Charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("window").width;

const currentPlatform = Platform.OS;

const Home: React.FC = () => {
  const insets = useSafeAreaInsets();
  //收益指标展示数据
  interface EarningsDataType {
    totalEarnings: number;
    totalEarningsUnit: string;
    yesterdayEarnings: number;
    yesterdayEarningsUnit: string;
  }

  const [earningsData, setEarningsData] = useState<EarningsDataType>({
    totalEarnings: 0,
    totalEarningsUnit: "元",
    yesterdayEarnings: 0,
    yesterdayEarningsUnit: "元",
  });

  interface stationItem {
    id: string;
    name: string;
    stationNum: string;
  }

  const [timeOption, setTimeOption] = useState<
    { name: string; value: number }[]
  >([
    {
      name: "近7日",
      value: 0,
    },
    {
      name: "当月",
      value: 1,
    },
    {
      name: "当年",
      value: 2,
    },
  ]);
  const [timeChoose, setTimeChoose] = useState<number>(0);
  const [stationList, setStationList] = useState<stationItem[]>([]);

  type earnParamsType = {
    [key: string]: string;
    startTime: string;
    endTime: string;
  };
  const [earnParams, setEarnParams] = useState<earnParamsType>({
    startTime: dayjs()
      .add(-7, "day")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
  });

  type EarnItem = {
    earnings: number;
    time: string;
  };
  type EarnCurveDataType = {
    [key: string]: EarnItem[];
    chargingPile: EarnItem[];
    demand: EarnItem[];
    dsdResponse: EarnItem[];
    peakShavingValleyFilling: EarnItem[];
    photovoltaic: EarnItem[];
  };
  const [earningsCurveData, setEarningsCurveData] = useState<EarnCurveDataType>(
    {
      chargingPile: [],
      demand: [],
      dsdResponse: [],
      peakShavingValleyFilling: [],
      photovoltaic: [],
    }
  );

  type chartNameMapType = {
    [key: string]: string;
    demand: string;
    dsdResponse: string;
    peakShavingValleyFilling: string;
    photovoltaic: string;
    chargingPile: string;
  };
  // 曲线名称map
  const [chartNameMap] = useState<chartNameMapType>({
    demand: "需量",
    dsdResponse: "需求测响应",
    peakShavingValleyFilling: "削峰填谷",
    photovoltaic: "光伏",
    chargingPile: "充电桩",
  });

  // 曲线options
  const [option, setOption] = useState<EChartsOption>();

  // 总览数据
  interface OverviewDataType {
    conversionEfficiency: number;
    stationSum: number;
    sumsChaElec: number;
    sumsChaElecUnit: string;
    sumsDisChaElec: number;
    sumsDisChaElecUnit: string;
    todayChaElec: number;
    todayChaElecUnit: string;
    todayDisChaElec: number;
    todayDisChaElecUnit: string;
    totalInstalledCapacity: number;
    totalInstalledCapacityUnit: string;
    totalInstalledPower: number;
    totalInstalledPowerUnit: string;
  }

  const [overview, setOverview] = useState<OverviewDataType>({
    conversionEfficiency: 0,
    stationSum: 0,
    sumsChaElec: 0,
    sumsChaElecUnit: "",
    sumsDisChaElec: 0,
    sumsDisChaElecUnit: "",
    todayChaElec: 0,
    todayChaElecUnit: "",
    todayDisChaElec: 0,
    todayDisChaElecUnit: "",
    totalInstalledCapacity: 0,
    totalInstalledCapacityUnit: "",
    totalInstalledPower: 0,
    totalInstalledPowerUnit: "",
  });

  const timeChoosePress = (item: { name: string; value: number }) => {
    console.log(item);
    setTimeChoose(item.value);
    //调用api
    switch (item.value) {
      case 0:
        setEarnParams({
          startTime: dayjs()
            .add(-7, "day")
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          endTime: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
        });
        break;

      case 1:
        setEarnParams({
          startTime: dayjs().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
          endTime: dayjs().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
        });
        break;

      case 2:
        setEarnParams({
          startTime: dayjs().startOf("year").format("YYYY-MM-DD HH:mm:ss"),
          endTime: dayjs().endOf("year").format("YYYY-MM-DD HH:mm:ss"),
        });
        break;
    }
  };

  // 重新生成options
  useEffect(() => {
    const XData = earningsCurveData.peakShavingValleyFilling.map(
      (item) => item.time
    );

    let seriesData = [];

    let earningsCurveDataTem: { key: string; value: EarnItem[] }[] = [];

    for (let key in earningsCurveData) {
      earningsCurveDataTem = [
        ...earningsCurveDataTem,
        { key, value: earningsCurveData[key] },
      ];
    }

    seriesData = earningsCurveDataTem.map((item) => {
      if (!item.value || item.value.length === 0) {
        return;
      }
      return {
        name: chartNameMap[item.key],
        data: item.value.map((el) => el.earnings),
        type: "line",
        symbolSize: 0,
        smooth: true,
      };
    });

    const option: EChartsOption = {
      legend: {
        textStyle: {
          fontSize: 12,
          color: "rgba(255,255,255,.4)",
        },
        icon: "roundRect",
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 27,
        bottom: 24,
      },
      xAxis: {
        type: "category",
        data: XData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "rgba(255,255,255,.4)",
          fontSize: 10,
          formatter: (val) => {
            return val.slice(5, 16).trim();
          },
        },
      },
      tooltip: {
        show: true,
        trigger: "axis", // 触发类型，可选值：'axis', 'item'
        axisPointer: {
          type: "cross",
          lineStyle: {
            color: "rgba(255,255,255,.4)",
            type: "dashed",
          },
          label: {
            backgroundColor: "#202848",
            borderRadius: 4,
            color: "rgba(255,255,255,.8)",
          },
        },
        backgroundColor: "#202848",
        textStyle: {
          color: "rgba(255,255,255,.8)",
        },
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj: any = { top: 110 };
          obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        },
      },
      yAxis: {
        type: "value",
        name: "收益（元）",
        nameTextStyle: {
          color: "rgba(255,255,255,.4)",
          fontSize: 10,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "rgba(255,255,255,.4)",
          fontSize: 10,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.1)",
          },
        },
      },
      grid: {
        top: "12%",
        left: "1%",
        containLabel: true,
      },
      series: seriesData as EChartsOption["series"],
    };
    setOption(option);
  }, [earningsCurveData]);

  // 调用收益曲线接口
  useEffect(() => {
    const apiUrl =
      "http://211.140.29.44:9999/prod-api/dataaccess/mobile/earningsCurve";

    const queryString = Object.keys(earnParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(earnParams[key])}`
      )
      .join("&");

    const urlWithParams = `${apiUrl}?${queryString}`;
    useFetch(urlWithParams, {
      method: "Get",
    }).then((res: any) => {
      if (res.code === 200) {
        setEarningsCurveData(res.data);
      }
    });
  }, [earnParams]);

  // 调用收益指标接口
  useEffect(() => {
    const apiUrl =
      "http://211.140.29.44:9999/prod-api/dataaccess/mobile/earnings";
    useFetch(apiUrl, {
      method: "GET",
    }).then((res: any) => {
      setEarningsData(res.data);
    });
  }, []);

  // 调用站总统计基本信息接口
  useEffect(() => {
    interface ResDataType {
      code: number;
      msg: string;
      data: OverviewDataType;
    }
    const apiUrl =
      "http://211.140.29.44:9999/prod-api/dataaccess/mobile/overview";
    useFetch<ResDataType>(apiUrl, {
      method: "GET",
    }).then((res: ResDataType) => {
      console.log(res);
      setOverview(res.data);
    });
  }, []);

  // 电站列表
  useEffect(() => {
    const apiUrl =
      "http://211.140.29.44:9999/prod-api/dataaccess/station/list?page=1&pageSize=9999";
    useFetch(apiUrl, {
      method: "GET",
    }).then((res: any) => {
      setStationList(res.data.list);
    });
  }, []);

  return (
    <ScrollView
      style={[styles.homeContainer]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity>
        <View style={[styles.totalIncomeBox]}>
          <View style={[styles.totalIncome]}>
            <Text style={styles.totalIncomeTit}>
              总收益（{earningsData.totalEarningsUnit}）
            </Text>
            <Text style={[styles.totalIncomeValue, globalStyles.customFont]}>
              {earningsData.totalEarnings}
            </Text>
            <Image
              style={[styles.totalIncomeImage]}
              source={require("./image/income.png")}
            ></Image>
          </View>

          <View style={[styles.yearIncome]}>
            <Text style={styles.totalIncomeTit}>
              昨日收益（{earningsData.yesterdayEarningsUnit}）
            </Text>
            <Text style={[styles.totalIncomeValue, globalStyles.customFont]}>
              {earningsData.yesterdayEarnings}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 收益指标 */}
      <View style={[styles.incomeIndexContainer]}>
        <View style={[styles.boxTit]}>
          <View style={[styles.tip]}></View>
          <Text style={[styles.titText]}>收益指标</Text>
          <Text style={[styles.timeText]}>2023-06-05 22:21</Text>
        </View>
        <View style={[styles.radioBtnGroupBox]}>
          {timeOption.map((item) => {
            return (
              <TouchableOpacity
                key={item.value}
                style={
                  timeChoose === item.value
                    ? [styles.radioBtn, styles.radioBtnAct]
                    : [styles.radioBtn]
                }
                onPress={() => timeChoosePress(item)}
              >
                <View>
                  <Text style={[styles.radioBtnText, styles.radioBtnTextAct]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 收益图表 */}
        <View style={[styles.incomeChartBox]}>
          <Chart
            option={option as EChartsOption}
            style={{ width: screenWidth - 64, height: 230 }}
          />
        </View>
      </View>

      {/* 电站指标总览 */}
      <View style={[styles.staIndexContainer]}>
        <View style={[styles.top]}>
          <View style={[styles.staCount]}>
            <Image
              style={[styles.staCountImage]}
              source={require("./image/station.png")}
            ></Image>
            <Text style={[styles.staCountText]}>总电站数</Text>
            <Text style={[styles.staCountValue]}>{overview.stationSum}</Text>
            <Image
              style={[styles.ornamentImage]}
              source={require("./image/ornament.png")}
            ></Image>
          </View>
          <View style={[styles.rightIndex]}>
            <View style={[styles.itemIndex]}>
              <View style={[styles.itemIndexTextBox]}>
                <Text style={[styles.itemIndexTitText]}>
                  总装机功率（{overview.totalInstalledPowerUnit}）
                </Text>
                <Text style={[styles.itemIndexValText]}>
                  {overview.totalInstalledPower}
                </Text>
              </View>
              <View style={[styles.itemIndexIcon]}>
                <Image
                  style={[{ width: 24, height: 24 }]}
                  source={require("./image/power.png")}
                ></Image>
              </View>
            </View>

            <View style={[styles.itemIndex, { marginTop: 16 }]}>
              <View style={[styles.itemIndexTextBox]}>
                <Text style={[styles.itemIndexTitText]}>
                  总装机容量（{overview.totalInstalledCapacityUnit}）
                </Text>
                <Text style={[styles.itemIndexValText]}>
                  {overview.totalInstalledCapacity}
                </Text>
              </View>
              <View
                style={[
                  styles.itemIndexIcon,
                  { backgroundColor: "rgba(255, 152, 99, 0.12);" },
                ]}
              >
                <Image
                  style={[{ width: 24, height: 24 }]}
                  source={require("./image/capacity.png")}
                ></Image>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.staIndexBottom]}>
          <View style={[styles.bottomItem]}>
            <View style={[styles.bottomItemIcon]}>
              <Image
                style={[{ width: 24, height: 24 }]}
                source={require("./image/cha.png")}
              ></Image>
            </View>
            <View style={[styles.bottomItemIndex]}>
              <Text
                allowFontScaling={true}
                style={[styles.bottomItemTitText]}
                numberOfLines={1}
              >
                累计充电量（{overview.sumsChaElecUnit}）
              </Text>
              <Text style={[styles.bottomItemValText]}>
                {overview.sumsChaElec}
              </Text>
            </View>
            <View style={[styles.bottomItemIndex, { borderRightWidth: 0 }]}>
              <Text style={[styles.bottomItemTitText]}>
                今日充电量（{overview.todayChaElecUnit}）
              </Text>
              <Text style={[styles.bottomItemValText]}>
                {overview.todayChaElec}
              </Text>
            </View>
          </View>
          <View style={[styles.bottomItem]}>
            <View
              style={[
                styles.bottomItemIcon,
                { backgroundColor: "rgba(0, 162, 255, 0.12))" },
              ]}
            >
              <Image
                style={[{ width: 24, height: 24 }]}
                source={require("./image/discha.png")}
              ></Image>
            </View>
            <View style={[styles.bottomItemIndex]}>
              <Text style={[styles.bottomItemTitText]}>
                累计放电量（{overview.sumsDisChaElecUnit}）
              </Text>
              <Text style={[styles.bottomItemValText]}>
                {overview.sumsDisChaElec}
              </Text>
            </View>
            <View style={[styles.bottomItemIndex, { borderRightWidth: 0 }]}>
              <Text style={[styles.bottomItemTitText]}>
                今日放电量（{overview.todayDisChaElecUnit}）
              </Text>
              <Text style={[styles.bottomItemValText]}>
                {overview.todayDisChaElec}
              </Text>
            </View>
          </View>
          <View style={[styles.bottomItem, { borderBottomWidth: 0 }]}>
            <View
              style={[
                styles.bottomItemIcon,
                { backgroundColor: "rgba(255, 193, 63, 0.12))" },
              ]}
            >
              <Image
                style={[{ width: 24, height: 24 }]}
                source={require("./image/efficiency.png")}
              ></Image>
            </View>
            <View style={[styles.bottomItemIndex]}>
              <Text style={[styles.bottomItemTitText]}>转化效率（%）</Text>
              <Text style={[styles.bottomItemValText]}>
                {overview.conversionEfficiency}
              </Text>
            </View>
            <View style={[styles.sosBox, { borderRightWidth: 0 }]}>
              <View
                style={[
                  styles.bottomItemIcon,
                  {
                    backgroundColor: "rgba(255, 193, 63, 0.12))",
                    marginRight: 8,
                  },
                ]}
              >
                <Image
                  style={[{ width: 24, height: 24 }]}
                  source={require("./image/safe.png")}
                ></Image>
              </View>
              <View>
                <Text style={[styles.bottomItemTitText]}>SOS指数</Text>
                <Text style={[styles.bottomItemValText]}>安全</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 电站详情 */}
      <View style={[styles.staInfoContainer]}>
        <View style={[styles.boxTit]}>
          <View style={[styles.tip]}></View>
          <Text style={[styles.titText]}>电站详情</Text>
        </View>

        {/* topTabs */}
        <View style={{flex:1}}>
          {stationList.length === 0 ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Tab.Navigator
              screenOptions={{
                swipeEnabled:true,
                animationEnabled: true,
                tabBarActiveTintColor: "red",
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: { width: 0.4 },
                tabBarLabelStyle: {
                  color: "#fff",
                  fontSize: 12,
                },
                tabBarStyle: {
                  backgroundColor: "#181f39",
                  shadowOpacity: 0,
                  elevation: 0,
                },
                tabBarPressOpacity: 0,
                tabBarItemStyle: {
                  width: "auto",
                },
                lazy: true,
                lazyPreloadDistance: 3,
                lazyPlaceholder: () => {
                  return (
                    <View style={{ flex: 1, backgroundColor: "#181f39" }}>
                      <Text style={{ color: "#fff" }}>加载中～</Text>
                    </View>
                  );
                },
              }}

              
            >
              {stationList.map((item) => {
                return (
                  <Tab.Screen
                    name={item.name}
                    component={StaInfo}
                    key={item.id}
                    initialParams={{ stationNum: item.stationNum }}
                    options={{
                      title: item.name,
                    }}
                  />
                );
              })}
            </Tab.Navigator>
          )}
        </View>
      </View>

      {currentPlatform === "android" ? (
        <View style={{ height: 60 }}></View>
      ) : (
        <View style={{ height: 20 }}></View>
      )}
    </ScrollView>
  );
};

export default Home;
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#0f1529",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  totalIncomeBox: {
    height: 120,
    backgroundColor: "#181f39",
    borderRadius: 8,
    padding: 16,
    display: "flex",
    flexDirection: "row",
  },
  totalIncome: {
    width: (screenWidth - 64) / 2,
    backgroundColor: "#0079f6",
    borderRadius: 8,
    padding: 16,
  },
  yearIncome: {
    marginLeft: 12,
    width: (screenWidth - 64 - 12) / 2,
    borderRadius: 8,
    padding: 16,
  },
  totalIncomeTit: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
  },
  totalIncomeValue: {
    color: "#fff",
    fontSize: 28,
    marginTop: 4,
    // fontWeight: '700',
  },
  totalIncomeImage: {
    width: 32,
    height: 32,
    position: "absolute",
    right: 12,
    top: 20,
  },

  incomeIndexContainer: {
    height: 308,
    backgroundColor: "#181f39",
    borderRadius: 8,
    marginTop: 12,
    padding: 16,
  },
  boxTit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tip: {
    width: 3,
    height: 12,
    backgroundColor: "#0079f6",
    borderRadius: 2,
  },
  titText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
  },
  timeText: {
    fontSize: 12,
    marginLeft: "auto",
    color: "rgba(255,255,255,0.4)",
  },
  radioBtnGroupBox: {
    display: "flex",
    flexDirection: "row",
    height: 28,
    backgroundColor: "#111626",
    borderRadius: 2,
    marginTop: 16,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  radioBtn: {
    height: 24,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  radioBtnText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
  },
  radioBtnAct: {
    backgroundColor: "#0079f6",
  },
  radioBtnTextAct: {
    color: "#fff",
  },
  incomeChartBox: {
    flex: 1,
    marginTop: 16,
  },
  staIndexContainer: {
    flex: 1,
    height: 370,
    backgroundColor: "#181f39",
    borderRadius: 8,
    marginTop: 12,
    padding: 16,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  staCount: {
    height: 129,
    width: (screenWidth - 64) / 2 - 30,
    backgroundColor: "rgba(0, 121, 246, 0.1)",
    borderRadius: 8,
    padding: 16,
  },
  rightIndex: {
    flex: 1,
    marginLeft: 12,
  },
  itemIndex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
    justifyContent: "space-between",
  },
  itemIndexTextBox: {
    flex: 1,
  },
  staCountImage: {
    width: 32,
    height: 27,
  },
  staCountText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    marginTop: 12,
  },
  staCountValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  ornamentImage: {
    width: 61,
    height: 52,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  itemIndexTitText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  itemIndexValText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginTop: 8,
  },
  itemIndexIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,246,255,0.12)",
    borderRadius: 8,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  staIndexBottom: {
    marginTop: 10,
  },
  bottomItem: {
    display: "flex",
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    borderBottomColor: "rgba(255,255,255,0.04)",
    borderBottomWidth: 1,
  },
  bottomItemIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(8, 239, 139, 0.12)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomItemIndex: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 24,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.04)",
    height: 40,
  },
  bottomItemTitText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  bottomItemValText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
    marginTop: 8,
  },
  staInfoContainer: {
    flex: 1,
    height: 425,
    backgroundColor: "#181f39",
    borderRadius: 8,
    marginTop: 12,
    padding: 16,
  },
  sosBox: {
    flex: 1,
    paddingLeft: 24,
    flexDirection: "row",
    alignItems: "center",
  },
});
