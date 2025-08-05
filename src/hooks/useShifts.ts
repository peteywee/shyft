import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ShiftEvent { id: number; start: Date; end: Date; title: string }

export default function useShifts(userId?: string | null) {
  const [events, setEvents] = useState<ShiftEvent[]>([])

  useEffect(() => {
    if (!userId) return
    const channel = supabase.channel('public:shifts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shifts' },
        payload => {
          // simplistic: reload all rows
          load()
        })
      .subscribe()

    load()
    return () => { supabase.removeChannel(channel) }

    async function load() {
      const { data } = await supabase
        .from('shifts')
        .select('id, starts_at, ends_at')
        .eq('user_id', userId)
      setEvents(
        data?.map(r => ({
          id: r.id,
          start: new Date(r.starts_at),
          end: new Date(r.ends_at),
          title: 'Shift',
        })) ?? []
      )
    }
  }, [userId])

  return events
}
