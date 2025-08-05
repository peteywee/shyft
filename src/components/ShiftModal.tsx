import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'

interface Props { open: boolean; onClose: () => void }

export default function ShiftModal({ open, onClose }: Props) {
  const { register, handleSubmit } = useForm<{
    starts_at: string; ends_at: string; user_id: string
  }>()

  async function onSubmit(values: any) {
    await supabase.from('shifts').insert(values)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 space-y-4">
          <Dialog.Title className="text-xl font-semibold">New Shift</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input className="w-full border p-2" {...register('user_id')} placeholder="User UUID" />
            <input className="w-full border p-2" {...register('starts_at')} type="datetime-local" />
            <input className="w-full border p-2" {...register('ends_at')}   type="datetime-local" />
            <button className="w-full rounded bg-blue-600 py-2 text-white">Create Shift</button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
