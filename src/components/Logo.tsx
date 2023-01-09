import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

interface LogoProps {
  sx?: {}
  color?: string
}

const Logo: React.FC<LogoProps> = ({ sx, color }) => {
  const { palette } = useTheme()
  return (
    <Box
      sx={{ border: `3px solid ${color || palette.primary.main}`, ...sx }}
      px={0.9}
      borderRadius={'100%'}
    >
      <Typography
        fontSize={'22px'}
        fontFamily={'Covered By Your Grace'}
        color={color || palette.primary.main}
      >
        ws
      </Typography>
    </Box>
  )
}

export default Logo
