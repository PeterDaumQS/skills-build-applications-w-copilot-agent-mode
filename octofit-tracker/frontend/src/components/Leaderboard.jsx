import { useEffect, useState } from 'react';
import { getCollection } from '../api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadLeaderboard() {
      try {
        const data = await getCollection('leaderboard');
        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <span className="text-muted">{items.length} entries</span>
      </div>

      {loading && <div className="alert alert-secondary">Loading leaderboard…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {items.length === 0 ? (
            <div className="alert alert-info">No leaderboard entries available yet.</div>
          ) : (
            items.map((item, index) => (
              <div className="list-group-item d-flex justify-content-between align-items-center" key={item.id || item._id || `${item.name || 'entry'}-${index}`}>
                <div>
                  <h3 className="h6 mb-1">{item.name || item.user || item.username || 'Player'}</h3>
                  <div className="text-muted">{item.score || item.points || item.total || 'No score'}</div>
                </div>
                <span className="badge bg-primary rounded-pill">#{index + 1}</span>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
