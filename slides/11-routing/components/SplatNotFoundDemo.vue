<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link } from 'react-router';

const Acasa = () => <h3>🏠 Acasa</h3>;
const Despre = () => <h3>📖 Despre</h3>;

function NotFound() {
  return (
    <div style={styles.nf}>
      <h2 style={{ fontSize: '48px', margin: 0 }}>404</h2>
      <p>Pagina cautata nu exista.</p>
      <Link to="/" style={styles.link}>← Inapoi acasa</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Acasa</Link>
        <Link to="/despre" style={styles.link}>Despre</Link>
        <Link to="/inexistent" style={styles.link}>Link spre necunoscut</Link>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Acasa />} />
          <Route path="/despre" element={<Despre />} />
          {/* "*" prinde orice URL care nu se potriveste cu rutele de mai sus */}
          <Route path="*" element={<NotFound />} />
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
  main: { padding: '24px' },
  nf: { textAlign: 'center', padding: '20px' }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
