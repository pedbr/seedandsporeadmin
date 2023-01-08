import { Drawer as MuiDrawer, DrawerProps } from '@mui/material'

const Drawer: React.FC<DrawerProps> = (props) => {
  const { anchor = 'right', children, sx } = props
  return (
    <MuiDrawer
      anchor={anchor}
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 2,
        '.MuiPaper-root': {
          width: '600px',
          height: 'calc(100vh - 80px)',
          margin: 2,
          padding: 2,
          borderRadius: '12px',
        },
        ...{ sx },
      })}
      {...props}
    >
      {children}
    </MuiDrawer>
  )
}

export default Drawer
