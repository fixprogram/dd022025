import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { useSearch } from './useSearch'
import { useRef } from 'react'
import { IconButton, Input, InputAdornment } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import { useClickOutside } from '@/shared/hooks/useClickOutside'

export const Search = () => {
  const isMobile = useIsMobile()

  const { searchQuery, handleOpenSearch, handleCloseSearch, handleSearch } = useSearch()

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useClickOutside(searchInputRef, () => {
    if (searchQuery === '') handleCloseSearch()
  })

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
      onChange={handleSearch}
      sx={{ backgroundColor: 'rgba(0,0,0,.06)', borderRadius: '4px', padding: '4px 8px' }}
    />
  )
}
