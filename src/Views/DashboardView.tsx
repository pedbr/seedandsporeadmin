import { Button } from '@mui/material'
import React from 'react'

const DashboardView = () => {
  return (
    <div>
      <Button
        onClick={() => {
          throw new Error('hey sentry!')
        }}
      >
        Throw error
      </Button>
    </div>
  )
}

export default DashboardView
