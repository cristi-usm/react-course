<template>
  <div class="sandbox-container" :class="{ 'console-only-mode': consoleOnly }" @keydown.stop @keyup.stop @keypress.stop :style="containerStyle">
    <SandpackProvider :template="template" :files="sandpackFiles" :custom-setup="customSetup" :theme="effectiveTheme" :options="sandpackProviderOptions">
      <SandpackLayout>
        <SandpackFileExplorer v-if="showFileExplorer && !consoleOnly" />
        <SandpackCodeEditor :extensions="extensions" :extensionsKeymap="extensionsKeymap"
          :showLineNumbers="sandpackOptions.showLineNumbers" :showInlineErrors="sandpackOptions.showInlineErrors"
          :wrapContent="sandpackOptions.wrapContent" :editorHeight="sandpackOptions.editorHeight"
          :showTabs="sandpackOptions.showTabs" :closableTabs="sandpackOptions.closableTabs" />
        <SandpackConsole v-if="consoleOnly || showConsole" :showHeader="true" :resetOnPreviewRestart="true" />
        <SandpackPreview
          :showNavigator="consoleOnly ? false : sandpackOptions.showNavigator"
          :showOpenInCodeSandbox="false"
          :showRefreshButton="consoleOnly ? true : true" />
      </SandpackLayout>
    </SandpackProvider>
  </div>
</template>

<script setup>
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, SandpackFileExplorer, SandpackConsole } from 'sandpack-vue3';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { computed } from 'vue';
import { useDarkMode } from '@slidev/client';

const { isDark } = useDarkMode();

const props = defineProps({
  code: {
    type: String,
    default: "console.log('Hello World!');\ndocument.body.innerHTML = '<h1>Hello from JavaScript!</h1>';"
  },
  files: {
    type: Object,
    default: null
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
    default: true
  },
  showNavigator: {
    type: Boolean,
    default: false
  },
  showFileExplorer: {
    type: Boolean,
    default: true
  },
  showConsole: {
    type: Boolean,
    default: false
  },
  consoleOnly: {
    type: Boolean,
    default: false
  },
  showUrlBar: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    default: () => ({})
  }
});

const template = 'static';

const effectiveTheme = computed(() => {
  // Use explicit theme prop if provided, otherwise follow presentation theme
  return props.theme || (isDark.value ? 'dark' : 'light');
});

const defaultCSS = computed(() => {
  const isLightTheme = effectiveTheme.value === 'light';
  return `body {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 20px;
  background: ${isLightTheme ? '#f5f5f5' : '#1e1e1e'};
  color: ${isLightTheme ? '#000' : '#e0e0e0'};
}

#app {
  max-width: 800px;
  margin: 0 auto;
  background: ${isLightTheme ? 'white' : '#2d2d2d'};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,${isLightTheme ? '0.1' : '0.3'});
}`;
});

const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Demo</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div id="app">
    <h1>Hello World!</h1>
  </div>
  <script src="/index.js"><` + `/script>
</body>
</html>`;

const consoleOnlyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Console Demo</title>
</head>
<body>
  <script type="module">
    // Fetch the code and wrap in IIFE for isolation
    const scriptContent = await fetch('/index.js').then(r => r.text());
    (function() {
      eval(scriptContent);
    })();
  <` + `/script>
</body>
</html>`;

const URL_BAR_JS = `// URL bar auto-injectat de LiveWeb (showUrlBar=true).
// Ascuns din tabs — vezi internals: construiește UI + patch-uie pushState.
(function initUrlBar() {
  const el = (tag, className, text) => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  };

  const root = el('div', '__lw-browser');

  const controls = el('div', '__lw-controls');
  controls.append(
    el('span', '__lw-dot __lw-red'),
    el('span', '__lw-dot __lw-yellow'),
    el('span', '__lw-dot __lw-green')
  );

  const backBtn = el('button', '__lw-nav-btn', '\u2190');
  backBtn.title = 'Back';
  const forwardBtn = el('button', '__lw-nav-btn', '\u2192');
  forwardBtn.title = 'Forward';

  const pathEl = el('span', '__lw-path');
  const urlBar = el('div', '__lw-url-bar');
  urlBar.append(
    el('span', '__lw-lock', '\uD83D\uDD12'),
    el('span', '__lw-origin', 'https://demo.local'),
    pathEl
  );

  const toolbar = el('div', '__lw-toolbar');
  toolbar.append(backBtn, forwardBtn, urlBar);
  root.append(controls, toolbar);

  const mount = () => document.body.prepend(root);
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  const sync = () => { pathEl.textContent = window.location.pathname + window.location.search; };

  backBtn.addEventListener('click', () => window.history.back());
  forwardBtn.addEventListener('click', () => window.history.forward());

  // pushState nu emite popstate — patch-uim ca să primim notificare
  const origPush = history.pushState;
  history.pushState = function (...args) {
    const r = origPush.apply(this, args);
    window.dispatchEvent(new Event('__lw-urlchange'));
    return r;
  };
  const origReplace = history.replaceState;
  history.replaceState = function (...args) {
    const r = origReplace.apply(this, args);
    window.dispatchEvent(new Event('__lw-urlchange'));
    return r;
  };

  window.addEventListener('popstate', sync);
  window.addEventListener('__lw-urlchange', sync);
  sync();
})();`;

const URL_BAR_CSS = `.__lw-browser {
  background: #e2e8f0;
  border-bottom: 1px solid #cbd5e1;
  padding: 8px 12px;
  font-family: system-ui, sans-serif;
}
.__lw-controls { display: flex; gap: 6px; margin-bottom: 8px; }
.__lw-dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.__lw-red    { background: #ef4444; }
.__lw-yellow { background: #eab308; }
.__lw-green  { background: #22c55e; }
.__lw-toolbar { display: flex; align-items: center; gap: 8px; }
.__lw-nav-btn {
  width: 28px; height: 28px; padding: 0;
  border: 1px solid #cbd5e1; background: white;
  border-radius: 50%; cursor: pointer;
  font-size: 14px; color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-family: inherit;
}
.__lw-nav-btn:hover  { background: #f8fafc; color: #0f172a; }
.__lw-nav-btn:active { background: #e2e8f0; }
.__lw-url-bar {
  flex: 1; background: white;
  border: 1px solid #cbd5e1; border-radius: 20px;
  padding: 8px 14px;
  font-family: ui-monospace, monospace; font-size: 14px;
  display: flex; align-items: center; gap: 8px;
}
.__lw-lock   { font-size: 12px; }
.__lw-origin { color: #94a3b8; }
.__lw-path   { color: #0ea5e9; font-weight: 600; }`;

function injectUrlBarIntoHtml(html) {
  const linkTag = '<link rel="stylesheet" href="/__lw-url-bar.css">';
  const scriptTag = '<script src="/__lw-url-bar.js"></' + 'script>';

  let out = html;
  if (out.includes('</head>')) {
    out = out.replace('</head>', `  ${linkTag}\n</head>`);
  } else {
    out = linkTag + '\n' + out;
  }
  if (out.includes('<body>')) {
    out = out.replace('<body>', `<body>\n  ${scriptTag}`);
  } else {
    out = out + '\n' + scriptTag;
  }
  return out;
}

const withUrlBar = (files) => {
  if (!props.showUrlBar) return files;

  const result = { ...files };

  // Hidden helper files — always present, never shown in tabs
  result['/__lw-url-bar.js'] = { code: URL_BAR_JS, hidden: true };
  result['/__lw-url-bar.css'] = { code: URL_BAR_CSS, hidden: true };

  // Inject <link> + <script> into index.html
  const htmlEntry = result['/index.html'];
  if (htmlEntry) {
    if (typeof htmlEntry === 'string') {
      result['/index.html'] = injectUrlBarIntoHtml(htmlEntry);
    } else {
      result['/index.html'] = {
        ...htmlEntry,
        code: injectUrlBarIntoHtml(htmlEntry.code)
      };
    }
  }
  return result;
};

const sandpackFiles = computed(() => {
  if (props.files) {
    return withUrlBar(props.files);
  }

  return withUrlBar({
    '/index.html': props.consoleOnly ? consoleOnlyHTML : defaultHTML,
    '/index.js': props.code,
    '/styles.css': {
      code: defaultCSS.value,
      hidden: true
    }
  });
});

const customSetup = computed(() => ({
  dependencies: {
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

const sandpackProviderOptions = computed(() => ({
  activeFile: props.options.activeFile || (props.consoleOnly ? '/index.js' : '/index.html'),
  initMode: 'user-visible',
  autorun: true,
  autoReload: true,
  recompileMode: 'immediate',
  showConsole: props.consoleOnly ? true : props.showConsole,
  showConsoleButton: props.consoleOnly ? false : true,
  ...props.options
}));

const extensions = [autocompletion()];
const extensionsKeymap = [completionKeymap];
</script>

<style scoped>
.sandbox-container {
  width: 100%;
}

.sandbox-container :deep(.sp-wrapper) {
  width: 100% !important;
}

.sandbox-container :deep(.sp-layout) {
  width: 100% !important;
}

/* Console-only mode: hide preview completely off-screen */
.sandbox-container.console-only-mode :deep(.sp-preview) {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.sandbox-container.console-only-mode :deep(.sp-console-wrapper) {
  height: 100% !important;
  flex: 1 1 auto !important;
  min-height: 200px !important;
}

.sandbox-container.console-only-mode :deep(.sp-console) {
  height: 100% !important;
  flex: 1 !important;
}
</style>
