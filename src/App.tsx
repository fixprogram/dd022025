import {
  AppBar,
  Box,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material'

import { AddChart } from './features/chart/AddChart'
import { SearchChart } from './features/chart/SearchChart'
import { ChartList } from './components/ChartList'
import { useAppSelector } from './hooks'
import { ChartView } from './components/ChartView'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Logo } from './components/Logo'

function App() {
  const searchQuery = useAppSelector(state => state.chart.searchQuery)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const theme = createTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const MobileLayout = () => (
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
            <SearchChart />
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
          <ChartList onSelectChart={toggleMenu} />
          <AddChart />
        </Box>
      ) : (
        <ChartView />
      )}
    </Box>
  )

  const DesktopLayout = () => (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <ChartView />
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>{isMobile ? <MobileLayout /> : <DesktopLayout />}</ThemeProvider>
  )
}

export default App

function Sidebar() {
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
      <SearchChart />
      <AddChart />
      {charts.length === 0 ? (
        <Typography align="center" color="secondary">
          No charts
        </Typography>
      ) : (
        <ChartList />
      )}
    </Box>
  )
}
