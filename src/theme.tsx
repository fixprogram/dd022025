import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  palette: {
    background: {
      default: '#FAFAFA'
    },
    primary: {
      main: '#005CBB'
    },
    secondary: {
      main: '#677074'
    },
    error: {
      main: '#DB0000'
    }
  }
})

export default theme
