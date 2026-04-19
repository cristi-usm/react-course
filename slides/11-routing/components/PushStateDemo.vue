<script setup>
import LiveWeb from '../../../common/components/LiveWeb.vue'

const files = {
  '/index.html': {
    code: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="container">
    <p class="hint">Apasă pe un link, apoi folosește <b>Back / Forward</b> din URL bar.</p>
    <div class="buttons">
      <button onclick="navigheaza('/acasa')">/acasa</button>
      <button onclick="navigheaza('/produse')">/produse</button>
      <button onclick="navigheaza('/contact')">/contact</button>
    </div>
  </div>

  <script src="/index.js"><` + `/script>
</body>
</html>`
  },
  '/index.js': {
    code: `// Adaugă o intrare nouă în history stack.
// URL-ul se schimbă, dar pagina NU se reîncarcă.
function navigheaza(path) {
  window.history.pushState({}, '', path);
}`,
    active: true
  },
  '/styles.css': {
    code: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
}

.container { padding: 20px; }
.hint { color: #475569; font-size: 13px; margin: 0 0 12px; }
.buttons { display: flex; gap: 8px; flex-wrap: wrap; }

.buttons button {
  padding: 10px 18px;
  background: #0ea5e9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-family: ui-monospace, monospace;
}
.buttons button:hover { background: #0284c7; }`
  }
}
</script>

<template>
  <LiveWeb
    :files="files"
    :showTabs="true"
    :showFileExplorer="false"
    :showConsole="false"
    :showUrlBar="true"
    :editorHeight="380"
  />
</template>
