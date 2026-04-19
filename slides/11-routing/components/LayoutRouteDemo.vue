<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router';

// Layout partajat — fara "path", doar cu "element"
function PublicLayout() {
  return (
    <div>
      <header style={styles.header}>
        <strong>🌐 Site public</strong>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Acasa</Link>
          <Link to="/preturi" style={styles.link}>Preturi</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </nav>
      </header>
      <main style={styles.main}>
        <Outlet />
      </main>
      <footer style={styles.footer}>© 2026 Demo SRL</footer>
    </div>
  );
}

const Acasa = () => <h3>Bine ai venit!</h3>;
const Preturi = () => <h3>Planurile noastre</h3>;
const Contact = () => <h3>hello@demo.ro</h3>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta parinte fara path — doar impartaseste layout-ul */}
        <Route element={<PublicLayout />}>
          <Route index element={<Acasa />} />
          <Route path="preturi" element={<Preturi />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '12px 20px',
    background: '#0ea5e9', color: 'white'
  },
  nav: { display: 'flex', gap: '16px' },
  link: { color: 'white', textDecoration: 'none', fontWeight: 600 },
  main: { padding: '24px', minHeight: '150px' },
  footer: {
    padding: '12px 20px', background: '#f1f5f9',
    color: '#64748b', fontSize: '13px'
  }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="460" />
</template>
