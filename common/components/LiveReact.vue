<template>
  <div class="sandbox-container" @keydown.stop @keyup.stop @keypress.stop :style="containerStyle">
    <SandpackProvider :template="template" :files="sandpackFiles" :custom-setup="customSetup" :theme="effectiveTheme">
      <SandpackLayout>
        <SandpackFileExplorer v-if="showFileExplorer" />
        <SandpackCodeEditor :extensions="extensions" :extensionsKeymap="extensionsKeymap"
          :showLineNumbers="sandpackOptions.showLineNumbers" :showInlineErrors="sandpackOptions.showInlineErrors"
          :wrapContent="sandpackOptions.wrapContent" :editorHeight="sandpackOptions.editorHeight"
          :showTabs="sandpackOptions.showTabs" :closableTabs="sandpackOptions.closableTabs" />
        <SandpackPreview :showNavigator="sandpackOptions.showNavigator" />
      </SandpackLayout>
    </SandpackProvider>
  </div>
</template>

<script setup>
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer } from 'sandpack-vue3';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { computed } from 'vue';
import { useDarkMode } from '@slidev/client';

const { isDark } = useDarkMode();

const props = defineProps({
  code: {
    type: String,
    default: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h4>Interactive React Demo</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
  },
  files: {
    type: Object,
    default: null
  },
  showFileExplorer: {
    type: Boolean,
    default: false
  },
  dependencies: {
    type: Object,
    default: () => ({})
  },
  theme: {
    type: String,
    default: null
  },
  editorHeight: {
    type: [String, Number],
    default: '800px'
  },
  showLineNumbers: {
    type: Boolean,
    default: true
  },
  showInlineErrors: {
    type: Boolean,
    default: true
  },
  showTabs: {
    type: Boolean,
    default: false
  },
  showNavigator: {
    type: Boolean,
    default: false
  },
  showUrlBar: {
    type: Boolean,
    default: false
  }
});

const template = 'react';

const URL_BAR_STYLES = `.__lw-browser {
  background: #e2e8f0;
  border-bottom: 1px solid #cbd5e1;
  padding: 8px 12px;
  font-family: system-ui, sans-serif;
}
.__lw-controls { display: flex; gap: 6px; margin-bottom: 8px; }
.__lw-dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.__lw-red { background: #ef4444; }
.__lw-yellow { background: #eab308; }
.__lw-green { background: #22c55e; }
.__lw-toolbar { display: flex; align-items: center; gap: 8px; }
.__lw-nav-btn {
  width: 28px; height: 28px; padding: 0;
  border: 1px solid #cbd5e1; background: white;
  border-radius: 50%; cursor: pointer;
  font-size: 14px; color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-family: inherit;
}
.__lw-nav-btn:hover { background: #f8fafc; color: #0f172a; }
.__lw-nav-btn:active { background: #e2e8f0; }
.__lw-url-bar {
  flex: 1; background: white;
  border: 1px solid #cbd5e1; border-radius: 20px;
  padding: 8px 14px;
  font-family: ui-monospace, monospace; font-size: 14px;
  display: flex; align-items: center; gap: 8px;
}
.__lw-lock { font-size: 12px; }
.__lw-origin { color: #94a3b8; }
.__lw-path { color: #0ea5e9; font-weight: 600; }
body { margin: 0; }`;

const URL_BAR_SCRIPT = `(function initUrlBar() {
  var el = function(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  };
  var root = el('div', '__lw-browser');
  var controls = el('div', '__lw-controls');
  controls.appendChild(el('span', '__lw-dot __lw-red'));
  controls.appendChild(el('span', '__lw-dot __lw-yellow'));
  controls.appendChild(el('span', '__lw-dot __lw-green'));

  var backBtn = el('button', '__lw-nav-btn', '\\u2190');
  backBtn.title = 'Back';
  var forwardBtn = el('button', '__lw-nav-btn', '\\u2192');
  forwardBtn.title = 'Forward';

  var pathEl = el('span', '__lw-path');
  var urlBar = el('div', '__lw-url-bar');
  urlBar.appendChild(el('span', '__lw-lock', '\\uD83D\\uDD12'));
  urlBar.appendChild(el('span', '__lw-origin', 'https://demo.local'));
  urlBar.appendChild(pathEl);

  var toolbar = el('div', '__lw-toolbar');
  toolbar.appendChild(backBtn);
  toolbar.appendChild(forwardBtn);
  toolbar.appendChild(urlBar);
  root.appendChild(controls);
  root.appendChild(toolbar);

  var mount = function() { document.body.insertBefore(root, document.body.firstChild); };
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  var sync = function() { pathEl.textContent = window.location.pathname + window.location.search; };

  backBtn.addEventListener('click', function() { window.history.back(); });
  forwardBtn.addEventListener('click', function() { window.history.forward(); });

  var origPush = history.pushState;
  history.pushState = function() {
    var r = origPush.apply(this, arguments);
    window.dispatchEvent(new Event('__lw-urlchange'));
    return r;
  };
  var origReplace = history.replaceState;
  history.replaceState = function() {
    var r = origReplace.apply(this, arguments);
    window.dispatchEvent(new Event('__lw-urlchange'));
    return r;
  };

  window.addEventListener('popstate', sync);
  window.addEventListener('__lw-urlchange', sync);
  sync();
})();`;

const urlBarIndexJs = `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// URL bar — injectat automat de LiveReact (showUrlBar=true)
const __lwStyle = document.createElement('style');
__lwStyle.textContent = ${JSON.stringify(URL_BAR_STYLES)};
document.head.appendChild(__lwStyle);

${URL_BAR_SCRIPT}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;

const sandpackFiles = computed(() => {
  const base = props.files || { '/App.js': props.code };
  if (!props.showUrlBar) return base;

  // Only override /index.js if user didn't provide one
  if (base['/index.js']) return base;

  return {
    ...base,
    '/index.js': { code: urlBarIndexJs, hidden: true }
  };
});

const customSetup = computed(() => ({
  dependencies: {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    ...props.dependencies
  }
}));

const sandpackOptions = computed(() => ({
  showLineNumbers: props.showLineNumbers,
  showInlineErrors: props.showInlineErrors,
  wrapContent: true,
  editorHeight: typeof props.editorHeight === 'number' ? `${props.editorHeight}px` : props.editorHeight,
  showTabs: props.showTabs,
  showNavigator: props.showNavigator,
  closableTabs: props.showTabs
}));

const containerStyle = computed(() => {
  const heightValue = typeof props.editorHeight === 'number' ? `${props.editorHeight}px` : props.editorHeight;
  return {
    height: heightValue,
    minHeight: heightValue
  };
});

const effectiveTheme = computed(() => {
  // Use explicit theme prop if provided, otherwise follow presentation theme
  return props.theme || (isDark.value ? 'dark' : 'light');
});

const extensions = [autocompletion()];
const extensionsKeymap = [completionKeymap];
</script>
