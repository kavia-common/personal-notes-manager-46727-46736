import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useNotesStore } from '@/stores/notes'

describe('notes store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // mock localStorage
    const map = new Map<string, string>()
    // @ts-ignore
    global.localStorage = {
      getItem: (k: string) => map.get(k) ?? null,
      setItem: (k: string, v: string) => { map.set(k, v) }
    }
  })

  it('creates, updates, and deletes notes', () => {
    const s = useNotesStore()
    s.init()
    const note = s.createNote({ title: 'Hello', content: 'World' })
    expect(s.selected?.id).toBe(note.id)
    s.updateSelected({ title: 'Changed' })
    expect(s.selected?.title).toBe('Changed')
    s.deleteSelected()
    expect(s.selected).toBeNull()
  })
})
