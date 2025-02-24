import { ChartFormData } from '@/components/ChartForm'
import { useState } from 'react'
import { Chart, editChart } from '../chartSlice'
import { useAppDispatch } from '@/shared/hooks/hooks'

export const useEdit = (chart: Chart, closeMenu: VoidFunction) => {
  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    setModalOpen(true)
    closeMenu()
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleEdit = (data: ChartFormData) => {
    dispatch(editChart({ ...data, id: chart.id }))
    setModalOpen(false)
  }

  return { modalOpen, handleEdit, handleOpenModal, handleCloseModal }
}
