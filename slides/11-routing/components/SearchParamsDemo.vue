<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { BrowserRouter, useSearchParams } from 'react-router';

const produse = [
  { id: 1, nume: 'Laptop', categorie: 'tech' },
  { id: 2, nume: 'Carte React', categorie: 'carti' },
  { id: 3, nume: 'Telefon', categorie: 'tech' },
  { id: 4, nume: 'Carte JS', categorie: 'carti' },
  { id: 5, nume: 'Casti', categorie: 'tech' }
];

function Magazin() {
  // useSearchParams expune URLSearchParams standard
  const [searchParams, setSearchParams] = useSearchParams();
  const categorie = searchParams.get('categorie') ?? 'toate';

  const filtrate = categorie === 'toate'
    ? produse
    : produse.filter(p => p.categorie === categorie);

  const schimba = (e) => {
    setSearchParams({ categorie: e.target.value });
  };

  return (
    <div>
      <h3>Magazin</h3>
      <label style={styles.label}>
        Categorie:
        <select value={categorie} onChange={schimba} style={styles.select}>
          <option value="toate">Toate</option>
          <option value="tech">Tech</option>
          <option value="carti">Carti</option>
        </select>
      </label>
      <ul style={styles.list}>
        {filtrate.map(p => <li key={p.id}>{p.nume}</li>)}
      </ul>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><Magazin /></BrowserRouter>;
}

const styles = {
  label: { display: 'block', margin: '12px 0' },
  select: { marginLeft: '8px', padding: '6px 12px', fontSize: '14px' },
  url: {
    fontFamily: 'monospace', background: '#f1f5f9',
    padding: '8px 12px', borderRadius: '6px', fontSize: '13px'
  },
  list: { listStyle: 'none', padding: 0 }
};`

const files = { '/App.js': { code: appCode, active: true } }
const dependencies = { 'react-router': '^7.1.0' }
</script>

<template>
  <LiveReact :files="files" :dependencies="dependencies" :showUrlBar="true" :editorHeight="380" />
</template>
