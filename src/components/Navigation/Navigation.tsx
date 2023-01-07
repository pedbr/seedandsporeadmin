import { useContext, useState } from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import {
  Box,
  Drawer as MuiDrawer,
  Toolbar,
  List,
  CssBaseline,
  IconButton,
  useTheme,
  Typography,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
// import CampaignIcon from '@mui/icons-material/Campaign'
// import SellIcon from '@mui/icons-material/Sell'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'

import NavigationItem from './NavigationItem'
import { AuthContext } from '../../context/AuthContext'
import Logo from '../Logo'
import AccountMenu from '../AccountMenu'
import { useLocation } from 'react-router-dom'

const drawerWidth = 200

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
  boxShadow: theme.shadows[10],
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(11)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
  borderRight: 'none',
  boxShadow: theme.shadows[10],
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  boxShadow: theme.shadows[10],
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

interface NavigationProps {
  children: JSX.Element
}

const Navigation = ({ children }: NavigationProps) => {
  const [open, setOpen] = useState(false)
  const { palette } = useTheme()
  const location = useLocation()
  const user = useContext(AuthContext)

  return (
    <Box sx={{ display: 'flex' }} height={'100vh'}>
      <CssBaseline />
      <AppBar color='transparent' elevation={0} position='fixed' open={open}>
        <Toolbar>
          <Box sx={{ ...(open && { display: 'none' }) }}>
            <Logo />
          </Box>
          <IconButton
            onClick={() => setOpen(!open)}
            edge='start'
            sx={{
              ...(!open && { marginLeft: 4.5 }),
            }}
          >
            {!open ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
            {user && <AccountMenu />}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          {open && (
            <>
              <Logo sx={{ mr: 2 }} />
              <Typography
                fontSize={'22px'}
                fontFamily={'Covered By Your Grace'}
              >
                webstor
              </Typography>
            </>
          )}
        </DrawerHeader>
        <List>
          <NavigationItem
            isActive={location.pathname === '/'}
            open={open}
            icon={<ViewComfyIcon color='inherit' />}
            label={'Dashboard'}
            navigateTo={'/'}
          />
          <NavigationItem
            isActive={location.pathname.includes('/products')}
            open={open}
            icon={<ShoppingBasketIcon color='inherit' />}
            label={'Products'}
            navigateTo={'/products'}
          />
          <NavigationItem
            isActive={location.pathname.includes('/orders')}
            open={open}
            icon={<AddShoppingCartIcon color='inherit' />}
            label={'Orders'}
            navigateTo={'/orders'}
          />
          {/* <NavigationItem
            open={open}
            icon={<CampaignIcon />}
            label={'Campaigns'}
            navigateTo={'/campaigns'}
          />
          <NavigationItem
            open={open}
            icon={<SellIcon />}
            label={'Categories'}
            navigateTo={'/categories'}
          /> */}
        </List>
      </Drawer>
      <Box
        component='main'
        height={'100%'}
        sx={{ flexGrow: 1, p: 3 }}
        bgcolor={palette.grey[50]}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default Navigation
