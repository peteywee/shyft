import {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react'
import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'

interface AuthCtx {
  user: User | null
  session: Session | null
}

const AuthContext = createContext<AuthCtx>({ user: null, session: null })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_, session) => setSession(session))
    // fetch current session on mount
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
