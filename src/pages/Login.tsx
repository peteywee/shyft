import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Login() {
  const { register, handleSubmit } = useForm<{ email: string }>()
  const [msg, setMsg] = useState('')

  async function onSubmit({ email }: { email: string }) {
    const { error } = await supabase.auth.signInWithOtp({ email })
    setMsg(error ? error.message : 'Check your inbox for the magic link.')
  }

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="you@example.com"
          className="w-full rounded border p-2"
        />
        <button className="w-full rounded bg-blue-600 py-2 text-white">
          Send Link
        </button>
      </form>
      {msg && <p className="text-sm text-gray-600">{msg}</p>}
    </div>
  )
}
