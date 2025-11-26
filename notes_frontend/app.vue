<template>
  <div class="min-h-screen bg-background text-text">
    <NuxtRouteAnnouncer />
    <HeaderBar />

    <div class="layout mx-auto">
      <NotesList
        :query="query"
        @update:query="onUpdateQuery"
        @new="onNewNote"
      />

      <main class="main-surface">
        <NoteEditor
          v-if="selected"
          :note="selected"
          :saving="saving"
          @save="onSave"
          @delete="onDelete"
          @update="onUpdate"
        />
        <EmptyState v-else class="h-full" />
      </main>
    </div>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete note"
      message="Are you sure you want to delete this note? This action cannot be undone."
      confirm-text="Delete"
      @confirm="confirmDelete"
      @cancel="confirmOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createPinia } from 'pinia'
import HeaderBar from './components/HeaderBar.vue'
import NotesList from './components/NotesList.vue'
import NoteEditor from './components/NoteEditor.vue'
import EmptyState from './components/EmptyState.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import { useNotesStore } from './stores/notes'

// Ensure Pinia is active in app context for simple starter templates
const pinia = createPinia()
declare global {
  // augment global to silence TS in this SFC context
  // eslint-disable-next-line no-var
  var __piniaInstalled: boolean | undefined
  // eslint-disable-next-line no-var
  var __nuxt_app__: any
}
if (!globalThis.__piniaInstalled) {
  const app: any = globalThis.__nuxt_app__?.vueApp
  if (app) {
    app.use(pinia)
    globalThis.__piniaInstalled = true
  }
}

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const query = ref('')
const saving = ref(false)
const confirmOpen = ref(false)

onMounted(() => {
  store.init()

  // Read initial selected note from query
  const noteId = (route.query.note as string) || null
  if (noteId) {
    store.selectNote(noteId)
  }

  // Keyboard shortcuts
  const onKey = (e: KeyboardEvent) => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
    const mod = isMac ? e.metaKey : e.ctrlKey
    if (mod && e.key.toLowerCase() === 'n') {
      e.preventDefault()
      onNewNote()
    }
    if (mod && e.key.toLowerCase() === 's') {
      e.preventDefault()
      if (store.selected) {
        onSave()
      }
    }
  }
  window.addEventListener('keydown', onKey)
  // cleanup
  window.addEventListener('beforeunload', () => {
    if (store.selected) {
      // attempt autosave on unload
      onSave()
    }
  })
})

const selected = computed(() => store.selected)

watch(
  () => store.selectedId,
  (id) => {
    // Reflect selected note in URL
    router.replace({ query: id ? { note: id } : {} })
  },
  { immediate: true }
)

function onNewNote() {
  const note = store.createNote()
  router.replace({ query: { note: note.id } })
}

function onSave() {
  saving.value = true
  // emulate brief save; localStorage is instant but show feedback
  setTimeout(() => {
    store.persist()
    saving.value = false
  }, 250)
}

function onUpdate(payload: { title?: string; content?: string }) {
  store.updateSelected(payload)
}

function onDelete() {
  confirmOpen.value = true
}

function confirmDelete() {
  store.deleteSelected()
  confirmOpen.value = false
}

function onUpdateQuery(val: string) {
  query.value = val
}
</script>

<style>
:root {
  --color-primary: #2563EB;
  --color-secondary: #F59E0B;
  --color-success: #F59E0B;
  --color-error: #EF4444;
  --color-background: #f9fafb;
  --color-surface: #ffffff;
  --color-text: #111827;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --radius: 12px;
}

* { box-sizing: border-box; }
html, body, #__nuxt { min-height: 100%; }

.bg-background { background: var(--color-background); }
.text-text { color: var(--color-text); }

.layout {
  max-width: 1200px;
  padding: 16px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
}

.main-surface {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 16px;
  min-height: calc(100vh - 140px);
  background-image: linear-gradient(180deg, rgba(59,130,246,0.06), rgba(249,250,251,1));
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

button {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all .2s ease;
}

button.primary {
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}
button.primary:hover { filter: brightness(0.95); }

button.secondary {
  background: var(--color-secondary);
  color: #1f2937;
}

button.ghost {
  background: transparent;
  color: var(--color-text);
}

input[type="text"], textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
  background: white;
}

input[type="text"]:focus, textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.sidebar {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 12px;
  min-height: calc(100vh - 140px);
}

.note-item {
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .15s ease;
}
.note-item:hover {
  background: #f3f4f6;
}
.note-item.active {
  background: rgba(37, 99, 235, 0.10);
  border: 1px solid rgba(37, 99, 235, 0.25);
}

.badge {
  font-size: 12px;
  background: #eef2ff;
  color: #3730a3;
  padding: 2px 8px;
  border-radius: 9999px;
}

.toolbar {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
