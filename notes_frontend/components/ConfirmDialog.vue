<template>
  <dialog v-if="open" open class="wrap">
    <div class="surface">
      <h3 style="margin:0 0 6px 0;">{{ title }}</h3>
      <p style="margin:0; color:#4b5563;">{{ message }}</p>
      <div class="row">
        <button class="ghost" @click="$emit('cancel')">Cancel</button>
        <button class="primary" style="background: var(--color-error);" @click="$emit('confirm')">
          {{ confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  message: string
  confirmText?: string
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped>
.wrap {
  border: none;
  background: transparent;
}
.surface {
  background: var(--color-surface);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 16px;
  width: min(92vw, 420px);
}
.row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
