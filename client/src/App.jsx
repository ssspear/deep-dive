import { useEffect, useState } from 'react';
import './App.css';

const api = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/example';

function singularize(creature) {
  return creature.trim().replace(/s$/, '');
}

function imageUrl(creature, nonce) {
  const keywords = singularize(creature)
    .split(/\s+/)
    .map(encodeURIComponent)
    .join(',');
  return `https://loremflickr.com/400/300/${keywords}?lock=${nonce}`;
}

function wikiSummaryUrl(creature) {
  const singular = singularize(creature);
  const title = singular.charAt(0).toUpperCase() + singular.slice(1);
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
}

function App() {
  const [seaCreatures, setSeaCreatures] = useState([]);
  const [selected, setSelected] = useState(null);
  const [imageStatus, setImageStatus] = useState('idle');
  const [fact, setFact] = useState({ loading: false, text: '' });

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
    setImageStatus('loading');
    setFact({ loading: true, text: '' });

    fetch(wikiSummaryUrl(creature))
      .then(async (res) => {
        if (!res.ok) return '';
        const payload = await res.json();
        return typeof payload.extract === 'string' ? payload.extract : '';
      })
      .then((text) => setFact({ loading: false, text }))
      .catch(() => setFact({ loading: false, text: '' }));
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
          <div className="image-frame">
            {imageStatus === 'loading' && (
              <p className="image-status" role="status">
                Loading image…
              </p>
            )}
            {imageStatus === 'error' && (
              <p className="image-status image-status--error" role="alert">
                Couldn’t load an image — click again to retry.
              </p>
            )}
            <img
              key={selected.url}
              src={selected.url}
              alt={`A random ${selected.name} photo`}
              className={imageStatus === 'loaded' ? 'is-loaded' : 'is-pending'}
              onLoad={() => setImageStatus('loaded')}
              onError={() => setImageStatus('error')}
            />
          </div>
          <figcaption>{selected.name}</figcaption>
          {fact.loading && <p className="creature-fact">Loading fun fact…</p>}
          {!fact.loading && fact.text && (
            <p className="creature-fact">{fact.text}</p>
          )}
        </figure>
      )}
    </>
  );
}

export default App;
