import { ChartForm } from '@/components/ChartForm'
import { Button } from '@mui/material'
import { useAdd } from './useAdd'
import AddIcon from '@mui/icons-material/Add'

export const Add = () => {
  const { modalOpen, handleAdd, handleOpenModal, handleCloseModal } = useAdd()

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
        onSubmit={handleAdd}
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
