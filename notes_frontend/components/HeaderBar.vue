<template>
  <header class="header">
    <div class="container">
      <div class="brand">
        <div class="logo">🗒️</div>
        <div class="title">
          <h1>Personal Notes</h1>
          <p>Ocean Professional</p>
        </div>
      </div>
      <div class="actions">
        <button class="ghost" title="Keyboard shortcuts" @click="showHelp = true">?</button>
      </div>
    </div>

    <dialog v-if="showHelp" open class="dialog">
      <h3>Keyboard Shortcuts</h3>
      <ul>
        <li><span class="kbd">Ctrl / ⌘</span> + <span class="kbd">N</span> — New note</li>
        <li><span class="kbd">Ctrl / ⌘</span> + <span class="kbd">S</span> — Save note</li>
      </ul>
      <div class="dialog-actions">
        <button class="primary" @click="showHelp = false">Close</button>
      </div>
    </dialog>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showHelp = ref(false)
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, rgba(37,99,235,0.10), rgba(249,250,251,1));
  border-bottom: 1px solid #e5e7eb;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: white;
  border-radius: 10px;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-sm);
}
.title h1 {
  font-size: 18px;
  margin: 0;
  color: var(--color-text);
}
.title p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}
.dialog {
  border: none;
  border-radius: 12px;
  padding: 16px;
  max-width: 420px;
  box-shadow: var(--shadow-md);
}
.kbd {
  display: inline-block;
  border: 1px solid #e5e7eb;
  background: white;
  padding: 2px 6px;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
