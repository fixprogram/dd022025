import { Box, createTheme, Paper, Typography, useMediaQuery } from '@mui/material'
import { useAppSelector } from '../hooks'
import { AddChart } from '../features/chart/AddChart'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import charts from '../dataseries.json' with {type: 'json'}
import { DateRangePicker } from './DateRangePicker';
import { useState } from 'react';

export const ChartView = () => {
  const chart = useAppSelector(state => state.chart.activeChart)
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null)

  const theme = createTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (isMobile && !chart) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          gap: 3,
          backgroundColor: 'white'
        }}
      >
        <Typography fontWeight={500}>No charts created yet.</Typography>
        <AddChart />
      </Box>
    )
  }
  if (!chart) {
    return (
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography>No charts created yet</Typography>
          <AddChart />
        </Paper>
      </Box>
    )
  }

  const chartData = charts.find(it => it.name === chart!.dataseries)!
  const initialDates = [chartData!.dataseries[0].date, chartData.dataseries.at(-1)!.date]
  const options: Highcharts.Options = {
    chart: {
      type: chart.type, 
      
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false
    },
    xAxis: {
      type: 'datetime', 
      labels: {
        formatter: function () {
          return Highcharts.dateFormat('%Y-%m-%d', this.value);
        },
      },
    },
    yAxis: {
      title: {
        text: '°C',
      },
    },
    
    series: [charts.find(it => it.name === chart.dataseries)!].map(({dataseries}) => ({
      data: dataseries
        .filter((point) => {
          if(!dateRange) return true
          const date = new Date(point.date);
          return date >= dateRange[0] && date <= dateRange[1];
        })
        .map((point) => ({
          x: new Date(point.date).getTime(), 
          y: point.value,
        })),
        color: chart.color
    })),
    credits: {
      enabled: false, 
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{ maxWidth: 900, width: '100%' }}>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      
    <Typography variant="h6" fontWeight={600} fontSize={24} letterSpacing={.15}>{chart.name}</Typography>

<DateRangePicker initialDates={initialDates} onChange={(v) => setDateRange(v)} />

      </Box>

      <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>

      </Paper>
    </Box>
  )
}
