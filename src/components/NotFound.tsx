import NotFoundIcon from '@/assets/not-found.svg'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { Box, Button, Paper, Typography } from '@mui/material'

export const NotFound = () => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          gap: 3,
          backgroundColor: 'rgb(250,250,250)'
        }}
      >
        <Box
          component="img"
          src={NotFoundIcon}
          alt="Logo"
          width={243}
          height={110}
          marginTop={'auto'}
        />
        <Typography fontWeight={500} fontSize={20} lineHeight={'32px'}>
          Page not found. Please try again later.
        </Typography>

        <Box
          marginTop={'auto'}
          padding="16px 16px 0"
          width={'100%'}
          borderTop={'1px solid rgba(224, 224, 224, 1)'}
        >
          <Button href="/" variant="contained" fullWidth>
            Go home
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Paper
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          gap: 4
        }}
      >
        <Box component="img" src={NotFoundIcon} alt="Logo" width={452} height={206} />
        <Typography fontWeight={500} fontSize={20} lineHeight={'32px'}>
          Page not found. Please try again later.
        </Typography>

        <Button href="/" variant="contained">
          Go home
        </Button>
      </Paper>
    </Box>
  )
}
