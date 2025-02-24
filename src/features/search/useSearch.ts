import { useCallback, ChangeEvent } from 'react'
import { searchChart } from '../chartSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'

export const useSearch = () => {
  const searchQuery = useAppSelector(state => state.chart.searchQuery)
  const dispatch = useAppDispatch()

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(searchChart(event.target.value))
    },
    [dispatch]
  )

  const handleOpenSearch = () => {
    dispatch(searchChart('')) // It'll shrink the logo
  }

  const handleCloseSearch = () => {
    dispatch(searchChart(null))
  }

  return { searchQuery, handleSearch, handleOpenSearch, handleCloseSearch }
}
