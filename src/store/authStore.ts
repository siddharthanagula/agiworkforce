import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata.name || email.split('@')[0],
          role: 'user',
          createdAt: new Date(data.user.created_at),
          updatedAt: new Date(),
        }
        set({ user, isAuthenticated: true })
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (error) throw error

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email!,
          name,
          role: 'user',
          createdAt: new Date(data.user.created_at),
          updatedAt: new Date(),
        }
        set({ user, isAuthenticated: true })
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut()
      set({ user: null, isAuthenticated: false })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || session.user.email!.split('@')[0],
          role: 'user',
          createdAt: new Date(session.user.created_at),
          updatedAt: new Date(),
        }
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false })
      }
    } catch (error) {
      console.error('Auth check error:', error)
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
}))
