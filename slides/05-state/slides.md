---
title: "React Course"
theme: neversink
transition: slide-left
layout: cover
color: sky-light
info: "React Course · Crudu Cristian · 2026"
lineNumbers: true
draw:
  enabled: true
favicon: "./react.svg"
---

# State

Memoria componentelor

<div class="absolute top-2 right-2 w-8 h-8">
<GithubLink repo="https://github.com/cristi-usm/react-course" />
</div>
---
layout: top-title
align: c
color: sky-light
---
:: title ::

# Ce este State?

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

**State** este memoria unui component React - informații pe care componentul le "reține" între render-uri.

- Valoarea unui input de formular
- Numărul de click-uri pe un buton
- Produsele din coșul de cumpărături
- Tema curentă (dark/light mode)
- Starea unui loading indicator

<AdmonitionType type="tip" class="mt-8">

**Fără state**, componentele ar "uita" totul după fiecare render și ar fi statice

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# De ce nu funcționează variabilele normale?

:: content ::

<div class="text-lg space-y-4">

**Problema 1: Variabilele locale nu persistă între render-uri**

- La fiecare re-render, React execută funcția de la zero
- Variabilele locale sunt create din nou cu valorile inițiale
- Modificările anterioare sunt "uitate"

**Problema 2: Modificările nu declanșează re-render-uri**

- Când modifici o variabilă locală, React nu știe despre asta
- React nu va re-renderiza componenta
- UI-ul rămâne neschimbat, chiar dacă variabila s-a modificat

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Variabilă Obișnuită

:: content ::

<div class="text-lg mb-4">
Să vedem aceste probleme în acțiune - încearcă să apeși butonul:
</div>

<BrokenLikeButton />

<AdmonitionType type="caution" class="mt-4">

Valoarea se schimbă în consolă (vezi!), dar UI-ul nu se actualizează

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Hook-ul `useState`

:: content ::

<div class="text-lg mb-4">
Hook-ul <code>useState</code> ne oferă o <strong>variabilă care persistă</strong> între render-uri și o <strong>funcție care declanșează re-render-uri</strong>:
</div>

<WorkingLikeButton />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Ce este un Hook?

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

**Hook** = Funcție specială care îți permite să te "conectezi" la funcționalități React

<AdmonitionType type="important">

**Regula de denumire:** Toate Hook-urile încep cu `use`

- `useState` - adaugă state unui component
- `useEffect` - sincronizează componenta cu sisteme externe
- `useContext` - citește și subscribe la context
- `useRef` - referință la o valoare care nu declanșează render
- Poți crea propriile tale Hook-uri custom!

</AdmonitionType>

<AdmonitionType type="warning" class="mt-4">

Hook-urile pot fi apelate **DOAR** la nivel superior al componentului — nu în bucle, condiții sau funcții imbricate

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Anatomia `useState`

:: content ::

<div class="text-lg space-y-6">

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
}
```

<div class="grid grid-cols-3 gap-4 mt-8">

<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
<div class="font-bold mb-2">count</div>
<div class="text-sm">Variabilă State - valoarea curentă</div>
</div>

<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="font-bold mb-2">setCount</div>
<div class="text-sm">Funcție Setter - actualizează state-ul</div>
</div>

<div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-500">
<div class="font-bold mb-2">0</div>
<div class="text-sm">Valoare Inițială - valoarea la primul render</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-8">

**Convenție de denumire:** `[something, setSomething]` — perechi de variabilă și setter

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Cum știe React ce state să returneze?

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

React identifică state-urile după **ordinea apelurilor** `useState`, nu după nume:

```jsx
function Component() {
  const [name, setName] = useState("Ana"); // Primul useState -> State #0
  const [age, setAge] = useState(25); // Al doilea useState -> State #1
  const [city, setCity] = useState("București"); // Al treilea useState -> State #2
}
```

<div class="mt-6 grid grid-cols-2 gap-6">

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="text-xl mb-3">✅ Funcționează</div>
<div class="text-sm">Hook-urile sunt întotdeauna apelate în aceeași ordine</div>
</div>

<div class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500">
<div class="text-xl mb-3">❌ NU funcționează</div>
<div class="text-sm">Hook-uri în condiții sau bucle - ordinea se schimbă!</div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# State-uri Multiple

:: content ::

<div class="text-lg mb-4">
Poți avea oricâte state-uri vrei într-un component - fiecare independent:
</div>

<MultipleStates />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# State este Izolat și Privat

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

Fiecare instanță a unui component are propriul său state, complet separat:

<IsolatedState />

</div>

---
layout: section
color: sky-light
---

# Parametri

Ce parametri ia useState()

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Parametri de tip primitiv

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

useState poate lua ca **parametri**:

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="text-2xl mb-3">Strings</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;&quot;hello&quot;&#41;</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
<div class="text-2xl mb-3">Numbers</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;23&#41;</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-red-500">
<div class="text-2xl mb-3">Booleans</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;false&#41;</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-yellow-500">
<div class="text-2xl mb-3">Null or Undefined</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;null&#41;</code>
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

# Parametri de tip complex

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

useState poate lua ca **parametri**:

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="text-2xl mb-3">Arrays</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;[]&#41;</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-red-500">
<div class="text-2xl mb-3">Objects</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;{ name: "John", age: 30 }&#41;</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
<div class="text-2xl mb-3">Sets and Maps</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;new Set()&#41;</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-yellow-500">
<div class="text-2xl mb-3">Functions</div>
<div class="text-sm mt-3 opacity-75">
<code>useState&#40;() => getFeedback()&#41;</code>
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

# useState(getFeedback()) vs useState(() => getFeedback())

:: content ::

<div class="text-lg space-y-6">

<div class="grid grid-cols-2 gap-6">

<div class="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
<div class="font-bold text-xl mb-1"><code>useState(getFeedback())</code></div>
<div class="text-base mb-3 text-yellow-600">Apel Direct (Ineficient)</div>
<div class="text-sm space-y-2">
<div>În acest caz, funcția getFeedback() este executată la fiecare randare a componentei tale.</div>
<div>• <strong>Prima randare:</strong> React apelează getFeedback(), folosește rezultatul pentru a seta starea inițială. (Corect)</div>
<div>• <strong>Randările următoare:</strong> Deși React are deja valoarea stării și ignoră rezultatul lui getFeedback(), funcția tot este apelată inutil de JavaScript înainte de a intra în hook-ul useState.</div>
<div>• <strong>Problema:</strong> Dacă getFeedback() face calcule grele sau citește din localStorage, vei încetini aplicația la fiecare click sau schimbare de stare.</div>
</div>
</div>

<div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
<div class="font-bold text-xl mb-1"><code>useState(() => getFeedback())</code></div>
<div class="text-base mb-3 text-purple-600">Inițializare Leneșă (Eficient)</div>
<div class="text-sm space-y-2">
<div>Aceasta se numește <strong>Lazy Initialization</strong>.</div>
<div>• <strong>Prima randare:</strong> React execută funcția anonimă și salvează rezultatul.</div>
<div>• <strong>Randările următoare:</strong> React nu mai execută funcția deloc. Știe că are deja starea inițializată și sare peste acel bloc de cod.</div>
</div>
</div>

</div>

</div>

---
layout: center
color: sky-light
---

<div class="text-2xl">

<AdmonitionType type="info">

<div class="text-xl space-y-4">

**Regula de aur:**

<div>• Folosește <code>useState(valoare)</code> pentru valori simple (string, număr, boolean).</div>

<div>• Folosește <code>useState(() => getFeedback())</code> dacă inițializarea implică:</div>

<div class="ml-6">▫ localStorage.getItem() sau sessionStorage.</div>
<div class="ml-6">▫ Mapări sau filtrări pe liste mari de date.</div>
<div class="ml-6">▫ Calcule matematice complexe.</div>

</div>

</AdmonitionType>

</div>

---
layout: section
color: sky-light
---

# Render și Commit

Procesul prin care React actualizează interfața

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Cele 3 Etape ale React

:: content ::

<div class="text-lg space-y-8">

De la schimbarea state-ului până la afișarea pe ecran, React urmează **3 pași**:

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
<div class="text-3xl mb-3">1️⃣</div>
<div class="font-bold text-xl mb-2">Trigger</div>
<div class="text-sm">Declanșează un render</div>
</div>

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="text-3xl mb-3">2️⃣</div>
<div class="font-bold text-xl mb-2">Render</div>
<div class="text-sm">Apelează componentele</div>
</div>

<div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
<div class="text-3xl mb-3">3️⃣</div>
<div class="font-bold text-xl mb-2">Commit</div>
<div class="text-sm">Actualizează DOM-ul</div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Pas 1: Trigger (Declanșare)

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

React randarizează o componentă din **două motive**:

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="text-2xl mb-3">Render Inițial</div>
<div class="text-base">La pornirea aplicației</div>
<div class="text-sm mt-3 opacity-75">
<code>root.render(&lt;App /&gt;)</code>
</div>
</div>

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
<div class="text-2xl mb-3">Re-render</div>
<div class="text-base">Când se schimbă state-ul</div>
<div class="text-sm mt-3 opacity-75">
<code>setCount(count + 1)</code>
</div>
</div>

</div>

<AdmonitionType type="info" class="mt-6">

Când apeși pe un buton care apelează `setCount`, React pune în coadă un nou render pentru acea componentă

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Pas 2: Render (Randare)

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

După ce render-ul este declanșat, React **apelează funcția componentei** tale:

```jsx
function Gallery() {
  const [index, setIndex] = useState(0);
  return <img src={images[index]} />;
}
// React apelează Gallery() și primește JSX-ul înapoi
```

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
<div class="font-bold mb-2">Render Inițial</div>
<div class="text-sm">React apelează componenta root</div>
</div>

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
<div class="font-bold mb-2">Re-render</div>
<div class="text-sm">React apelează componenta al cărei state s-a schimbat</div>
</div>

</div>

<AdmonitionType type="info" class="mt-6">

Procesul este **recursiv**: dacă o componentă returnează alte componente, React le apelează și pe acelea

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Rendering-ul Trebuie Să Fie Pur

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

Componentele **trebuie să fie funcții pure** în timpul rendering-ului:

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="text-xl mb-3">✅ Pur</div>
<div class="text-sm space-y-2">
<div>• Același input → același output</div>
<div>• Nu modifică variabile externe</div>
<div>• Nu produce side effects (efecte secundare)</div>
</div>
</div>

<div class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500">
<div class="text-xl mb-3">❌ Impur</div>
<div class="text-sm space-y-2">
<div>• Modifică variabile din afară</div>
<div>• Face apleluri de API în faza de render</div>
<div>• Schimbă DOM direct</div>
</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-6">

**Strict Mode** apelează componentele de două ori în development pentru a detecta impurități

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Pas 3: Commit (Aplicare)

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

După rendering, React **aplică modificările în DOM**:

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500">
<div class="font-bold mb-2">Render Inițial</div>
<div class="text-sm">React folosește <code>appendChild()</code> pentru a adăuga toate nodurile DOM create</div>
</div>

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="font-bold mb-2">Re-render</div>
<div class="text-sm">React aplică <strong>doar modificările minime</strong> necesare pentru a actualiza DOM-ul</div>
</div>

</div>

<AdmonitionType type="info" class="mt-6">

**Optimizare:** React compară output-ul nou cu cel anterior și schimbă **DOAR** ce este diferit

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Actualizări Selective

:: content ::

<div class="text-lg mb-4">
Observă cum doar timpul se actualizează, nu și input-ul (chiar dacă totul se re-renderizează):
</div>

<SelectiveUpdatesDemo />

<AdmonitionType type="tip" class="mt-4">

React re-renderizează **toată** componenta, dar actualizează în DOM **doar** elementele care s-au schimbat

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Recap: Render vs Commit

:: content ::

<div class="text-lg space-y-6">

<div class="grid grid-cols-2 gap-6">

<div class="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
<div class="font-bold text-xl mb-3">Rendering</div>
<div class="text-sm space-y-2">
<div>• React apelează funcția componentei</div>
<div>• Primește JSX înapoi</div>
<div>• Se întâmplă la FIECARE schimbare de state</div>
<div>• <strong>NU modifică</strong> DOM-ul direct</div>
</div>
</div>

<div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
<div class="font-bold text-xl mb-3">Committing</div>
<div class="text-sm space-y-2">
<div>• React actualizează DOM-ul</div>
<div>• Aplică doar diferențele</div>
<div>• Se întâmplă DOAR dacă există modificări</div>
<div>• <strong>Modifică</strong> DOM-ul efectiv</div>
</div>
</div>

</div>

<AdmonitionType type="info" class="mt-8">

După commit, **browser-ul redesenează** (browser painting) pentru a afișa modificările pe ecran

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Rendering produce un Snapshot

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

Când React **re-renderizează** un component, el:

<div class="grid grid-cols-3 gap-4 mt-6">

<div class="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
<div class="font-bold mb-2">1. Apelează funcția</div>
<div class="text-sm">Execută codul componentei din nou</div>
</div>

<div class="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="font-bold mb-2">2. Calculează JSX-ul</div>
<div class="text-sm">Folosind valorile <strong>curente</strong> ale state-ului</div>
</div>

<div class="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
<div class="font-bold mb-2">3. Actualizează DOM-ul</div>
<div class="text-sm">Potrivit cu snapshot-ul calculat</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-6">

**State-ul este stocat de React**, în afara funcției tale. Când React apelează funcția, îi oferă un **snapshot al state-ului** pentru acel render specific.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Variabilele sunt "înghețate" în Render

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

```jsx
export default function Counter() {
  const [number, setNumber] = useState(0);
  //        ↑ "number" este ÎNGHEȚAT la valoarea din acest render

  return (
    <button
      onClick={() => {
        setNumber(number + 5); // Programează un re-render cu valoarea 5
        alert(number); // Afișează VALOAREA DIN SNAPSHOT (0), nu 5!
      }}
    >
      +5
    </button>
  );
}
```

<AdmonitionType type="important" class="mt-4">

`setNumber` nu modifică `number` în render-ul curent. El spune React: _"la următorul render, number va fi 5"_

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Valoarea din Snapshot

:: content ::

<div class="text-base mb-3">
Apasă butonul și observă ce valoare afișează alert-ul față de titlul din UI:
</div>

<SnapshotAlertDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Problema celor 3 Incrementări

:: content ::

<div class="text-base mb-3">
Butonul zice "+3" — cu câte unități incrementează de fapt?
</div>

<ThreeClicksDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# De ce "+3" Devine "+1"?

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Toate cele 3 apeluri folosesc **același snapshot** unde `number = 0`:

```jsx
onClick={() => {
  setNumber(number + 1); // setNumber(0 + 1) → programează 1
  setNumber(number + 1); // setNumber(0 + 1) → programează 1 (din nou!)
  setNumber(number + 1); // setNumber(0 + 1) → programează 1 (din nou!)
}}
```

<AdmonitionType type="tip" class="mt-2">

**Tehnica substituției:** înlocuiește `number` cu valoarea sa din snapshot

</AdmonitionType>

La next render, cu `number = 1`:

```jsx
onClick={() => {
  setNumber(1 + 1); // programează 2
  setNumber(1 + 1); // programează 2 (din nou!)
  setNumber(1 + 1); // programează 2 (din nou!)
}}
```

<AdmonitionType type="caution">

Rezultat: React primește **3 instrucțiuni identice** → aplică ultima → incrementează cu 1

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# State și Codul Asincron

:: content ::

<div class="text-base mb-3">
Apasă rapid de mai multe ori, apoi observă valorile din alert-uri:
</div>

<TimerCaptureDemo />

<AdmonitionType type="tip" class="mt-3">

Fiecare apăsare creează un **snapshot separat** — alert-urile afișează valorile din momentul apăsării, nu din momentul afișării

</AdmonitionType>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Exemplu Real: Formular cu Întârziere

:: content ::

<div class="text-base mb-3">
Trimite un mesaj, apoi <strong>schimbă destinatarul</strong> înainte ca alert-ul să apară:
</div>

<ChatFormDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Recap: State ca un Snapshot

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

<div class="grid grid-cols-2 gap-6">

<div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
<div class="font-bold text-xl mb-3">Fiecare Render</div>
<div class="text-sm space-y-2">
<div>• Primește un <strong>snapshot</strong> al state-ului</div>
<div>• Variabilele sunt <strong>înghețate</strong> pe durata lui</div>
<div>• Event handler-ele <strong>captează</strong> snapshot-ul</div>
<div>• <code>setState</code> programează <strong>rendul următor</strong></div>
</div>
</div>

<div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="font-bold text-xl mb-3">Consecințe Practice</div>
<div class="text-sm space-y-2">
<div>• <code>alert(state)</code> arată valoarea <strong>curentă</strong>, nu viitoare</div>
<div>• <code>setTimeout</code> vede valoarea de la <strong>momentul creării</strong></div>
<div>• 3× <code>setState(val + 1)</code> incrementează cu <strong>1</strong>, nu 3</div>
<div>• Cod async vede mereu snapshot-ul <strong>render-ului original</strong></div>
</div>
</div>

</div>

<AdmonitionType type="important" class="mt-6">

**Regula de aur:** State-ul unui render nu se schimbă niciodată pe durata acelui render, chiar dacă event handler-ul este asincron

</AdmonitionType>

</div>

---
layout: section
color: sky-light
---

# Cum să faci mai multe actualizări într-un singur render?

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Batching — React Grupează Actualizările

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

React **nu re-renderizează** după fiecare apel `setState`. El grupează toate actualizările dintr-un event handler și face **un singur re-render** la final:

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="font-bold mb-3">✅ Cum face React</div>
<div class="text-sm space-y-1">
<div>1. Execută tot codul din event handler</div>
<div>2. Procesează toate <code>setState</code>-urile</div>
<div>3. Face un singur re-render</div>
</div>
</div>

<div class="p-5 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
<div class="font-bold mb-3">❌ Cum nu face React</div>
<div class="text-sm space-y-1">
<div>1. <code>setState</code> → re-render</div>
<div>2. <code>setState</code> → re-render</div>
<div>3. <code>setState</code> → re-render</div>
</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-4">

**Batching** face React mai rapid și previne render-uri cu UI parțial actualizat

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Funcții de Actualizare — Soluția Corectă

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Când vrei să faci **mai multe actualizări** bazate pe starea anterioară, folosești o **funcție updater** (funcție de actualizare):

<div class="grid grid-cols-2 gap-6 mt-2">

<div class="p-5 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
<div class="font-bold mb-3">❌ Valoare directă (snapshot)</div>

```jsx
setCount(count + 1); // count = 0 → 1
setCount(count + 1); // count = 0 → 1
setCount(count + 1); // count = 0 → 1
// Rezultat final: 1
```

</div>

<div class="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="font-bold mb-3">✅ Funcție updater (coadă)</div>

```jsx
setCount((c) => c + 1); // 0 → 1
setCount((c) => c + 1); // 1 → 2
setCount((c) => c + 1); // 2 → 3
// Rezultat final: 3
```

</div>

</div>

<AdmonitionType type="important">

**Funcția updater** primește starea _cea mai recent programată_ din coadă, nu valoarea din snapshot

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Snapshot vs Updater

:: content ::

<div class="text-base mb-3">Ambele butoane zic "+3" — apasă-le și compară rezultatele:</div>

<UpdaterCompareDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Cum Procesează React Coada

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

React procesează coada de updater-uri **secvențial**, fiecare primind rezultatul celui anterior:

```jsx
// State inițial: count = 0
setCount((c) => c + 1); // Adăugat în coadă
setCount((c) => c + 1); // Adăugat în coadă
setCount((c) => c + 1); // Adăugat în coadă
```

<div class="mt-2 overflow-x-auto">

| Updater în coadă | Valoare intrare | Returnează |
| :--------------- | :-------------: | :--------: |
| `c => c + 1`     |       `0`       |    `1`     |
| `c => c + 1`     |       `1`       |    `2`     |
| `c => c + 1`     |       `2`       | **`3`** ✅ |

</div>

<AdmonitionType type="info">

React stochează `3` ca state pentru următorul render și apelează componenta cu această valoare

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Valori Directe vs Funcții Updater

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Poți **combina** cele două stiluri — valoarea directă **înlocuiește** coada, updater-ul **citește** din ea:

```jsx
// State inițial: count = 0
setCount(count + 5); // Înlocuiește: "pune 5 în coadă"
setCount((c) => c + 1); // Updater: citește 5 din coadă → returnează 6
```

<div class="mt-2 overflow-x-auto">

| Actualizare în coadă | Valoare intrare | Returnează |
| :------------------- | :-------------: | :--------: |
| `"înlocuiește cu 5"` |  `0` (ignorat)  |    `5`     |
| `c => c + 1`         |       `5`       | **`6`** ✅ |

</div>

```jsx
setCount(count + 5); // → 5
setCount((c) => c + 1); // → 6
setCount(42); // Înlocuiește tot: forțează 42
// Rezultat: 42
```

<AdmonitionType type="warning">

O valoare directă după un updater **suprascrie** tot ce era înainte în coadă

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Coadă cu Valori Mixte

:: content ::

<div class="text-base mb-3">Experimentează cu diferite combinații de valori directe și updater-uri:</div>

<MixedQueueDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Updater-uri în Cod Asincron

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Codul asincron (`async/await`) are o problemă specială cu snapshot-urile:

```jsx
async function handleSubmit() {
  setPending(pending + 1); // snapshot: pending = 0
  await sendToServer(data);
  setPending(pending - 1); // snapshot: pending = 0 → devine -1! ❌
  setDone(done + 1); // snapshot: done = 0
}
```

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
<div class="font-bold mb-1">❌ Cu snapshot</div>
<div class="text-sm">Chiar și la un singur click: <code>pending - 1</code> = <code>0 - 1</code> = <strong>-1</strong>, pentru că snapshot-ul original are <code>pending = 0</code>, nu valoarea actualizată</div>
</div>

<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="font-bold mb-1">✅ Cu updater</div>
<div class="text-sm"><code>setPending(p => p - 1)</code> scade mereu din valoarea corectă, indiferent de alte click-uri</div>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Procesator de Task-uri Asincrone

:: content ::

<div class="text-base mb-2">Apasă rapid de mai multe ori pe ambele butoane și compară contoarele:</div>

<AsyncTaskDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Convenții de Denumire pentru Updater-uri

:: content ::

<div class="text-lg space-y-6 ns-c-tight">

Parametrul funcției updater este de obicei prescurtat cu **prima literă** a numelui state-ului:

```jsx
// ✅ Prescurtat (cel mai comun în React)
setEnabled((e) => !e);
setCount((c) => c + 1);
setItems((i) => [...i, newItem]);
setUser((u) => ({ ...u, name: "Ana" }));

// ✅ Numele complet (mai explicit)
setEnabled((enabled) => !enabled);
setCount((count) => count + 1);

// ✅ Prefix "prev" (mai descriptiv)
setCount((prevCount) => prevCount + 1);
setItems((prevItems) => prevItems.filter((i) => i.id !== id));
```

<AdmonitionType type="info">

Alege un stil consistent în proiectul tău. Prescurtarea cu prima literă este cea mai răspândită în comunitatea React.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Recap: Cozi de Actualizări

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

<div class="grid grid-cols-2 gap-6">

<div class="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
<div class="font-bold text-lg mb-3">Valoare Directă <code>setState(val)</code></div>
<div class="text-sm space-y-1">
<div>• Înlocuiește orice era în coadă</div>
<div>• Folosește valoarea din <strong>snapshot</strong></div>
<div>• Potrivit când valoarea nu depinde de cea anterioară</div>
<div>• Ex: <code>setTab('profile')</code></div>
</div>
</div>

<div class="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
<div class="font-bold text-lg mb-3">Funcție Updater <code>setState(fn)</code></div>
<div class="text-sm space-y-1">
<div>• Se adaugă în coadă, nu înlocuiește</div>
<div>• Primește <strong>ultima valoare programată</strong></div>
<div>• Potrivit când starea nouă depinde de cea anterioară</div>
<div>• Ex: <code>setCount(c => c + 1)</code></div>
</div>
</div>

</div>

<AdmonitionType type="tip" class="mt-4">

**Regula practică:** Dacă scrii `setState(stateVar + 1)` și `stateVar` apare în dreapta, înlocuiește cu `setState(s => s + 1)`

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Obiectele în State sunt Imutabile

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Obiectele JS sunt tehnic mutabile, dar în React trebuie tratate ca **read-only**:

<div class="grid grid-cols-2 gap-6 mt-2">

<div class="p-5 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500">
<div class="font-bold mb-3">❌ Mutație directă</div>

```jsx
const [pos, setPos] = useState({ x: 0, y: 0 });

// React nu știe că ceva s-a schimbat!
pos.x = 5;
```

</div>

<div class="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
<div class="font-bold mb-3">✅ Obiect nou</div>

```jsx
const [pos, setPos] = useState({ x: 0, y: 0 });

// React vede un nou obiect → re-render!
setPos({ x: 5, y: pos.y });
```

</div>

</div>

<AdmonitionType type="important" class="mt-2">

Schimbarea unui obiect care este state **nu declanșează re-render** — React compară referințele, iar referința nu s-a schimbat

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Mutație vs Obiect Nou

:: content ::

<div class="text-base mb-3">Apasă butoanele pe fiecare punct — care se mișcă?</div>

<MutationProblemDemo />

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::

# Operatorul Spread pentru Obiecte

:: content ::

<div class="text-lg ns-c-tight text-base">

Când vrei să modifici **un singur câmp**, copiezi restul cu `...`:

```jsx
const [hero, setHero] = useState({
  name: "Eroul Albastru",
  hp: 100,
  score: 0,
});

function handleScoreIncrease() {
  setHero({
    ...hero, // copiază name și hp
    score: hero.score + 50, // suprascrie doar score
  });
}
```

<div class="overflow-x-auto text-base mt-2">

| **Câmp** | **Valoare**                    |
| :------- | :----------------------------- |
| `name`   | Copiat din `...hero`           |
| `hp`     | Copiat din `...hero`           |
| `score`  | **Suprascris** cu noua valoare |

</div>

<AdmonitionType type="warning">

Spread-ul este **superficial** (shallow) — copiază doar primul nivel. Câmpurile care sunt obiecte vor fi copiate **prin referință**, nu în profunzime.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Stats cu Spread

:: content ::

<div class="text-base mb-3">Apasă butoanele și observă în state că doar câmpul modificat se schimbă:</div>

<PlayerStatsDemo />

---
layout: top-title
align: c
color: sky-light
margin: tight
---

:: title ::

# Obiecte Imbricate

:: content ::

<div class="text-lg ns-c-tight text">

Când state-ul conține obiecte imbricate, trebuie să copiezi **fiecare nivel**:

```jsx
const [character, setCharacter] = useState({
  name: "Dragoș",
  stats: {
    // obiect imbricat
    hp: 100,
    attack: 25,
  },
});

// ❌ GREȘIT — spread superficial nu ajunge la stats.hp
setCharacter({ ...character, hp: 120 }); // adaugă hp la nivelul greșit!

// ✅ CORECT — copiezi ambele niveluri
setCharacter({
  ...character,
  stats: {
    ...character.stats, // copiezi câmpurile din stats
    hp: 120, // suprascrii doar hp
  },
});
```

<AdmonitionType type="info">

Cu cât obiectele sunt mai adânc imbricate, cu atât codul devine mai dificil. Dacă ai mai mult de 2 niveluri, ca soluție, documentația oficială propune utilizarea librăriei **Immer**.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Personaj cu Stats Imbricate

:: content ::

<div class="text-base mb-3">Apasă butoanele și observă cum fiecare nivel al obiectului este copiat corect:</div>

<CharacterEquipDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Immer — Actualizări ca Mutații

:: content ::

<div class="text-base ns-c-tight">

**Immer** este o librărie care îți permite să scrii cod de mutație, dar produce un obiect nou imutabil:

```jsx
import { useImmer } from "use-immer";

const [character, updateCharacter] = useImmer({
  name: "Dragoș",
  stats: { hp: 100, attack: 25 },
});

// ✅ Scrii ca și când ai mmodifica direct, dar Immer creează obiect nou
function upgradeHp() {
  updateCharacter((draft) => {
    draft.stats.hp += 20; // sintaxă de mutație!
  });
}
```

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500 text-sm">
<div class="font-bold mb-1">Fără Immer</div>

<pre>setCharacter({
  ...character,
  stats: {
    ...character.stats,
    hp: character.stats.hp + 20,
  },
})</pre>
</div>

<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500 text-sm">
<div class="font-bold mb-1">Cu Immer</div>
<pre>updateCharacter(draft => draft.stats.hp += 20)</pre>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Immer în Practică

:: content ::

<div class="text-base mb-3">Compară același personaj actualizat cu spread manual vs. Immer:</div>

<ImmerDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Recap: Actualizarea Obiectelor

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

<div class="grid grid-cols-3 gap-4">

<div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500 text-sm">
<div class="font-bold mb-2">❌ Nu face</div>
<pre>state.field = val</pre>
<div class="mt-2 text-xs opacity-75">Mutație directă — nu declanșează re-render</div>
</div>

<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-500 text-sm">
<div class="font-bold mb-2">✅ Shallow</div>
<pre>setState({
  ...s,
  f: val,
})</pre>
<div class="mt-2 text-xs opacity-75">Spread pentru un nivel</div>
</div>

<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500 text-sm">
<div class="font-bold mb-2">✅ Nested</div>
<pre>setState({
  ...s,
  a: {
    ...s.a,
    f: val,
  },
})</pre>
<div class="mt-2 text-xs opacity-75">Spread dublu pentru obiecte imbricate</div>
</div>

</div>

<AdmonitionType type="important" class="mt-4">

**Regula de aur:** Orice obiect stocat în state trebuie înlocuit cu un obiect nou — nu modificat pe loc. Folosește `{ ...obj, câmp: valoare }` sau Immer pentru structuri complexe.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Array-uri în State — Tratează-le ca Imutabile

:: content ::

<div class="text-lg space-y-3 ns-c-tight">

JavaScript permite mutarea array-urilor direct, dar **React cere să creezi un array nou** de fiecare dată.

<div class="grid grid-cols-2 gap-4 mt-3">

<div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500 text-sm">
<div class="font-bold mb-2">❌ Evită (modifică array-ul)</div>

| **Operație** | **Metodă**               |
| ------------ | ------------------------ |
| Adăugare     | `push`, `unshift`        |
| Eliminare    | `pop`, `shift`, `splice` |
| Înlocuire    | `arr[i] = ...`           |
| Sortare      | `sort`, `reverse`        |

</div>

<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500 text-sm">
<div class="font-bold mb-2">✅ Folosește (creează array nou)</div>

| **Operație** | **Metodă**               |
| ------------ | ------------------------ |
| Adăugare     | `[...arr]`, `concat`     |
| Eliminare    | `filter`, `slice`        |
| Înlocuire    | `map`                    |
| Sortare      | `toSorted`, `toReversed` |

</div>

</div>

<AdmonitionType type="warning">

`slice` (fără 'p') creează o copie. `splice` (cu 'p') modifică originalul, evită în state!

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Adăugarea în Array

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Spre deosebire de `push`, **operatorul spread** creează un array nou:

```jsx
// ❌ push modifică array-ul existent
items.push({ id: nextId++, name: "Sabie" });

// ✅ spread creează array NOU cu elementul adăugat la sfârșit
setItems([...items, { id: nextId++, name: "Sabie" }]);

// ✅ sau la început (prepend)
setItems([{ id: nextId++, name: "Sabie" }, ...items]);
```

<div class="grid grid-cols-2 gap-4 mt-2">

<div class="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border-2 border-sky-400 text-sm">
<div class="font-bold mb-1">La sfârșit (append)</div>
<pre>[...items, elementNou]</pre>
</div>

<div class="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border-2 border-sky-400 text-sm">
<div class="font-bold mb-1">La început (prepend)</div>
<pre>[elementNou, ...items]</pre>
</div>

</div>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Eliminarea din Array

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Metoda `filter` returnează un array nou fără elementele excluse:

```jsx
// ❌ splice modifică array-ul
items.splice(index, 1);

// ✅ filter creează array nou fără elementul cu id-ul respectiv
setItems(items.filter((item) => item.id !== idDeEliminat));

// ✅ sau orice condiție logică
setItems(items.filter((item) => item.hp > 0)); // păstrează viii
setItems(items.filter((item) => !item.selected)); // elimină selectate
```

<AdmonitionType type="tip">

`filter` nu modifică nimic — returnează un array nou care conține doar elementele pentru care funcția returnează `true`.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Inventar — Adaugă & Elimină

:: content ::

<div class="text-base mb-3">Adaugă obiecte din magazin în inventar (<code>[...inventory, item]</code>) și elimină-le cu <code>filter</code>:</div>

<InventoryDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Transformarea cu map()

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

`map()` returnează un array nou — perfect pentru a modifica toate elementele sau unul specific:

```jsx
// Transformă toate elementele
setItems(
  items.map((item) => ({
    ...item,
    power: item.power * 2, // dublează puterea tuturor
  })),
);

// Transformă un element specific (după id)
setItems(
  items.map(
    (item) =>
      item.id === targetId
        ? { ...item, power: item.power + 5 } // obiect nou pentru cel vizat
        : item, // restul rămân neschimbate
  ),
);
```

<AdmonitionType type="info">

`map` întoarce mereu un array de **aceeași lungime**. Dacă vrei să elimini elemente, combină cu `filter`.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Carte de Vrăji — Upgrade cu map()

:: content ::

<div class="text-base mb-3">Fiecare vrajă are putere proprie — apasă ⬆️ pentru a o upgrada cu <code>map()</code>:</div>

<SpellsDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Inserare la Poziție & Sortare

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

**Inserare la poziție specifică** cu `slice()`:

```jsx
const insertAt = 2;
setItems([
  ...items.slice(0, insertAt), // elementele înainte
  { id: nextId++, name: "Nou" }, // elementul nou
  ...items.slice(insertAt), // elementele după
]);
```

**`toSorted()` și `toReversed()`** — variante moderne:

```jsx
// ❌ sort() modifică array-ul original
items.sort((a, b) => a.power - b.power);

// ✅ toSorted() returnează un array nou — fără copie manuală
setItems(items.toSorted((a, b) => a.power - b.power));

// ✅ toReversed() — la fel, fără să modifice originalul
setItems(items.toReversed());
```

<AdmonitionType type="tip">

`toSorted()`, `toReversed()` și `toSpliced()` sunt metodele moderne (ES2023) care returnează un array nou în loc să modifice originalul — perfecte pentru React state.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Obiecte în Array-uri — Capcana Shallow Copy

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Copierea superficială a unui array **nu copiează** și obiectele din interior:

```jsx
const next = [...quests]; // array NOU, dar ACELEAȘI obiecte înăuntru!
const quest = next.find((q) => q.id === id);
quest.done = true; // ❌ modifici originalul din state!
setQuests(next);
```

```jsx
// ✅ Creează obiecte noi cu map() + spread
setQuests(
  quests.map(
    (q) =>
      q.id === id
        ? { ...q, done: true } // obiect nou
        : q, // obiect nemodificat
  ),
);
```

<AdmonitionType type="caution">

Copierea superficială creează un array nou, dar **obiectele din interior rămân aceleași referințe**. Modificarea lor este tot mutație!

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Misiuni — Capcana Shallow Copy

:: content ::

<div class="text-base mb-3">Bifează misiuni, apoi apasă Reset — varianta stricată a corupt <code>initial</code>, Reset nu mai funcționează:</div>

<NestedArrayDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Immer pentru Array-uri

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

Cu Immer poți folosi metode mutante direct pe draft:

```jsx
import { useImmer } from "use-immer";

const [quests, updateQuests] = useImmer(initialQuests);

// ✅ push direct pe draft
function addQuest(name) {
  updateQuests((draft) => {
    draft.push({ id: nextId++, name, done: false });
  });
}

// ✅ modificare proprietate pe obiect din draft
function toggleQuest(id) {
  updateQuests((draft) => {
    const quest = draft.find((q) => q.id === id);
    quest.done = !quest.done; // sintaxă de mutație — safe!
  });
}
```

<AdmonitionType type="tip">

Immer e ideal când ai array-uri de obiecte complexe — elimină nevoia de `map + spread` dublu.

</AdmonitionType>

</div>

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Demo: Immer cu Array de Obiecte

:: content ::

<div class="text-base mb-3">Compară aceleași misiuni gestionate cu <code>map + spread</code> vs. <code>useImmer</code>:</div>

<ArrayImmerDemo />

---
layout: top-title
align: c
color: sky-light
---

:: title ::

# Recap: Actualizarea Array-urilor

:: content ::

<div class="text-lg space-y-4 ns-c-tight">

<div class="grid grid-cols-2 gap-4">

<div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500 text-sm">
<div class="font-bold mb-2">❌ Metode care modifică</div>
<div class="space-y-1">
<div><code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code></div>
<div><code>splice</code>, <code>reverse</code>, <code>sort</code></div>
<div><code>arr[i] = val</code></div>
<div><code>[...arr]</code> + mutație pe obiect interior</div>
</div>
</div>

<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500 text-sm">
<div class="font-bold mb-2">✅ Pattern-uri corecte</div>
<div class="space-y-1">
<div>Adaugă: <code>[...arr, element]</code></div>
<div>Elimină: <code>arr.filter(x => ...)</code></div>
<div>Transformă: <code>arr.map(x => ...)</code></div>
<div>Sortează: <code>arr.toSorted(...)</code></div>
<div>Obiect în array: <code>map + { ...obj }</code></div>
</div>
</div>

</div>

<AdmonitionType type="important" class="mt-2">

**Regula generală:** Dacă metoda modifică array-ul original, **nu o folosi direct pe state**. Copiază întâi sau folosește Immer.

</AdmonitionType>

</div>
