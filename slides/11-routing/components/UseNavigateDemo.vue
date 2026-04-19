<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router';
import { useState } from 'react';

function Login() {
  const [user, setUser] = useState('');
  // useNavigate returneaza o functie pentru navigare programatica
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.trim()) return;
    // Dupa "login" reusit, navigam la dashboard
    navigate(\`/dashboard/\${user}\`);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Autentificare</h3>
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Nume utilizator"
        style={styles.input}
      />
      <button type="submit" style={styles.btn}>Intra</button>
    </form>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '24px' }}>
      <h3>Salut! Esti logat. 🎉</h3>
      {/* In aplicatia reala am folosi navigate(-1) — inapoi in istoric */}
      <button onClick={() => navigate('/')} style={styles.btn}>
        ← Inapoi la login
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:user" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  form: {
    padding: '24px', display: 'flex', flexDirection: 'column',
    gap: '12px', maxWidth: '300px'
  },
  input: {
    padding: '8px 12px', fontSize: '14px',
    border: '1px solid #cbd5e1', borderRadius: '6px'
  },
  btn: {
    padding: '8px 16px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600
  }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
