import { useEffect, useState } from 'react';
import './App.css';

const api = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/example';

function App() {
  const [seaCreatures, setSeaCreatures] = useState([]);

  useEffect(() => {
    fetch(api)
      .then(async (res) => {
        const payload = await res.json();
        return res.ok && Array.isArray(payload.data) ? payload.data : [];
      })
      .then(setSeaCreatures)
      .catch(() => setSeaCreatures([]));
  }, []);

  return (
    <>
      <h1>Welcome to Blue Ocean</h1>
      <ul>
        {seaCreatures.map((seaCreature, i) => (
          <li key={i}>{seaCreature}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
