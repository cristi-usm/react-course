---
title: 'React Course'
theme: neversink
transition: slide-left
layout: cover
color: sky-light
info: 'React Course · Crudu Cristian · 2026'
lineNumbers: true
draw:
  enabled: true
favicon: './react.svg'
---

# Navigare & Rutare
De la `window.location` la React Router v7

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>


---
layout: cover
align: c
color: sky-light
---


<SpeechBubble position="b" color="sky" shape="round" animation="float" textAlign="center" >

# Ce tip de aplicații am construit până acum?

Toate exemplele noastre rulau într-o singură pagină HTML, iar React schimba doar ce se vede. Cum se numește acest tip de aplicație?
</SpeechBubble>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# MPA vs. SPA

:: content ::

<div class="grid grid-cols-2 gap-6 text-base ns-c-tight">

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-5">

### MPA — Multi-Page App

- Fiecare link = **cerere HTTP nouă**
- Browserul **reîncarcă** complet pagina
- Serverul trimite un **HTML nou** pentru fiecare URL
- State-ul aplicației se **pierde** la fiecare navigare

```
Click pe /despre
   ↓
GET /despre
   ↓
HTML nou → reload total
```

</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-5">

### SPA — Single-Page App

- Un singur fișier `index.html` la încărcare
- JavaScript **înlocuiește** componentele în DOM
- URL-ul se schimbă **fără reload**
- State-ul aplicației **se păstrează** între „pagini"

```
Click pe /despre
   ↓
JS schimbă URL + randare
   ↓
Fără request, fără reload
```

</div>

</div>

<AdmonitionType type="info">

**React este o librărie SPA**: produce un singur `<div id="root">` și randează un arbore de componente. Dar cum schimbăm „pagina" fără să pierdem state-ul?

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema concretă

:: content ::

Până acum, toate aplicațiile noastre aveau **o singură pagină**. Într-un site real, fiecare secțiune are propriul URL:

<div class="grid grid-cols-2 gap-6 text-sm mt-4">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-5">

### URL-uri din viața reală

<div class="space-y-2 mt-3 font-mono text-xs">

<div class="bg-white border border-sky-200 rounded px-3 py-2">
  <span class="text-sky-700 font-bold">/produse</span>
  <span class="text-slate-500"> — catalog</span>
</div>

<div class="bg-white border border-sky-200 rounded px-3 py-2">
  <span class="text-sky-700 font-bold">/produse/42</span>
  <span class="text-slate-500"> — detaliile unui produs</span>
</div>

<div class="bg-white border border-sky-200 rounded px-3 py-2">
  <span class="text-sky-700 font-bold">/profil?tab=setari</span>
  <span class="text-slate-500"> — tab activ în profil</span>
</div>

<div class="bg-white border border-sky-200 rounded px-3 py-2">
  <span class="text-sky-700 font-bold">/cos</span>
  <span class="text-slate-500"> — coșul de cumpărături</span>
</div>

</div>

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">

### Fiecare URL trebuie să...

<div class="space-y-2 mt-3 text-xs">

<div class="bg-white border border-amber-200 rounded px-3 py-2">
  <span class="text-amber-800 font-bold">afișeze</span>
  <span class="text-slate-500"> — un component diferit</span>
</div>

<div class="bg-white border border-amber-200 rounded px-3 py-2">
  <span class="text-amber-800 font-bold">suporte</span>
  <span class="text-slate-500"> — Back / Forward nativ</span>
</div>

<div class="bg-white border border-amber-200 rounded px-3 py-2">
  <span class="text-amber-800 font-bold">fie partajabil</span>
  <span class="text-slate-500"> — copy-paste linkul</span>
</div>

<div class="bg-white border border-amber-200 rounded px-3 py-2">
  <span class="text-amber-800 font-bold">îi poți face bookmark</span>
  <span class="text-slate-500"> — salvat în browser</span>
</div>

</div>

</div>

</div>


---
layout: cover
align: c
color: sky-light
---


<SpeechBubble position="b" color="sky" shape="round" animation="float" textAlign="center" >

# Cum ați rezolvat asta până acum?

Aveai nevoie să afișezi componente diferite la momente diferite. Ce ai folosit ca să treci de la unul la altul?
</SpeechBubble>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce nu e suficient `useState`?

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div>

**Prima idee naivă**: ținem pagina curentă în state:

```jsx
function App() {
  const [pagina, setPagina] = useState('acasa');

  if (pagina === 'acasa') return <Acasa />;
  if (pagina === 'despre') return <Despre />;
  return <NotFound />;
}
```

Pare că funcționează... dar URL-ul **nu se schimbă niciodată**.

</div>

<div class="mb-4 bg-rose-50 border-2 border-rose-300 rounded-xl p-4 ns-c-tight" >

### ❌ Ce se strică

- URL-ul rămâne `/` — user-ul **nu poate partaja** linkul
- Butonul **Back** din browser nu face nimic util
- **Refresh** → pierdem pagina curentă
- **Bookmark-urile** nu funcționează
- SEO / analytics nu pot distinge paginile

</div>

</div>

<AdmonitionType type="warning">

**Concluzie**: avem nevoie de o mecanică ce sincronizează **URL-ul browserului** cu **componentul randat**. Asta se numește **client-side routing**.

</AdmonitionType>


---
layout: section
color: sky-light
---

# Construim un router FOARTE primitiv
#### Înțelegem ce face, de fapt, o librărie de routing


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Piesele din browser de care avem nevoie

:: content ::

Browserul ne oferă **trei API-uri** exact pentru acest scop:

<div class="grid grid-cols-3 gap-4 text-sm mt-2">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">
  <div class="font-bold text-sky-800 mb-2">

1. `window.location.pathname`

</div>
  <p>Sursa de adevăr pentru URL-ul curent. Citim <strong>doar path-ul</strong> și decidem ce component trebuie randat.</p>

```js
window.location.pathname
// "/produse/42"
```

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
  <div class="font-bold text-amber-800 mb-2">

2. `history.pushState()`

</div>
  <p>Adăugăm o intrare nouă în <strong>stiva cu istoric</strong> a browserului. URL-ul se schimbă, dar browserul <strong>nu cere HTML nou de la server</strong> și <strong>nu reîncarcă pagina</strong> — DOM-ul și state-ul JavaScript rămân intacte.</p>

```js
history.pushState(
  {}, '', '/despre'
);
```

</div>

<div class="bg-green-50 border-2 border-green-300 rounded-xl p-4">
  <div class="font-bold text-green-800 mb-2">

3. `popstate` event

</div>
  <p>Browserul <strong>ne anunță</strong> când user-ul apasă <strong>Back / Forward</strong>. URL-ul se schimbă automat, iar noi re-randăm componentul potrivit pentru noul path.</p>

```js
window.addEventListener(
  'popstate', handler
);
```

</div>

</div>

<AdmonitionType type="info">

Toate librăriile de routing (React Router, TanStack Router, etc.) sunt **un wrapper** peste aceste trei API-uri.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# API-ul browserului în JS pur

:: content ::

Apasă butoanele, apoi folosește **Back / Forward** din browser. Urmărește URL-ul și consola — observă cum `pushState` și `popstate` lucrează împreună.

<PushStateDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Arhitectura routerului nostru

:: content ::

Patru piese comunică printr-un singur **Context** care expune `location` + `push`:

<div class="grid grid-cols-4 gap-3 text-xs mt-3">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
  <div class="text-[10px] uppercase tracking-wide text-sky-600 font-bold">Provider</div>
  <div class="font-bold text-sky-900 text-sm mt-1">&lt;Router&gt;</div>
  <div class="text-slate-600 mt-2">Ține minte URL-ul curent și expune <code>location</code> + <code>push</code> prin Context.</div>
</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
  <div class="text-[10px] uppercase tracking-wide text-amber-700 font-bold">Navigator</div>
  <div class="font-bold text-amber-900 text-sm mt-1">&lt;Link&gt;</div>
  <div class="text-slate-600 mt-2">Previne reload-ul nativ al <code>&lt;a&gt;</code> și apelează <code>push(to)</code>.</div>
</div>

<div class="bg-green-50 border-2 border-green-300 rounded-xl p-3">
  <div class="text-[10px] uppercase tracking-wide text-green-700 font-bold">Potrivitor</div>
  <div class="font-bold text-green-900 text-sm mt-1">&lt;Routes&gt;</div>
  <div class="text-slate-600 mt-2">Citește <code>location</code> și alege ce <code>&lt;Route&gt;</code> se potrivește.</div>
</div>

<div class="bg-slate-50 border-2 border-slate-300 rounded-xl p-3">
  <div class="text-[10px] uppercase tracking-wide text-slate-600 font-bold">Marcator</div>
  <div class="font-bold text-slate-900 text-sm mt-1">&lt;Route&gt;</div>
  <div class="text-slate-600 mt-2">Doar poartă <code>path</code> și <code>children</code> — nu face nimic singur.</div>
</div>

</div>

<div class="grid grid-cols-2 gap-4 mt-5 text-sm">

<pre class="bg-white border-2 border-sky-200 rounded-xl p-4 font-mono text-xs leading-relaxed m-0 whitespace-pre"><span class="text-sky-700 font-bold">&lt;Router&gt;</span>                       <span class="text-slate-400">// Provider</span>
  ├─ <span class="text-amber-700 font-bold">&lt;Link to="/"&gt;</span>           <span class="text-slate-400">// cheamă push()</span>
  └─ <span class="text-green-700 font-bold">&lt;Routes&gt;</span>                <span class="text-slate-400">// citește location</span>
       ├─ <span class="text-slate-700 font-bold">&lt;Route path="/"&gt;</span>
       └─ <span class="text-slate-700 font-bold">&lt;Route path="/despre"&gt;</span>
</pre>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4 text-xs">

**Un click, pas cu pas:**

<div class="space-y-2 mt-2">

<div class="flex gap-2 items-start">
  <div class="shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">1</div>
  <div>User dă click pe <code class="text-amber-700">&lt;Link to="/despre"&gt;</code></div>
</div>

<div class="flex gap-2 items-start">
  <div class="shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">2</div>
  <div><code class="text-amber-700">&lt;Link&gt;</code> citește <code>push</code> din Context și apelează <code>push('/despre')</code></div>
</div>

<div class="flex gap-2 items-start">
  <div class="shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">3</div>
  <div><code class="text-sky-700">&lt;Router&gt;</code> actualizează state-ul: <code>location = '/despre'</code> — Context-ul primește valoare nouă</div>
</div>

<div class="flex gap-2 items-start">
  <div class="shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">4</div>
  <div><code class="text-green-700">&lt;Routes&gt;</code> se re-randează, găsește care se potrivește și afișează <code>&lt;Route path="/despre"&gt;</code></div>
</div>

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<Router>` — provider-ul de Context

:: content ::

```jsx
const RouterContext = createContext({ location: '/', push: () => {} });

export function Router({ children }) {
  const [location, setLocation] = useState(window.location.pathname);

  // push: schimbă URL-ul + forțează re-render
  const push = (newPath) => {
    window.history.pushState({}, '', newPath);
    setLocation(newPath);
  };

  // popstate: Back / Forward din browser
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
```


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<Link>` — navigare fără reload

:: content ::

```jsx
export function Link({ to, children, ...rest }) {
  const { push } = useContext(RouterContext);

  const handleClick = (e) => {
    e.preventDefault();  // oprește reload-ul nativ al <a>
    push(to);            // schimbă URL-ul prin routerul nostru
  };

  return <a href={to} onClick={handleClick} {...rest}>{children}</a>;
}
```

<AdmonitionType type="info">

Păstrăm `<a href>` pentru **accesibilitate** (screen readers, click-dreapta → „Open in new tab"), dar interceptăm click-ul obișnuit pentru a evita reload-ul.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<Routes>` și `<Route>` — potrivirea URL-ului

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**`Route` este un marker** — doar poartă `path` și copiii:

```jsx
export function Route({ children }) {
  return children;
}
```

**`Routes` alege** ce să randeze în funcție de `location`:

```jsx
export function Routes({ children }) {
  const { location } = useContext(RouterContext);
  const array = Array.isArray(children)
    ? children : [children];

  for (const route of array) {
    if (route.props.path === location) {
      return route;
    }
  }
  return <p>404 — negăsit</p>;
}
```

</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

Utilizare:

```jsx
<Router>
  <Link to="/">Acasă</Link>
  <Link to="/despre">Despre</Link>

  <Routes>
    <Route path="/">
      <Acasa />
    </Route>
    <Route path="/despre">
      <Despre />
    </Route>
  </Routes>
</Router>
```

Potrivirea e **comparație de stringuri** — simplu și limitat.

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Demo: Routerul nostru în acțiune

:: content ::

Deschide tab-ul `router.js` pentru a vedea implementarea completă. Navighează cu linkurile, apoi cu **Back / Forward**.

<CustomRouterDemo />


---
layout: section
color: sky-light
---

# Limitele implementării noastre
#### De ce avem nevoie de o librărie matură


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Ce NU poate face routerul nostru

:: content ::

<div class="grid grid-cols-2 gap-4 text-sm">

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 mb-2">❌ Parametri dinamici</div>
  <p>Nu putem scrie <code>/users/:id</code> — matching-ul e doar verificarea stringurilor.</p>
</div>

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 mb-2">❌ Rute imbricate</div>
  <p>Layout-uri partajate (sidebar + conținut) nu se pot exprima.</p>
</div>

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 mb-2">❌ Catchall / 404</div>
  <p>Nu avem wildcard <code>*</code> pentru pagini inexistente.</p>
</div>

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 mb-2">❌ Query strings</div>
  <p>Nu știm să citim <code>?categorie=tech</code> din URL.</p>
</div>

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 mb-2">
  
❌ `replace` vs `push`

</div>
  <p>Nu distingem între navigare nouă și înlocuirea istoriei.</p>
</div>

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">
  <div class="font-bold text-rose-800 mb-2">❌ Scroll restoration</div>
  <p>La Back, pagina nu revine la poziția de scroll anterioară.</p>
</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Putem... dar nu trebuie

:: content ::

<div class="text-base space-y-4">

Putem adăuga toate aceste funcționalități manual:

- Regex pentru parametri → `/users/:id`
- Structuri de arbore pentru rute imbricate
- Parser pentru query string
- Context global pentru scroll position
- ...și tot așa.

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mt-4">

**Dar cineva a făcut deja toate acestea — bine, testat, documentat, folosit de milioane de aplicații.**

În loc să reinventăm roata, folosim o librărie **battle-tested**. Trecem la cel mai popular router din ecosistemul React.

</div>

</div>


---
layout: section
color: sky-light
---

# React Router
#### Cea mai populară librărie de routing pentru React


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# De ce React Router?

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div class="space-y-3">

- **~53 milioane** de descărcări pe săptămână
- Dezvoltat de echipa **Remix** (acum parte din Shopify)
- **Activ** — v7 lansat în 2024, v7.1+ în 2025
- Funcționează în orice aplicație React: SPA, SSR, Vite, Next 
- Documentație excelentă: [reactrouter.com](https://reactrouter.com/home)

</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-5">

**Alternative cunoscute:**

- **TanStack Router** — type-safe, modern
- **Wouter** — ultra-minimalist
- **Router nativ din alte frameworkuri** — Next.js, Remix, Tanstack Start

**Pentru învățare**, React Router este alegerea standard — cele mai multe tutoriale și proiecte reale îl folosesc.

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cele 3 moduri ale React Router v7

:: content ::

React Router oferă **trei strategii** cu diferite niveluri de flexibilitate și complexitate:

<div class="grid grid-cols-3 gap-4 text-sm my-2">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

**Declarative**

**Ce face:** doar URL ↔ component. `<Routes>`, `<Route>`, `<Link>`, hooks.

**Când:** SPA-uri simple, învățare, proiecte mici/medii.

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

**Data**

**Ce face:** + `loader` / `action` / pending UI prin `createBrowserRouter`.

**Când:** aplicații cu mult data fetching legat de rute.

</div>

<div class="bg-green-50 border-2 border-green-300 rounded-xl p-4">

**Framework**

**Ce face:** SSR, file-based routing, type-safe routes. Succesorul Remix.

**Când:** aplicații full-stack production.

</div>

</div>

<AdmonitionType type="info">

**În acest curs folosim modul `declarative`** — cel mai simplu, cel mai apropiat de ce am învățat deja (JSX + hooks). Modurile `data` și `framework` sunt excelente pentru explorare ulterioară.

</AdmonitionType>


---
layout: section
color: sky-light
---

# Instalare și setup
#### Primii pași cu React Router v7


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Instalare

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div>

```bash
npm install react-router
```

**Cerințe minime:**

- Node.js 20+
- React 18+

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">

### ⚠️ Atenție la versiune!

În v7, pachetul se numește **`react-router`** (un singur pachet).

În v5 / v6 era `react-router-dom`. **~90% din tutorialele online** folosesc încă vechiul nume — dacă vezi `from 'react-router-dom'` într-un tutorial recent, e un semnal că e scris pentru v6.

```js
// ✅ v7
import { Link } from 'react-router';

// ❌ vechi (v5/v6)
import { Link } from 'react-router-dom';
```

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<BrowserRouter>` la rădăcină

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**`main.jsx`** — învelește aplicația o singură dată:

```jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

</div>

<div>

**`App.jsx`** — definește rutele:

```jsx
import { Routes, Route } from 'react-router';
import Acasa from './pages/Acasa';
import Despre from './pages/Despre';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Acasa />} />
      <Route path="/despre" element={<Despre />} />
    </Routes>
  );
}
```

</div>

</div>

<AdmonitionType type="info">

`<BrowserRouter>` folosește **`history.pushState`** intern — exact ca routerul nostru custom. Doar că e mult mai robust.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Primul nostru app cu React Router

:: content ::

Un exemplu minim: două pagini, un `<Link>` între ele. Observă cât de concis e codul față de routerul nostru custom.

<RouterBasicDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Anatomia unei rute

:: content ::

```jsx
<Routes>
  <Route path="/" element={<Acasa />} />
  <Route path="/despre" element={<Despre />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

<div class="grid grid-cols-2 gap-6 text-base mt-4 ns-c-tight">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

**`<Routes>`** — containerul

- Poate apărea **oriunde** în arbore
- Alege **O SINGURĂ** rută — cea mai specifică
- Înlocuiește `<Switch>` din v5

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

**`<Route>`** — definiția rutei

- `path` — pattern-ul URL-ului
- `element` — JSX-ul care se randează
- **Atenție v5**: era `component={X}`, acum e `element={<X />}`

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<Link>` vs. `<a>`

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm mb-5 ">

<div class="bg-rose-50 border-2 border-rose-300 rounded-xl p-4">

### ❌ `<a href="/despre">`

- **Reload complet** al paginii
- Pierde tot state-ul aplicației
- Re-descarcă JS-ul
- Destinat site-urilor statice

```jsx
<a href="/despre">Despre</a>
```

</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

### ✅ `<Link to="/despre">`

- **Fără reload** — doar JS
- State-ul se păstrează
- Instant
- Destinat SPA-urilor

```jsx
import { Link } from 'react-router';

<Link to="/despre">Despre</Link>
```

</div>

</div>

<AdmonitionType type="tip">

**Regulă de aur**: în aplicațiile React, folosește `<Link>` pentru navigarea **internă** și `<a>` doar pentru linkuri **externe**.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Link vs. a href

:: content ::

Incrementează contorul, apoi încearcă ambele linkuri. Observă că **`<Link>` păstrează state-ul**, în timp ce `<a href>` îl resetează la zero (reload complet).

<RouterLinkDemo />


---
layout: section
color: sky-light
---

# Rute dinamice și parametri
#### `/users/:id`, query strings, `useLocation`


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Segmente dinamice cu `:param`

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

```jsx
<Routes>
  <Route
    path="/utilizator/:userId"
    element={<Profil />}
  />
</Routes>
```

`:userId` este un **placeholder**. Se potrivește cu:

- `/utilizator/1` → `userId = "1"`
- `/utilizator/ana` → `userId = "ana"`
- `/utilizator/42abc` → `userId = "42abc"`

Dar **nu** cu `/utilizator` (lipsește valoarea) sau `/utilizator/1/edit` (prea multe segmente).

</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

### Hook-ul `useParams()`

```jsx
import { useParams } from 'react-router';

function Profil() {
  const { userId } = useParams();

  return <h2>Profil #{userId}</h2>;
}
```

- Returnează un **obiect** cu toți parametrii
- Numele cheii = numele din `path`
- Valorile sunt **mereu string-uri**

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# `useParams` în acțiune

:: content ::

Click pe un utilizator din listă. URL-ul se schimbă în `/utilizator/1`, iar componentul `Profil` citește id-ul din URL cu `useParams`.

<ParamsDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Query strings cu `useSearchParams`

:: content ::

<div class="mb-3">
<div class="bg-slate-800 text-white rounded-xl px-5 py-3 font-mono text-base flex items-center gap-0 flex-wrap">
  <span class="text-slate-400">https://demo.local</span><span class="text-emerald-400">/magazin</span><span class="text-yellow-300">?</span><span class="text-sky-300">categorie</span><span class="text-yellow-300">=</span><span class="text-orange-300">tech</span><span class="text-yellow-300">&amp;</span><span class="text-sky-300">sort</span><span class="text-yellow-300">=</span><span class="text-orange-300">pret</span>
</div>
<div class="flex gap-0 font-mono text-xs mt-1 flex-wrap">
  <span class="text-slate-400 w-[173px] text-center">origin</span>
  <span class="text-emerald-600 w-[70px] text-center">pathname</span>
  <span class="text-sky-600 text-center">&nbsp;&nbsp;&nbsp;&nbsp;↑──────── query string (searchParams) ────────↑</span>
</div>
</div>

<div class="grid grid-cols-2 gap-5 text-sm mt-1">

<div class="flex flex-col gap-3">

`useSearchParams` returnează un tuple similar cu `useState`:

```jsx
const [params, setParams] = useSearchParams();

// citire
const categorie = params.get('categorie') ?? 'toate';

// scriere — actualizează URL-ul fără reload
setParams({ categorie: 'tech', sort: 'pret' });
```

<div class="bg-sky-50 border-2 border-sky-200 rounded-xl p-3">

**`params` = `URLSearchParams` nativ:**

```js
params.get('cheie')    // "valoare" | null
params.has('cheie')    // boolean
params.getAll('cheie') // [...]
```

</div>

</div>

<div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-3">

**Segmente vs Query params:**

| | Segmente `:id` | Query `?sort=` |
|---|---|---|
| **Când** | ID-uri esențiale | filtre, sortare |
| **Exemplu** | `/user/42` | `?page=2&sort=pret` |

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# `useSearchParams`

:: content ::

Schimbă categoria din dropdown. Observă cum URL-ul se actualizează (`?categorie=tech`), iar lista se filtrează automat.

<SearchParamsDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `useLocation` — acces la tot URL-ul

:: content ::

```jsx
import { useLocation } from 'react-router';

function DebugPanel() {
  const location = useLocation();

  return (
    <pre>
      {JSON.stringify(location, null, 2)}
    </pre>
  );
}
```

Obiectul `location` conține:

<div class="grid grid-cols-2 gap-4 text-sm mt-2">

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <code class="font-bold">pathname</code> — calea (ex: <code>/produse/42</code>)
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <code class="font-bold">search</code> — query string (ex: <code>?sort=pret</code>)
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <code class="font-bold">hash</code> — hash-ul (ex: <code>#sectiune-2</code>)
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <code class="font-bold">state</code> — date trimise prin <code>navigate(to, &#123; state &#125;)</code>
</div>

</div>


---
layout: section
color: sky-light
---

# Rute imbricate și layouturi
#### `<Outlet />`, rute index , rute layout


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Problema: layout partajat

:: content ::

<div class="grid grid-cols-2 gap-6 text-base">

<div>

Într-un dashboard real, **meniul lateral** apare pe toate paginile. Nu vrem să-l copiem în fiecare component:

```jsx
// ❌ Duplicat peste tot
function PaginaProfil() {
  return (
    <>
      <Sidebar />
      <h1>Profilul meu</h1>
    </>
  );
}
function PaginaSetari() {
  return (
    <>
      <Sidebar />
      <h1>Setări</h1>
    </>
  );
}
```

</div>

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-5">

### Soluția: rute imbricate

Un **părinte** randează layout-ul și un **`<Outlet />`** unde apar copiii:

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Home />} />
  <Route path="profil" element={<Profil />} />
  <Route path="setari" element={<Setari />} />
</Route>
```

La `/dashboard/profil`, React Router randează:
- `<Dashboard />` (layout-ul)
- cu `<Profil />` în `<Outlet />`

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<Outlet />` — locul copiilor

:: content ::

```jsx
import { Outlet, Link } from 'react-router';

function Dashboard() {
  return (
    <div className="layout">
      <aside>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/profil">Profil</Link>
        <Link to="/dashboard/setari">Setări</Link>
      </aside>

      <main>
        <Outlet />   {/* ← aici apare ruta copil */}
      </main>
    </div>
  );
}
```

<AdmonitionType type="info">

**`<Outlet />` e similar cu `children`** — dar în loc să-l transmiți explicit ca prop, React Router îl „injectează" în funcție de URL.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Rute index și rute layout 

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

### Rute index

Ce se afișează la URL-ul **exact** al părintelui?

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Home />} />
  <Route path="profil" element={<Profil />} />
</Route>
```

- `/dashboard` → `<Dashboard />` + `<Home />`
- `/dashboard/profil` → `<Dashboard />` + `<Profil />`

**`index`** înseamnă „ruta implicită a părintelui". Nu are `path`.

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

### Rute layout (fără `path`)

Un părinte **fără URL** care doar împărtășește un layout:

```jsx
<Route element={<PublicLayout />}>
  <Route index element={<Acasa />} />
  <Route path="preturi" element={<Preturi />} />
  <Route path="contact" element={<Contact />} />
</Route>
```

URL-urile rămân `/`, `/preturi`, `/contact`, dar toate trei folosesc același `<PublicLayout />`.

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Rute imbricate

:: content ::

Dashboard cu sidebar și index route. La `/dashboard` se afișează home-ul; la `/dashboard/profil` — profilul, etc. Layout-ul rămâne același.

<NestedRoutesDemo />


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Rută layout fără path

:: content ::

Toate paginile publice împart același header și footer. Ruta părinte nu are `path` — doar împărtășește layout-ul.

<LayoutRouteDemo />


---
layout: section
color: sky-light
---

# Navigare programatică
#### `useNavigate`, `<NavLink>`


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `useNavigate` — navigare din cod

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

Când navigarea **NU** e declanșată de un click (ex: submit de formular, timeout, callback), folosim `useNavigate`:

```jsx
import { useNavigate } from 'react-router';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
    // După login reușit, trecem la dashboard
    navigate('/dashboard');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

### Variante utile

```jsx
// Navigare simplă (push în history)
navigate('/dashboard');

// Înlocuiește ultima intrare (nu apare în Back)
navigate('/dashboard', { replace: true });

// Back / Forward programatic
navigate(-1);  // ca butonul Back
navigate(1);   // ca butonul Forward

// Cu state custom
navigate('/detail', {
  state: { from: 'lista' }
});
```

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Când `<Link>`, când `useNavigate`?

:: content ::

<div class="grid grid-cols-2 gap-6 text-base mb-5">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-5">

### Folosește `<Link>`

- User-ul face **click** pentru a naviga
- Este **navigare principală**: meniu, butoane „Vezi detalii", „Înapoi la listă"
- Vrei ca **click-dreapta → Open in new tab** să funcționeze
- Vrei beneficii de accesibilitate (tastatură, screen readers)

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-5">

### Folosește `useNavigate`

- Navigarea se întâmplă **în urma unei logici**: după submit, după fetch, la timeout
- Navighezi **condițional**: `if (error) navigate('/login')`
- Faci **back programatic** după un flow: `navigate(-1)`

</div>

</div>

<AdmonitionType type="warning">

**Anti-pattern**: un buton `<button onClick={() => navigate('/x')}>` când un `<Link>` ar face același lucru. Pierzi accesibilitatea și funcționalitățile native ale linkurilor.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# `useNavigate` după submit

:: content ::

Scrie un nume și apasă „Intră". După submit, `useNavigate` ne duce la `/dashboard/:user`. Apoi apasă „Înapoi" — `navigate(-1)` face Back.

<UseNavigateDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cum transmitem date între pagini?

:: content ::

Avem **trei mecanisme**, fiecare cu rolul său:

<div class="grid grid-cols-3 gap-4 text-sm mt-2 mb-5">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4 ">
  <div class="font-bold text-sky-800 mb-2">1. Segmente <code>:param</code></div>
  <div class="font-mono text-xs bg-white border border-sky-200 rounded px-2 py-1 mb-2">/produs/42</div>
  <ul class="text-xs space-y-1 list-none m-0 p-0 ns-c-tight">
    <li>✅ În URL — <strong>shareable</strong></li>
    <li>✅ Păstrat la refresh</li>
    <li>❌ Doar string-uri</li>
    <li>❌ Apare public</li>
  </ul>
  <div class="text-xs mt-2 pt-2 border-t border-sky-200"><strong>Pentru:</strong> ID-uri esențiale</div>
</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">
  <div class="font-bold text-amber-800 mb-2">2. Query string <code>?x=1</code></div>
  <div class="font-mono text-xs bg-white border border-amber-200 rounded px-2 py-1 mb-2">/magazin?sort=pret</div>
  <ul class="text-xs space-y-1 list-none m-0 p-0 ns-c-tight">
    <li>✅ În URL — <strong>shareable</strong></li>
    <li>✅ Păstrat la refresh</li>
    <li>❌ Doar string-uri</li>
    <li>❌ Apare public</li>
  </ul>
  <div class="text-xs mt-2 pt-2 border-t border-amber-200"><strong>Pentru:</strong> filtre, sortare, paginare</div>
</div>

<div class="bg-green-50 border-2 border-green-300 rounded-xl p-4">
  <div class="font-bold text-green-800 mb-2">3. <code>navigate(to, &#123; state &#125;)</code></div>
  <div class="font-mono text-xs bg-white border border-green-200 rounded px-2 py-1 mb-2">state: &#123; deUnde: '/lista' &#125;</div>
  <ul class="text-xs space-y-1 list-none m-0 p-0 ns-c-tight">
    <li>❌ <strong>NU</strong> apare în URL</li>
    <li>✅ Păstrat la refresh</li>
    <li>✅ Orice obiect serializabil</li>
    <li>❌ NU shareable</li>
  </ul>
  <div class="text-xs mt-2 pt-2 border-t border-green-200"><strong>Pentru:</strong> context temporar între pagini</div>
</div>

</div>

<AdmonitionType type="info">

**Regula**: dacă datele ar trebui să fie **sharable** sau **bookmarkable**, pune-le în URL. Dacă sunt **context temporar** între două pagini (ex: "de unde am venit", o notificare după submit), folosește `state`.

</AdmonitionType>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `navigate(to, { state })` — trimitem date

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

**Pagina care trimite** — `navigate` cu `state`:

```jsx
import { useNavigate } from 'react-router';

function ListaProduse({ produse }) {
  const navigate = useNavigate();

  const handleClick = (produs) => {
    // Transmitem obiectul direct catre
    // pagina urmatoare — NU prin URL.
    navigate(`/produs/${produs.id}`, {
      state: { produs, deUnde: 'lista' }
    });
  };
  // ...
}
```

</div>

<div>

**Pagina care primește** — `useLocation().state`:

```jsx
import { useLocation } from 'react-router';

function PaginaProdus() {
  const location = useLocation();
  // state poate fi null → folosim ?? {}
  const { produs, deUnde } = location.state ?? {};

  return <h2>{produs?.nume}</h2>;
}
```

</div>

</div>


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Cum funcționează `state` sub capotă?

:: content ::

React Router stochează `state` în **intrarea curentă din history a browserului** (`window.history.state`) — nu în URL.

<div class="grid grid-cols-2 gap-6 text-sm mt-4">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

**Consecințe:**

- ✅ Supraviețuiește la **refresh**
- ✅ Revine la **Back / Forward**
- ❌ NU apare în URL
- ❌ Un user care deschide direct URL-ul are `location.state === null`

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

**⚠️ Atenție:**

- Verifică mereu dacă `state` există: `location.state ?? {}`
- Datele trebuie să fie **serializabile** (fără funcții, DOM nodes, Map/Set)
- NU folosi `state` ca **singura sursă de adevăr** — la share linkul nu mai are datele

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# State ascuns între pagini

:: content ::

Modifică produsul, apasă „Cumpara". La confirmare, observă că **URL-ul este `/confirmare`** — curat, fără `orderNumber` sau `total`. Datele au ajuns prin `state`. Fă **refresh** pe pagina de confirmare.

<NavigateStateDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<NavLink>` — linkul activ automat

:: content ::

Un `<Link>` normal arată la fel, indiferent dacă ești pe pagina respectivă. `<NavLink>` știe dacă e **activ** sau nu:

```jsx
import { NavLink } from 'react-router';

<NavLink
  to="/despre"
  style={({ isActive }) => ({
    color: isActive ? 'white' : '#475569',
    background: isActive ? '#0ea5e9' : 'transparent'
  })}
>
  Despre
</NavLink>
```

<div class="grid grid-cols-2 gap-4 text-sm mt-4">

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <strong><code>className</code></strong> — poate fi string sau funcție care primește <code>&#123; isActive &#125;</code>
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <strong><code>style</code></strong> — la fel, string sau funcție
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <strong><code>end</code></strong> — prop boolean: match exact (pentru ruta „/")
</div>

<div class="bg-sky-50 border-2 border-sky-200 rounded-lg p-3">
  <strong>children</strong> — poate fi funcție care primește <code>&#123; isActive &#125;</code>
</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# `<NavLink>` cu stil activ

:: content ::

Linkul paginii curente devine automat albastru. Nu mai trebuie să scriem manual „care tab e activ".

<NavLinkActiveDemo />


---
layout: section
color: sky-light
---

# 404 și redirecționări
#### Rute catch-all și `<Navigate>`


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# Rută catch-all: `path="*"`

:: content ::

<div class="grid grid-cols-2 gap-6 text-sm">

<div>

Caracterul `*` se potrivește cu **orice URL** care nu a fost prins de rutele de mai sus:

```jsx
<Routes>
  <Route path="/" element={<Acasa />} />
  <Route path="/despre" element={<Despre />} />

  {/* Ultimul — prinde tot ce a rămas */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

- `/` → `<Acasa />`
- `/despre` → `<Despre />`
- `/orice-altceva` → `<NotFound />`

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

### Ordine importantă

React Router alege **cea mai specifică** rută care se potrivește — deci `*` **nu trebuie** să fie prima.

```jsx
{/* ✅ Corect */}
<Route path="/produse" element={<Produse />} />
<Route path="*" element={<NotFound />} />

{/* ❌ Greșit - NotFound ar câștiga pentru toate */}
<Route path="*" element={<NotFound />} />
<Route path="/produse" element={<Produse />} />
```

(Ordonarea nu contează în v6/v7, dar e bună practică de scris logic.)

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Pagina 404

:: content ::

Click pe „Link spre necunoscut" — pattern-ul `path="*"` prinde URL-ul necunoscut și afișează pagina 404.

<SplatNotFoundDemo />


---
layout: top-title
align: c
color: sky-light
---

:: title ::
# `<Navigate />` — redirect declarativ

:: content ::

<div class="grid grid-cols-2 gap-5 text-sm">

<div>

Uneori vrem să redirecționăm user-ul **în timpul randării** (nu după un click). Ex: dacă nu e autentificat, trimite-l la `/login`.

```jsx
import { Navigate } from 'react-router';

function PaginaProtejata({ user }) {
  if (!user) {
    // Redirect declarativ — in timpul randarii
    return <Navigate to="/login" replace />;
  }

  return <h1>Bine ai venit, {user.nume}!</h1>;
}
```

</div>

<div class="flex flex-col gap-4">

<div class="bg-sky-50 border-2 border-sky-300 rounded-xl p-4">

**`<Navigate>` vs `useNavigate`:**

- `<Navigate>` — în timpul randării (în JSX)
- `useNavigate` — într-un event handler / effect

</div>

<div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4">

**`replace` prop:**

- **Fără**: intrarea rămâne în history → Back te duce la pagina protejată
- **Cu `replace`**: înlocuiește intrarea → Back sare peste ea

</div>

</div>

</div>


---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::
# Auth guard cu `<Navigate>`

:: content ::

Apasă pe „Secret (protejat)" fără să fii logat — `<Navigate to="/login" replace />` te redirecționează. Apoi loghează-te și încearcă din nou.

<NavigateRedirectDemo />
