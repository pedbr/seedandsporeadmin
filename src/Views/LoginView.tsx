import { useRef } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { auth } from '../api/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Logo from '../components/Logo'

const LoginView = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { palette } = useTheme()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box height={'100vh'} width={'100%'}>
      <Grid container>
        <Grid item xs={6} bgcolor={'primary.main'} height={'100vh'}>
          <Box display={'flex'} alignItems={'center'} p={4}>
            <Logo color={palette.secondary.main} />
            <Typography
              ml={1}
              color={'secondary.main'}
              fontFamily={'Covered By Your Grace'}
              fontSize={'24px'}
            >
              webstor
            </Typography>
          </Box>
          <Box
            height={'calc(100vh - 170px)'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'100%'}
              bgcolor={'secondary.main'}
              height={600}
              width={600}
            >
              <Box
                sx={{
                  backgroundImage: `url(/img/Scene.png)`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                height={400}
                width={600}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            height={'100vh'}
            bgcolor={palette.grey[50]}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Stack spacing={2}>
              <Typography variant={'h2'}>Welcome to Webstor</Typography>
              <Typography color={'text.secondary'} fontWeight={400}>
                New to Webstor? Reach out to Pedro to create an account{' '}
              </Typography>
              <Stack spacing={4}>
                <TextField inputRef={emailRef} label={'Email'} />
                <TextField
                  inputRef={passwordRef}
                  type={'password'}
                  label={'Password'}
                />
                <Button variant={'contained'} onClick={handleLogin}>
                  Login
                </Button>
                <Divider />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginView
