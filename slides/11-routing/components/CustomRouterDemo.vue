<script setup>
import LiveReact from '../../../common/components/LiveReact.vue'

const appCode = `import { Router, Routes, Route, Link } from './router';

function Acasa() {
  return <h2>🏠 Bine ai venit acasa!</h2>;
}
function Despre() {
  return <h2>📖 Despre proiectul nostru</h2>;
}
function Contact() {
  return <h2>✉️ Scrie-ne la hello@demo.ro</h2>;
}

export default function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Acasa</Link>
        <Link to="/despre" style={styles.link}>Despre</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path="/"><Acasa /></Route>
          <Route path="/despre"><Despre /></Route>
          <Route path="/contact"><Contact /></Route>
        </Routes>
      </main>
    </Router>
  );
}

const styles = {
  nav: {
    display: 'flex', gap: '12px', padding: '12px 16px',
    background: '#f1f5f9', borderBottom: '2px solid #0ea5e9'
  },
  link: {
    color: '#0ea5e9', textDecoration: 'none',
    fontWeight: 600, padding: '6px 12px'
  },
  main: { padding: '24px' }
};`

const routerCode = `import { createContext, useContext, useState, useEffect } from 'react';

// Context-ul tine minte URL-ul curent si expune functia push
const RouterContext = createContext({ location: '/', push: () => {} });

export function Router({ children }) {
  const [location, setLocation] = useState(window.location.pathname);

  // push: schimba URL-ul + declanseaza re-render
  const push = (newPath) => {
    window.history.pushState({}, '', newPath);
    setLocation(newPath);
  };

  // popstate: sincronizeaza state-ul cu Back/Forward din browser
  useEffect(() => {
    const onPop = () => setLocation(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <RouterContext.Provider value={{ location, push }}>
      {children}
    </RouterContext.Provider>
  );
}

// Link: previne reload-ul nativ si apeleaza push
export function Link({ to, children, ...rest }) {
  const { push } = useContext(RouterContext);
  const handleClick = (e) => {
    e.preventDefault();
    push(to);
  };
  return <a href={to} onClick={handleClick} {...rest}>{children}</a>;
}

// Route: marker simplu care poarta path-ul si copiii
export function Route({ children }) {
  return children;
}

// Routes: alege ce Route corespunde cu URL-ul curent
export function Routes({ children }) {
  const { location } = useContext(RouterContext);
  const array = Array.isArray(children) ? children : [children];

  for (const route of array) {
    if (route.props.path === location) return route;
  }
  return <p>404 — Pagina nu exista</p>;
}`

const files = {
  '/App.js': { code: appCode, active: true },
  '/router.js': { code: routerCode }
}
</script>

<template>
  <LiveReact :files="files" :showTabs="true" :showUrlBar="true" :editorHeight="380" />
</template>
