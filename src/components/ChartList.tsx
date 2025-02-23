import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useMemo, useState } from 'react'
import type { FC, MouseEvent } from 'react'
import { Chart, editChart, removeChart, selectChart } from '../features/chart/chartSlice'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ChartForm, ChartFormData } from './ChartForm'

export const ChartList: FC<{ onSelectChart?: () => void }> = ({ onSelectChart }) => {
  const [open, setOpen] = useState(false)

  const { charts, activeChart, searchQuery } = useAppSelector(state => state.chart)
  const dispatch = useAppDispatch()

  const filteredCharts = useMemo(
    () =>
      charts.filter(({ name }) => name.toLowerCase().includes((searchQuery ?? '').toLowerCase())),
    [charts, searchQuery]
  )

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
  const [selectedChart, setSelectedChart] = useState<Chart | null>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>, chart: Chart) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
    setSelectedChart(chart)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
  }

  const handleDeleteChart = () => {
    if (selectedChart) {
      dispatch(removeChart(selectedChart.id))
      setSelectedChart(null)
    }
    handleCloseMenu()
  }

  const handleEditChart = () => {
    setOpen(true)
  }

  const handleFormSubmit = (data: ChartFormData) => {
    if (selectedChart) {
      dispatch(editChart({ ...data, id: selectedChart.id }))
      setOpen(false)
    }
  }

  return (
    <>
      <Box sx={{ backgroundColor: 'white', height: '100%', overflowY: 'auto' }}>
        {charts.length === 0 ? (
          <Typography fontWeight={500} fontSize={20} lineHeight={'32px'} align="center" p={2}>
            No charts created yet.
          </Typography>
        ) : (
          <List sx={{ marginTop: 2 }}>
            {filteredCharts.map(chart => (
              <ListItem disablePadding key={chart.id}>
                <ListItemButton
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: activeChart?.id === chart.id ? '#D7E3FF' : 'inherit',
                    borderRadius: '4px',
                    ':hover': {
                      backgroundColor: activeChart?.id === chart.id ? '#D7E3FF' : 'inherit'
                    }
                  }}
                  onClick={() => {
                    dispatch(selectChart(chart.id))
                    onSelectChart?.()
                  }}
                >
                  <Typography variant="h6">{chart.name}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="actions"
                    onClick={e => handleOpenMenu(e, chart)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleEditChart}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteChart}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {selectedChart && open ? (
        <ChartForm
          open={true}
          onClose={() => setSelectedChart(null)}
          onSubmit={handleFormSubmit}
          title="Edit Chart"
          initialValues={{
            name: selectedChart.name,
            type: selectedChart.type,
            color: selectedChart.color,
            dataseries: selectedChart.dataseries,
            xAxisName: selectedChart.xAxisName,
            yAxisName: selectedChart.yAxisName,
            description: selectedChart.description
          }}
        />
      ) : null}
    </>
  )
}
