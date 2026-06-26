import { useEffect, useState } from 'react';
import './App.css';

const api = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/example';

function imageUrl(creature, nonce) {
  const keywords = creature
    .trim()
    .replace(/s$/, '')
    .split(/\s+/)
    .map(encodeURIComponent)
    .join(',');
  return `https://loremflickr.com/400/300/${keywords}?lock=${nonce}`;
}

function App() {
  const [seaCreatures, setSeaCreatures] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(api)
      .then(async (res) => {
        const payload = await res.json();
        return res.ok && Array.isArray(payload.data) ? payload.data : [];
      })
      .then(setSeaCreatures)
      .catch(() => setSeaCreatures([]));
  }, []);

  function showImage(creature) {
    const nonce = Math.floor(Math.random() * 1_000_000);
    setSelected({ name: creature, url: imageUrl(creature, nonce) });
  }

  return (
    <>
      <h1>Welcome to Blue Ocean</h1>
      <ul>
        {seaCreatures.map((seaCreature, i) => (
          <li key={i}>
            <button
              type="button"
              className="creature-link"
              onClick={() => showImage(seaCreature)}
            >
              {seaCreature}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <figure className="creature-image">
          <img src={selected.url} alt={`A random ${selected.name} photo`} />
          <figcaption>{selected.name}</figcaption>
        </figure>
      )}
    </>
  );
}

export default App;
