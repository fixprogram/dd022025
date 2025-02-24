import { Box, Paper, Typography } from '@mui/material'
import { Add } from '../features/add'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DateRangePicker } from './DateRangePicker'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { useChartConfig } from '@/shared/hooks/useChartConfig'
import { NotFound } from './NotFound'

export const ChartView = () => {
  const isMobile = useIsMobile()

  const chart = useChartConfig()

  if (!chart) return <NotFound />

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
          backgroundColor: 'rgb(250,250,250)'
        }}
      >
        <Typography variant="h6" fontWeight={500} fontSize={20} lineHeight={'32px'}>
          No charts created yet.
        </Typography>
        <Add />
      </Box>
    )
  }
  if (!chart) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          sx={{
            m: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            gap: 3,
            backgroundColor: 'white',
            boxShadow: '0px 0px 0px 1px #E0E0E0'
          }}
        >
          <Typography variant="h6" fontWeight={500} fontSize={20} lineHeight={'32px'}>
            No charts created yet.
          </Typography>
          <Add />
        </Paper>
      </Box>
    )
  }

  const { options, initialDates, setDateRange, name, description } = chart

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 0px 0px 1px #E0E0E0'
        }}
      >
        <Box maxWidth={900} width={'100%'}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
            <Typography variant="h6" fontWeight={600} fontSize={24} letterSpacing={0.15}>
              {name}
            </Typography>

            <DateRangePicker initialDates={initialDates} onChange={setDateRange} />
          </Box>

          <HighchartsReact highcharts={Highcharts} options={options} />

          {description.length ? (
            <Typography align="center" marginTop={3}>
              {description}
            </Typography>
          ) : null}
        </Box>
      </Paper>
    </Box>
  )
}
