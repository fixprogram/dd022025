import { createTheme } from '@mui/material/styles'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'
import { forwardRef } from 'react'

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

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
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
})

export default theme
