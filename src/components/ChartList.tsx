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
import { removeChart, selectChart } from '../features/chart/chartSlice'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const ChartList: FC<{ onCloseMenu: VoidFunction }> = ({ onCloseMenu }) => {
  const { charts, activeChart, searchQuery } = useAppSelector(state => state.chart)
  const filteredCharts = useMemo(
    () => charts.filter(({ name }) => name.toLowerCase().includes(searchQuery.toLowerCase())),
    [charts, searchQuery]
  )

  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [contentMenuElId, setContentMenuElId] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  const handleContextMenu = (event: MouseEvent<HTMLElement>, id: number) => {
    event.preventDefault()
    setContextMenuAnchorEl(event.currentTarget)
    setContentMenuElId(id)
  }

  const handleCloseContextMenu = () => {
    setContextMenuAnchorEl(null)
  }

  const handleDeleteChart = () => {
    dispatch(removeChart(contentMenuElId!))
    handleCloseContextMenu()
  }

  return (
    <>
      <Box sx={{ backgroundColor: 'white', height: '100%', overflowY: 'auto' }}>
        {charts.length === 0 ? (
          <Typography align="center" sx={{ p: 2 }}>
            No charts created yet.
          </Typography>
        ) : (
          <List sx={{ marginTop: 2 }}>
            {filteredCharts.map(({ id, name }) => (
              <ListItem disablePadding key={id}>
                <ListItemButton
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: activeChart?.id === id ? '#D7E3FF' : 'inherit',
                    borderRadius: '4px'
                  }}
                  onClick={() => {
                    dispatch(selectChart(id))

                    onCloseMenu()
                  }}
                >
                  <Typography variant="h6">{name}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="actions"
                    onClick={e => {
                      e.stopPropagation()
                      handleContextMenu(e, id)
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Menu
        anchorEl={contextMenuAnchorEl}
        open={Boolean(contextMenuAnchorEl)}
        onClose={handleCloseContextMenu}
      >
        <MenuItem onClick={() => {}}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteChart}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
