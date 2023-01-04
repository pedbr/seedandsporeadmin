import React from 'react'
import { Box, Typography } from '@mui/material'

interface LogoProps {
  sx?: {}
}

const Logo: React.FC<LogoProps> = ({ sx }) => {
  return (
    <Box sx={sx} bgcolor={'secondary.main'} px={0.9} borderRadius={'100%'}>
      <Typography fontSize={'20px'} fontFamily={'Covered By Your Grace'}>
        ws
      </Typography>
    </Box>
  )
}

export default Logo
