<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { useState } from 'react';

function Pagina({ nume }) {
  const [contor, setContor] = useState(0);
  return (
    <div>
      <h3>{nume}</h3>
      <p>Contor local: <strong>{contor}</strong></p>
      <button onClick={() => setContor(contor + 1)} style={styles.counter}>
        +1
      </button>
      <p style={styles.hint}>
        Incearca ambele linkuri. Observa diferenta in contor!
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>✅ Link (fara reload)</Link>
        <a href="/despre" style={styles.link}>❌ a href (cu reload)</a>
      </nav>
      <Routes>
        <Route path="/" element={<Pagina nume="Acasa" />} />
        <Route path="/despre" element={<Pagina nume="Despre" />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: 'flex', gap: '16px', padding: '12px 16px',
    background: '#f0f9ff', borderBottom: '2px solid #0ea5e9'
  },
  link: { color: '#0ea5e9', fontWeight: 600, textDecoration: 'none' },
  counter: {
    padding: '6px 14px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer'
  },
  hint: { marginTop: '16px', color: '#64748b', fontSize: '13px' }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
