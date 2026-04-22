<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router';
import { useState } from 'react';

function Checkout() {
  const navigate = useNavigate();
  const [produs, setProdus] = useState('Curs React');

  const handleBuy = () => {
    const orderNumber = Math.floor(Math.random() * 9000) + 1000;
    const total = 299;

    // Transmitem un obiect intreg catre pagina urmatoare,
    // FARA sa-l punem in URL. URL-ul ramane curat: /confirmare
    navigate('/confirmare', {
      state: { orderNumber, total, produs }
    });
  };

  return (
    <div style={styles.page}>
      <h3>🛒 Checkout</h3>
      <label style={styles.label}>
        Produs:
        <input
          value={produs}
          onChange={(e) => setProdus(e.target.value)}
          style={styles.input}
        />
      </label>
      <button onClick={handleBuy} style={styles.btn}>
        Cumpara (299 lei)
      </button>
    </div>
  );
}

function Confirmare() {
  // useLocation returneaza un obiect cu pathname, search, hash, state
  const location = useLocation();

  // state poate fi null daca userul deschide direct /confirmare
  const date = location.state;

  if (!date) {
    return (
      <div style={styles.page}>
        <h3>⚠️ Nicio comanda gasita</h3>
        <p>Ai ajuns aici fara sa treci prin checkout.</p>
        <Link to="/" style={styles.link}>← Inapoi</Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h3>✅ Comanda #{date.orderNumber}</h3>
      <p>Produs: <strong>{date.produs}</strong></p>
      <p>Total: <strong>{date.total} lei</strong></p>
      <p style={styles.hint}>
        💡 URL-ul este <code>/confirmare</code> — curat, fara date sensibile.
      </p>
      <Link to="/" style={styles.link}>← Inapoi la checkout</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/confirmare" element={<Confirmare />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  page: {
    padding: '24px', display: 'flex', flexDirection: 'column',
    gap: '12px', maxWidth: '360px'
  },
  label: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' },
  input: {
    padding: '8px 12px', fontSize: '14px',
    border: '1px solid #cbd5e1', borderRadius: '6px'
  },
  btn: {
    padding: '10px 16px', background: '#0ea5e9', color: 'white',
    border: 'none', borderRadius: '6px', cursor: 'pointer',
    fontWeight: 600, fontSize: '14px'
  },
  link: { color: '#0ea5e9', fontWeight: 600 },
  hint: {
    fontSize: '12px', background: '#f0f9ff', padding: '8px 12px',
    borderRadius: '6px', border: '1px solid #bae6fd', margin: 0
  }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
