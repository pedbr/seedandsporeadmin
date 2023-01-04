import React, { useRef, useState } from 'react'
import {
  Typography,
  Box,
  MenuList,
  Divider,
  Menu,
  Button,
  Avatar,
  ListItemAvatar,
  MenuItem,
  alpha,
  useTheme,
} from '@mui/material'
import { ExitToApp, KeyboardArrowDown, Face } from '@mui/icons-material'
import { auth } from '../../api/firebase'

const AccountMenu = (): JSX.Element | null => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { spacing } = useTheme()

  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = (): void => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>): void => {
    if (anchorRef.current && anchorRef.current.contains(event.currentTarget)) {
      return
    }
    setOpen(false)
  }

  const signOut = async () => {
    await auth.signOut()
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        ref={anchorRef}
        startIcon={
          <Avatar>
            <Face />
          </Avatar>
        }
        endIcon={<KeyboardArrowDown />}
        sx={{
          height: '100%',
          borderRadius: 0,
          paddingRight: spacing(1.5),
          paddingLeft: spacing(1.5),
          textTransform: 'none',
          '&:hover': {
            background: alpha('#000', 0.05),
            textDecoration: 'none',
          },
        }}
      >
        <Box>
          <Typography variant='body1'>Hello, User!</Typography>
        </Box>
      </Button>

      <Menu
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        elevation={1}
        onClose={handleClose}
      >
        <MenuList
          autoFocusItem={open}
          sx={{
            minWidth: 300,
          }}
        >
          <MenuItem>
            <ListItemAvatar>
              <Avatar>
                <Typography variant='subtitle2'>UR</Typography>
              </Avatar>
            </ListItemAvatar>

            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>User Settings</Typography>
            </Box>
          </MenuItem>
          <Divider light />
          <MenuItem
            onClick={(): void => {
              signOut()
              setOpen(false)
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <ExitToApp fontSize='small' />
              </Avatar>
            </ListItemAvatar>
            <Typography variant='body1'>Sign Out</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default AccountMenu
