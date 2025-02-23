import { useAppSelector } from '../hooks'
import data from '../dataseries.json' with { type: 'json' }
import Highcharts from 'highcharts'
import { useState } from 'react'
import { normalizeDate } from '../utils'

const chartTitleStyle = {
  fontFamily: 'Roboto',
  fontWeight: '700',
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.15
}

export const useChartConfig = () => {
  const activeChart = useAppSelector(state => state.chart.activeChart)
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null)

  if (!activeChart) return null

  const { dataseries } = data.find(({ name }) => name === activeChart.dataseries)!
  const initialDates: [Date, Date] = [
    new Date(dataseries[0].date),
    new Date(dataseries.at(-1)!.date)
  ]

  const options: Highcharts.Options = {
    chart: {
      type: activeChart.type
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false
    },
    xAxis: {
      title: {
        text: activeChart.xAxisName.length ? activeChart.xAxisName : 'dates',
        style: chartTitleStyle
      },
      type: 'datetime',
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%Y-%m-%d', this.value as number)
        }
      }
    },
    yAxis: {
      title: {
        text: activeChart.yAxisName.length ? activeChart.yAxisName : '°C',
        style: chartTitleStyle
      }
    },
    series: [
      {
        data: dataseries
          .filter(({ date }) => {
            if (!dateRange) return true

            const pointDate = normalizeDate(new Date(date))
            const startDate = normalizeDate(dateRange[0])
            const endDate = normalizeDate(dateRange[1])

            return pointDate >= startDate && pointDate <= endDate
          })
          .map(({ date, value }) => ({
            x: new Date(date).getTime(),
            y: value
          })),
        color: activeChart.color,
        type: activeChart.type
      }
    ],
    credits: {
      enabled: false
    }
  }

  return { initialDates, options, setDateRange, ...activeChart }
}
