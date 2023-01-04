import { useRef } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { auth } from '../api/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Logo from '../components/Logo'

const LoginView = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

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
      <Stack
        height={'100%'}
        spacing={3}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box display={'flex'}>
          <Logo sx={{ mr: 1 }} />
          <Typography fontSize={'22px'} fontFamily={'Covered By Your Grace'}>
            webstor
          </Typography>
        </Box>
        <TextField inputRef={emailRef} label={'Email'} />
        <TextField
          inputRef={passwordRef}
          type={'password'}
          label={'Password'}
        />
        <Button variant={'contained'} onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Box>
  )
}

export default LoginView
