<template>
  <aside class="sidebar">
    <div class="toolbar" style="justify-content: space-between; margin-bottom: 8px;">
      <strong>Notes</strong>
      <button class="primary" @click="$emit('new')">New</button>
    </div>
    <input
      v-model="q"
      type="text"
      placeholder="Search notes..."
      @input="$emit('update:query', q)"
      aria-label="Search notes"
    />

    <div v-if="loading" style="padding: 12px; color:#6b7280;">Loading...</div>
    <div v-else-if="!filtered.length" style="padding: 12px; color:#6b7280;">No notes found.</div>

    <ul style="list-style:none; padding:0; margin-top:8px;">
      <li
        v-for="n in filtered"
        :key="n.id"
        class="note-item"
        :class="{ active: n.id === selectedId }"
        @click="select(n.id)"
      >
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:600; color:#111827">{{ n.title || 'Untitled' }}</div>
          <span class="badge" :title="formatTime(n.updatedAt)">Updated</span>
        </div>
        <div style="font-size:12px; color:#6b7280; margin-top:4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          {{ n.content || 'No content' }}
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '../stores/notes'

const props = defineProps<{
  query: string
}>()
const emit = defineEmits<{
  (e: 'update:query', v: string): void
  (e: 'new'): void
}>()

const store = useNotesStore()
const q = ref(props.query ?? '')

watch(() => props.query, (val) => { q.value = val ?? '' })

const loading = computed(() => store.loading)
const selectedId = computed(() => store.selectedId)

const filtered = computed(() => store.byQuery(q.value))

function select(id: string) {
  store.selectNote(id)
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}
</script>
