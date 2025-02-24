import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import type { FC, MouseEvent } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Chart } from '../features/chartSlice'
import { useEdit } from '@/features/edit'
import { ChartForm } from './ChartForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDelete } from '@/features/delete'

export const ChartActions: FC<{ chart: Chart }> = ({ chart }) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
  }

  const { modalOpen, handleEdit, handleOpenModal, handleCloseModal } = useEdit(
    chart,
    handleCloseMenu
  )
  const { handleDelete } = useDelete(chart)

  return (
    <Box>
      <IconButton edge="end" aria-label="actions" onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
        <MenuItem
          onClick={handleOpenModal}
          sx={{
            m: '0px 8px',
            borderRadius: '4px',
            ':hover': { backgroundColor: 'rgba(215, 227, 255, 1)' }
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1, color: '#515B60' }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDelete}
          sx={{
            m: '0px 8px',
            borderRadius: '4px',
            ':hover': { backgroundColor: 'rgba(215, 227, 255, 1)' }
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: '#515B60' }} />
          Delete
        </MenuItem>
      </Menu>

      {modalOpen ? (
        <ChartForm
          open={true}
          onClose={handleCloseModal}
          onSubmit={handleEdit}
          title="Edit Chart"
          initialValues={{ ...chart }}
        />
      ) : null}
    </Box>
  )
}
