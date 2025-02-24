import { useAppDispatch } from '@/shared/hooks/hooks'
import { Chart, removeChart } from '../chartSlice'
import { useNavigate } from 'react-router-dom'

export const useDelete = (chart: Chart) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(removeChart(chart.id))
    navigate('/')
  }

  return { handleDelete }
}
