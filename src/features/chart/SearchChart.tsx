import { IconButton, Input, InputAdornment, useMediaQuery, useTheme } from '@mui/material'
import { ChangeEvent, useCallback, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector, useClickOutside } from '../../hooks'
import { searchChart } from './chartSlice'

export const SearchChart = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const searchQuery = useAppSelector(state => state.chart.searchQuery)
  const dispatch = useAppDispatch()

  const handleSearchQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(searchChart(event.target.value))
    },
    [dispatch]
  )

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useClickOutside(searchInputRef, () => {
    if (searchQuery === '') {
      dispatch(searchChart(null))
    }
  })

  const handleOpenSearch = () => {
    dispatch(searchChart('')) // It'll shrink the logo
  }

  if (searchQuery === null && isMobile) {
    return (
      <IconButton color="inherit" onClick={handleOpenSearch}>
        <SearchIcon color="secondary" />
      </IconButton>
    )
  }

  return (
    <Input
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      disableUnderline
      ref={searchInputRef}
      fullWidth
      autoFocus={isMobile}
      placeholder="Search…"
      value={searchQuery ?? ''}
      onChange={handleSearchQueryChange}
      sx={{ backgroundColor: 'rgba(0,0,0,.06)', borderRadius: '4px', padding: '4px 8px' }}
    />
  )
}
