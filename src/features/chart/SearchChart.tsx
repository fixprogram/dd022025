import { createTheme, IconButton, Input, InputAdornment, useMediaQuery } from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { searchChart } from './chartSlice'

export const SearchChart = () => {
  const theme = createTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [searchActive, setSearchActive] = useState(!isMobile)
  const searchQuery = useAppSelector(state => state.chart.searchQuery)
  const dispatch = useAppDispatch()

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchChart(event.target.value))
  }

  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchActive) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          searchInputRef.current &&
          !searchInputRef.current.contains(event.target) &&
          searchQuery === ''
        ) {
          setSearchActive(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [searchActive, searchInputRef, searchQuery])

  if (!searchActive) {
    return (
      <IconButton color="inherit" onClick={() => setSearchActive(true)}>
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
      autoFocus
      placeholder="Search…"
      value={searchQuery}
      onChange={handleSearchQueryChange}
      sx={{ backgroundColor: 'rgba(0,0,0,.06)', borderRadius: '4px', padding: '4px 8px' }}
    />
  )
}
