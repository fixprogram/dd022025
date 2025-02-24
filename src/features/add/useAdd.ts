import { ChartFormData } from '@/components/ChartForm'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { useState } from 'react'
import { createChart } from '../chartSlice'

export const useAdd = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const handleAdd = (data: ChartFormData) => {
    dispatch(createChart(data))
    handleCloseModal()
  }

  return { modalOpen, handleOpenModal, handleCloseModal, handleAdd }
}
