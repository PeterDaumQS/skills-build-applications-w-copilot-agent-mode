import React, { useEffect, useState } from 'react';
import { getCollection } from '../api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadWorkouts() {
      try {
        const data = await getCollection('workouts');
        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Workouts</h2>
        <span className="text-muted">{items.length} workouts</span>
      </div>

      {loading && <div className="alert alert-secondary">Loading workouts…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No workouts available yet.</div>
            </div>
          ) : (
            items.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id || item._id || `${item.name || 'workout'}-${index}`}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h6">{item.name || item.type || 'Workout'}</h3>
                    <p className="mb-1 text-muted">{item.description || item.focus || 'No description provided.'}</p>
                    <small className="text-muted">{item.duration || item.length || 'Duration unknown'}</small>
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

export default Workouts;
