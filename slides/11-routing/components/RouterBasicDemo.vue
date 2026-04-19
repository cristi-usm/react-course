<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link } from 'react-router';

function Acasa() {
  return <h2>🏠 Pagina principala</h2>;
}
function Despre() {
  return <h2>📖 Despre noi</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Acasa</Link>
        <Link to="/despre" style={styles.link}>Despre</Link>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/despre" element={<Despre />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: 'flex', gap: '16px', padding: '12px 16px',
    background: '#f0f9ff', borderBottom: '2px solid #0ea5e9'
  },
  link: { color: '#0ea5e9', textDecoration: 'none', fontWeight: 600 },
  main: { padding: '24px' }
};`

const files = {
  '/App.js': { code: appCode, active: true }
}

const dependencies = {
  'react-router': '^7.1.0'
}
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
