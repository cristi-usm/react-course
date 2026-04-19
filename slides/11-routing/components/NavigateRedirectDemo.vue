<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router';
import { useState } from 'react';

function PaginaProtejata({ user }) {
  // Daca userul nu e logat, redirect declarativ spre /login
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ padding: '24px' }}>
      <h3>🔒 Continut secret</h3>
      <p>Salut, <strong>{user}</strong>!</p>
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <div style={{ padding: '24px' }}>
      <h3>Autentificare necesara</h3>
      <button onClick={() => onLogin('Ana')} style={styles.btn}>
        Logheaza-te ca Ana
      </button>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Acasa</Link>
        <Link to="/secret" style={styles.link}>Secret (protejat)</Link>
        {user && (
          <button onClick={() => setUser(null)} style={styles.logout}>
            Logout
          </button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<p style={{ padding: '24px' }}>Pagina publica</p>} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/secret" element={<PaginaProtejata user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: 'flex', gap: '12px', padding: '12px 16px',
    background: '#f0f9ff', borderBottom: '2px solid #0ea5e9',
    alignItems: 'center'
  },
  link: { color: '#0ea5e9', textDecoration: 'none', fontWeight: 600 },
  btn: {
    padding: '8px 16px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer'
  },
  logout: {
    padding: '4px 12px', background: '#ef4444', color: 'white',
    border: 'none', borderRadius: '4px', cursor: 'pointer',
    marginLeft: 'auto', fontSize: '13px'
  }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
