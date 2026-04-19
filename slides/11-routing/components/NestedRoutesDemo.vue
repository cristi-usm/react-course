<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link, Outlet, Navigate } from 'react-router';

// Dashboard-ul contine meniu lateral + <Outlet /> pentru continut
function Dashboard() {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>📊 Dashboard</div>
        <Link to="/dashboard" style={styles.link}>🏠 Acasa</Link>
        <Link to="/dashboard/profil" style={styles.link}>👤 Profil</Link>
        <Link to="/dashboard/setari" style={styles.link}>⚙️ Setari</Link>
      </aside>
      <section style={styles.content}>
        {/* <Outlet /> randeaza ruta copil activa */}
        <Outlet />
      </section>
    </div>
  );
}

function DashHome() {
  return (
    <div>
      <h3 style={styles.heading}>Bine ai venit!</h3>
      <p style={styles.text}>Selecteaza o sectiune din meniu.</p>
    </div>
  );
}
function Profil() {
  return (
    <div>
      <h3 style={styles.heading}>👤 Profilul meu</h3>
      <p style={styles.text}>Nume: <strong>Ana Popescu</strong></p>
      <p style={styles.text}>Email: <strong>ana@demo.ro</strong></p>
    </div>
  );
}
function Setari() {
  return (
    <div>
      <h3 style={styles.heading}>⚙️ Setari</h3>
      <p style={styles.text}>Tema: <strong>Light</strong></p>
      <p style={styles.text}>Limba: <strong>Romana</strong></p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* ruta index — se afiseaza la /dashboard exact */}
          <Route index element={<DashHome />} />
          <Route path="profil" element={<Profil />} />
          <Route path="setari" element={<Setari />} />
        </Route>
        {/* redirect automat la /dashboard la pornire */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  wrapper: { display: 'flex', minHeight: '260px', fontFamily: 'system-ui' },
  sidebar: {
    width: '170px', padding: '16px', background: '#f1f5f9',
    borderRight: '1px solid #e2e8f0',
    display: 'flex', flexDirection: 'column', gap: '4px'
  },
  brand: { fontWeight: 700, color: '#0ea5e9', marginBottom: '12px', fontSize: '15px' },
  link: {
    color: '#0ea5e9', textDecoration: 'none',
    padding: '8px 10px', borderRadius: '6px',
    fontSize: '14px', display: 'block'
  },
  content: { flex: 1, padding: '24px' },
  heading: { margin: '0 0 12px', color: '#0f172a' },
  text: { margin: '4px 0', color: '#475569', fontSize: '14px' }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
