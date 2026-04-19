<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, NavLink } from 'react-router';

function Pagina({ titlu }) {
  return <h3 style={{ padding: '24px' }}>{titlu}</h3>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        {/* NavLink primeste { isActive } automat */}
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive && styles.active)
          })}
        >
          Acasa
        </NavLink>
        <NavLink
          to="/despre"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive && styles.active)
          })}
        >
          Despre
        </NavLink>
        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive && styles.active)
          })}
        >
          Contact
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Pagina titlu="🏠 Acasa" />} />
        <Route path="/despre" element={<Pagina titlu="📖 Despre" />} />
        <Route path="/contact" element={<Pagina titlu="✉️ Contact" />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: 'flex', gap: '4px', padding: '12px',
    background: '#f1f5f9', borderBottom: '1px solid #cbd5e1'
  },
  link: {
    padding: '8px 16px', textDecoration: 'none',
    color: '#475569', borderRadius: '6px', fontWeight: 500
  },
  active: {
    background: '#0ea5e9', color: 'white'
  }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
