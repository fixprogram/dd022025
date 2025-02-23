import LogoIcon from '../assets/logo.svg'
import LogoName from '../assets/logo-name.svg'
import { Box } from '@mui/material'

export const Logo = ({ isFull = true }) => {
  return (
    <Box display={'flex'}>
      <Box component="img" src={LogoIcon} alt="Logo" width={30} height={24} marginRight={'7px'} />
      {isFull ? (
        <Box component="img" src={LogoName} alt="Logoipsum" width={83} height={24} />
      ) : null}
    </Box>
  )
}
