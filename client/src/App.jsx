import { useEffect, useState } from 'react';
import CreatureCard from './components/CreatureCard';
import './App.css';

const api = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/example';
const creaturesApi = api.replace(/\/example$/, '/creatures');

function imageUrl(name, nonce) {
  const keywords = name
    .trim()
    .replace(/s$/, '')
    .split(/\s+/)
    .map(encodeURIComponent)
    .join(',');
  return `https://loremflickr.com/400/300/${keywords}?lock=${nonce}`;
}

function App() {
  const [creatures, setCreatures] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(creaturesApi)
      .then(async (res) => {
        const payload = await res.json();
        return res.ok && Array.isArray(payload.data) ? payload.data : [];
      })
      .then(setCreatures)
      .catch(() => setCreatures([]));
  }, []);

  function handleSelect(creature) {
    const nonce = Math.floor(Math.random() * 1_000_000);
    setSelected({
      ...creature,
      imageUrl: imageUrl(creature.name, nonce),
    });
  }

  return (
    <>
      <h1>Welcome to Blue Ocean</h1>
      <ul>
        {creatures.map((creature, i) => (
          <li key={i}>
            <button
              type="button"
              className="creature-link"
              onClick={() => handleSelect(creature)}
            >
              {creature.name}
            </button>
          </li>
        ))}
      </ul>
      {selected && <CreatureCard creature={selected} />}
    </>
  );
}

export default App;
