<template>
  <section class="empty">
    <div class="card">
      <div class="icon">🌊</div>
      <h3>Welcome to Personal Notes</h3>
      <p>Create your first note to get started.</p>
      <button class="primary" @click="$emit('new')">New note</button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'new'): void }>()
</script>

<style scoped>
.empty {
  height: 100%;
  display: grid;
  place-items: center;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-md);
}
.icon {
  width: 56px;
  height: 56px;
  background: var(--color-primary);
  color: white;
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin: 0 auto 8px;
  font-size: 28px;
  box-shadow: var(--shadow-sm);
}
</style>
