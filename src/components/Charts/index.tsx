import { StyleSheet, Text, View } from 'react-native'
import { EChartsOption } from 'echarts'
import React, { useRef, useState, useEffect } from 'react'
import * as echarts from 'echarts/core'
import { LineChart, BarChart ,PieChart} from 'echarts/charts'
import { SVGRenderer, SkiaChart, SvgChart } from '@wuba/react-native-echarts'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'

echarts.use([
  SVGRenderer,
  LineChart,
  LegendComponent,
  GridComponent,
  TooltipComponent,
  PieChart
])

interface EchartsProps {
  option: EChartsOption
  style: { width: number; height: number }
}

const Charts: React.FC<EchartsProps> = ({ option, style }) => {
  const echartsRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  )

  useEffect(() => {
    if (echartsRef.current && !chartInstance) {
      const newChartInstance = echarts.init(echartsRef.current, 'light', {
        renderer: 'svg',
        width: style.width,
        height: style.height,
      })
      setChartInstance(newChartInstance)
    }
    // 在组件卸载时销毁 ECharts 实例
    return () => {
      if (chartInstance) {
        chartInstance.dispose()
        setChartInstance(null)
      }
    }
  }, [])

  useEffect(() => {
    if (chartInstance) {
      // 将配置项设置到 ECharts 实例中
      chartInstance.setOption(option)
    }
  }, [option])

  return <SvgChart ref={echartsRef} />
}

export default Charts

const styles = StyleSheet.create({})
