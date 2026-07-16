import React, { useEffect, useState } from 'react';
import { getCollection } from '../api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadTeams() {
      try {
        const data = await getCollection('teams');
        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Teams</h2>
        <span className="text-muted">{items.length} teams</span>
      </div>

      {loading && <div className="alert alert-secondary">Loading teams…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No teams available yet.</div>
            </div>
          ) : (
            items.map((item, index) => (
              <div className="col-12 col-md-6" key={item.id || item._id || `${item.name || 'team'}-${index}`}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h6">{item.name || item.teamName || 'Team'}</h3>
                    <p className="mb-1 text-muted">{item.description || item.motto || 'No description provided.'}</p>
                    <small className="text-muted">Members: {item.members?.length || item.memberCount || 0}</small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Teams;
