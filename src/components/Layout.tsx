import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { Add } from '../features/add'
import { ChartList } from './ChartList'
import { Logo } from './Logo'
import { useAppSelector } from '../shared/hooks/hooks'
import { FC, ReactNode, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { Search } from '@/features/search'

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile()

  if (isMobile) return <MobileLayout>{children}</MobileLayout>

  return <DesktopLayout>{children}</DesktopLayout>
}

const MobileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const searchQuery = useAppSelector(state => state.chart.searchQuery)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        paddingBottom: 3,
        backgroundColor: '#FAFAFA'
      }}
    >
      <AppBar
        position="static"
        sx={{ background: 'white', boxShadow: 0, borderBottom: '1px solid #E0E0E0' }}
      >
        <Toolbar sx={{ display: 'flex' }}>
          <Logo isFull={searchQuery === null} />

          <Box display={'flex'} gap={2} flexGrow={1} justifyContent={'flex-end'}>
            <Search />
            <IconButton edge="start" color="secondary" onClick={toggleMenu} aria-label="menu">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {isMenuOpen ? (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            backgroundColor: 'white',
            paddingX: 2
          }}
        >
          <ChartList />
          <Add />
        </Box>
      ) : (
        children
      )}
    </Box>
  )
}

const DesktopLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      {children}
    </Box>
  )
}

const Sidebar = () => {
  const charts = useAppSelector(state => state.chart.charts)

  return (
    <Box
      sx={{
        width: '256px',
        paddingY: 4,
        paddingX: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid rgba(0, 0, 0, .12)',
        backgroundColor: 'white'
      }}
    >
      <Logo />
      <Search />
      <Add />
      {charts.length === 0 ? (
        <Typography variant="body1" align="center" color="secondary">
          No charts
        </Typography>
      ) : (
        <ChartList />
      )}
    </Box>
  )
}
