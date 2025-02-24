import { Add } from '@/features/add'
import { useAppSelector } from '@/shared/hooks/hooks'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { Box, Typography, Paper } from '@mui/material'

export const Home = () => {
  const isMobile = useIsMobile()
  const charts = useAppSelector(state => state.chart.charts)

  if (charts.length === 0) {
    if (isMobile)
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
          Choose a chart or add a new one
        </Typography>
        <Add />
      </Paper>
    </Box>
  )
}
