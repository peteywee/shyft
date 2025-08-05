import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import useShifts from '@/hooks/useShifts'
import { useAuth } from '@/contexts/Auth'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function Dashboard() {
  const { user } = useAuth()
  const events = useShifts(user?.id)
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '80vh' }}
    />
  )
}
