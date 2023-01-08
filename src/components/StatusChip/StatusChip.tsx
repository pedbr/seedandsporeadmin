import Chip from '@mui/material/Chip'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import SendIcon from '@mui/icons-material/Send'
import AddHomeIcon from '@mui/icons-material/AddHome'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Typography } from '@mui/material'

const STATUS_LIST = {
  processing: 'processing',
  pending: 'pending',
  preparing: 'preparing',
  expedited: 'expedited',
  delivered: 'delivered',
  closed: 'closed',
}

interface StatusChipProps {
  status: string
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const getIcon = () => {
    switch (status) {
      case STATUS_LIST.processing:
        return <HourglassEmptyIcon fontSize='small' />

      case STATUS_LIST.pending:
        return <WarningIcon fontSize='small' />

      case STATUS_LIST.expedited:
        return <SendIcon fontSize='small' />

      case STATUS_LIST.delivered:
        return <AddHomeIcon fontSize='small' />

      case STATUS_LIST.closed:
        return <CheckCircleIcon fontSize='small' />

      default:
        return <InfoIcon />
    }
  }

  const getLabel = () => {
    switch (status) {
      case STATUS_LIST.pending:
        return 'Pending to handle'

      case STATUS_LIST.preparing:
        return 'Preparing'

      case STATUS_LIST.expedited:
        return 'Sent to customer'

      case STATUS_LIST.delivered:
        return 'Delivered'

      case STATUS_LIST.closed:
        return 'Closed'

      default:
        return 'Processing'
    }
  }

  const getColor = () => {
    switch (status) {
      case STATUS_LIST.pending:
        return 'warning'

      case STATUS_LIST.delivered:
      case STATUS_LIST.closed:
        return 'success'

      default:
        return 'info'
    }
  }

  return (
    <Chip
      icon={getIcon()}
      label={
        <Typography fontSize={'12px'} fontWeight={700}>
          {getLabel()}
        </Typography>
      }
      color={getColor()}
    />
  )
}

export default StatusChip
