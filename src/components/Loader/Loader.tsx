import { Box } from '@mui/material'

const Loader = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'calc(100vh - 180px)'}
    >
      <Box
        height={250}
        width={250}
        sx={{
          backgroundImage: `url(/img/WebstorLoader.gif)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </Box>
  )
}

export default Loader
