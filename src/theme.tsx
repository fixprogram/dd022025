import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// A custom theme for this app
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
      main: red.A400
    }
  }
})

export default theme
