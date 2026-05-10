import { useState, useEffect, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { signIn, signUp, signOut, getProfile } from '../lib/auth'
import type { ProfileRow } from '../lib/database.types'

interface AuthState {
  user:        User | null
  profile:     ProfileRow | null
  loading:     boolean
  error:       string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user:    null,
    profile: null,
    loading: true,
    error:   null,
  })

  const loadProfile = useCallback(async (user: User) => {
    try {
      const profile = await getProfile(user.id)
      setState(s => ({ ...s, user, profile, loading: false, error: null }))
    } catch {
      setState(s => ({ ...s, user, profile: null, loading: false }))
    }
  }, [])

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user)
      } else {
        setState(s => ({ ...s, loading: false }))
      }
    })

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user)
      } else {
        setState({ user: null, profile: null, loading: false, error: null })
      }
    })

    return () => subscription.unsubscribe()
  }, [loadProfile])

  const login = useCallback(async (email: string, password: string) => {
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const data = await signIn(email, password)
      if (data.user) await loadProfile(data.user)
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      setState(s => ({ ...s, loading: false, error: msg }))
      throw err
    }
  }, [loadProfile])

  const register = useCallback(async (email: string, password: string, fullName: string, role: 'candidate' | 'company' = 'candidate') => {
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const data = await signUp(email, password, fullName, role)
      setState(s => ({ ...s, loading: false }))
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      setState(s => ({ ...s, loading: false, error: msg }))
      throw err
    }
  }, [])

  const logout = useCallback(async () => {
    await signOut()
    setState({ user: null, profile: null, loading: false, error: null })
  }, [])

  return {
    user:       state.user,
    profile:    state.profile,
    loading:    state.loading,
    error:      state.error,
    isLoggedIn: !!state.user,
    isCandidate: state.profile?.role === 'candidate',
    isCompany:   state.profile?.role === 'company',
    isAdmin:     state.profile?.role === 'admin',
    login,
    register,
    logout,
  }
}
