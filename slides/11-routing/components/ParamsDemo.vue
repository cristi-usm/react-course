<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';

const utilizatori = {
  '1': { nume: 'Ana', oras: 'Chisinau' },
  '2': { nume: 'Ion', oras: 'Cahul' },
  '3': { nume: 'Maria', oras: 'Balti' }
};

function Profil() {
  // useParams returneaza obiectul cu toti parametrii din URL
  const { userId } = useParams();
  const user = utilizatori[userId];

  if (!user) return <p>Utilizator {userId} negasit.</p>;

  return (
    <div>
      <Link to="/" style={styles.back}>← Lista</Link>
      <h3>Profil #{userId}</h3>
      <p><strong>Nume:</strong> {user.nume}</p>
      <p><strong>Oras:</strong> {user.oras}</p>
    </div>
  );
}

function Lista() {
  return (
    <div>
      <h3>Alege un utilizator:</h3>
      <ul style={styles.list}>
        {Object.entries(utilizatori).map(([id, u]) => (
          <li key={id}>
            <Link to={\`/utilizator/\${id}\`} style={styles.link}>
              {u.nume}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/utilizator/:userId" element={<Profil />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const styles = {
  main: { padding: '24px' },
  list: { listStyle: 'none', padding: 0 },
  link: {
    color: '#0ea5e9', fontWeight: 600,
    textDecoration: 'none', display: 'inline-block', padding: '4px 0'
  },
  back: {
    color: '#64748b', textDecoration: 'none',
    fontSize: '13px', display: 'inline-block', marginBottom: '12px'
  }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
