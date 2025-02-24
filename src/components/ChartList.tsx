import { Box, Button, List, ListItem, Typography } from '@mui/material'
import { useAppSelector } from '../shared/hooks/hooks'
import { useMemo } from 'react'

import { ChartActions } from './ChartActions'
import { useParams } from 'react-router-dom'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

export const ChartList = () => {
  const isMobile = useIsMobile()
  const { chartId } = useParams()
  const { charts, searchQuery } = useAppSelector(state => state.chart)

  const filteredCharts = useMemo(
    () =>
      charts.filter(({ name }) => name.toLowerCase().includes((searchQuery ?? '').toLowerCase())),
    [charts, searchQuery]
  )

  return (
    <Box
      sx={{ backgroundColor: 'white', flexGrow: 1, overflowY: 'auto', marginTop: isMobile ? 2 : 0 }}
    >
      {charts.length === 0 ? (
        <Typography
          variant="h6"
          fontWeight={500}
          fontSize={20}
          lineHeight={'32px'}
          align="center"
          p={2}
        >
          No charts created yet.
        </Typography>
      ) : (
        <List sx={{ margin: 0, padding: 0 }}>
          {filteredCharts.map(chart => (
            <ListItem disablePadding key={chart.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  position: 'relative'
                }}
              >
                <Button
                  href={`/${chart.id}`}
                  fullWidth
                  sx={{
                    textTransform: 'initial',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: Number(chartId) === chart.id ? '#D7E3FF' : 'inherit',
                    borderRadius: '4px',
                    ':hover': {
                      backgroundColor: '#D7E3FF'
                    }
                  }}
                >
                  <Typography variant="body1" color={'rgba(0, 0, 0, 0.87)'}>
                    {chart.name}
                  </Typography>
                </Button>
                <Box position={'absolute'} top={4} right={16}>
                  <ChartActions chart={chart} />
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
