import {
  Box,
  lighten,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface NavigationItemProps {
  open: boolean
  icon: JSX.Element
  label: string
  navigateTo: string
  isActive: boolean
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  open,
  icon,
  label,
  navigateTo,
  isActive,
}) => {
  const navigate = useNavigate()
  const { palette } = useTheme()

  return (
    <ListItem disablePadding sx={{ display: 'block', mt: 6 }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          borderRadius: '12px',
          mx: 2,
          ...(isActive && { backgroundColor: palette.primary.main }),
          '&:hover': {
            ...(isActive && {
              backgroundColor: lighten(palette.primary.main, 0.3),
            }),
          },
        }}
        onClick={() => navigate(navigateTo)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            color={`common.${isActive ? 'white' : 'black'}`}
          >
            {icon}
          </Box>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography color={`common.${isActive ? 'white' : 'black'}`}>
              {label}
            </Typography>
          }
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default NavigationItem
