import { Button } from '@mui/material'
import { useState } from 'react'

import { useAppDispatch } from '../../hooks'

import AddIcon from '@mui/icons-material/Add'
import { createChart } from './chartSlice'
import { ChartForm, ChartFormData } from '../../components/ChartForm'

export const AddChart = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const onSubmit = (data: ChartFormData) => {
    dispatch(createChart(data))
    handleCloseModal()
  }

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
        sx={{ height: '44px' }}
      >
        Add Chart
      </Button>

      <ChartForm
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        title="Add Chart"
        initialValues={{
          name: '',
          type: 'line',
          color: 'blue',
          dataseries: '',
          xAxisName: '',
          yAxisName: '',
          description: ''
        }}
      />
    </>
  )
}
