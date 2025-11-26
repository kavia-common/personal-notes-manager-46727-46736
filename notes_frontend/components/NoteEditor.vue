<template>
  <section class="editor">
    <div class="toolbar" style="justify-content: space-between; margin-bottom: 12px;">
      <div style="display:flex; gap:8px; align-items:center;">
        <button class="secondary" @click="$emit('save')" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
        <span v-if="saving" class="badge">Saving</span>
      </div>
      <button class="ghost" style="color: var(--color-error);" @click="$emit('delete')">Delete</button>
    </div>

    <input
      v-model="localTitle"
      type="text"
      placeholder="Title"
      @input="onUpdate('title', localTitle)"
      aria-label="Note title"
    />
    <textarea
      v-model="localContent"
      rows="18"
      placeholder="Write your note here..."
      style="margin-top: 10px; resize: vertical;"
      @input="onUpdate('content', localContent)"
      aria-label="Note content"
    ></textarea>

    <div style="display:flex; justify-content:space-between; margin-top:8px; color:#6b7280; font-size:12px;">
      <div>Created: {{ fmt(note.createdAt) }}</div>
      <div>Updated: {{ fmt(note.updatedAt) }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import type { Note } from '../stores/notes'

const props = defineProps<{
  note: Note
  saving?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', payload: { title?: string; content?: string }): void
  (e: 'save'): void
  (e: 'delete'): void
}>()

const localTitle = ref(props.note.title)
const localContent = ref(props.note.content)

watch(() => props.note, (n) => {
  localTitle.value = n.title
  localContent.value = n.content
})

function onUpdate(field: 'title'|'content', value: string) {
  emit('update', { [field]: value })
}

function fmt(iso: string) {
  try { return new Date(iso).toLocaleString() } catch { return iso }
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
}
</style>
