import { defineStore } from 'pinia'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

type NotesState = {
  notes: Note[]
  selectedId: string | null
  initialized: boolean
  error: string | null
  loading: boolean
}

const STORAGE_KEY = 'notes.v1'

function nowISO() {
  return new Date().toISOString()
}

function safeReadLocalStorage<T>(key: string, fallback: T): T {
  try {
    if (process.client) {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw) as T
    }
    return fallback
  } catch (_e) {
    return fallback
  }
}

function safeWriteLocalStorage<T>(key: string, value: T) {
  try {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  } catch (_e) {
    // swallow; error string set on store actions
  }
}

export const useNotesStore = defineStore('notes', {
  state: (): NotesState => ({
    notes: [],
    selectedId: null,
    initialized: false,
    error: null,
    loading: false
  }),

  getters: {
    selected(state): Note | null {
      return state.notes.find(n => n.id === state.selectedId) ?? null
    },
    byQuery: (state) => {
      return (query: string) => {
        const q = query.trim().toLowerCase()
        if (!q) return state.notes
        return state.notes.filter(n =>
          n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
        )
      }
    }
  },

  actions: {
    // PUBLIC_INTERFACE
    init() {
      /** Initialize notes store from localStorage. */
      if (this.initialized) return
      this.loading = true
      try {
        const saved = safeReadLocalStorage<{ notes: Note[]; selectedId: string | null }>(STORAGE_KEY, { notes: [], selectedId: null })
        this.notes = Array.isArray(saved.notes) ? saved.notes : []
        this.selectedId = saved.selectedId ?? (this.notes[0]?.id ?? null)
        this.error = null
      } catch (e: any) {
        this.error = 'Failed to load notes from local storage.'
      } finally {
        this.loading = false
        this.initialized = true
      }
    },

    persist() {
      try {
        safeWriteLocalStorage(STORAGE_KEY, { notes: this.notes, selectedId: this.selectedId })
        this.error = null
      } catch (_e) {
        this.error = 'Failed to save to local storage.'
      }
    },

    // PUBLIC_INTERFACE
    createNote(partial?: Partial<Note>): Note {
      /** Create a new note and select it. */
      const id = (globalThis.crypto && 'randomUUID' in globalThis.crypto)
        ? globalThis.crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
      const createdAt = nowISO()
      const note: Note = {
        id,
        title: partial?.title?.trim() || 'Untitled',
        content: partial?.content || '',
        createdAt,
        updatedAt: createdAt
      }
      this.notes.unshift(note)
      this.selectedId = id
      this.persist()
      return note
    },

    // PUBLIC_INTERFACE
    updateSelected(fields: Partial<Pick<Note, 'title' | 'content'>>): void {
      /** Update currently selected note fields. */
      if (!this.selectedId) return
      const idx = this.notes.findIndex(n => n.id === this.selectedId)
      if (idx === -1) return
      const updated: Note = {
        ...this.notes[idx],
        ...fields,
        updatedAt: nowISO()
      }
      // move updated note to top
      this.notes.splice(idx, 1)
      this.notes.unshift(updated)
      this.selectedId = updated.id
      this.persist()
    },

    // PUBLIC_INTERFACE
    selectNote(id: string | null) {
      /** Select a note by id. */
      this.selectedId = id
      this.persist()
    },

    // PUBLIC_INTERFACE
    deleteSelected(): void {
      /** Delete the selected note. */
      if (!this.selectedId) return
      const idx = this.notes.findIndex(n => n.id === this.selectedId)
      if (idx !== -1) {
        this.notes.splice(idx, 1)
      }
      this.selectedId = this.notes[0]?.id ?? null
      this.persist()
    }
  }
})
