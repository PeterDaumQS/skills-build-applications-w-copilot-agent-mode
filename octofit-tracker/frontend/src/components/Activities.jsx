import { useEffect, useState } from 'react';
import { getCollection } from '../api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadActivities() {
      try {
        const data = await getCollection('activities');
        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Activities</h2>
        <span className="text-muted">{items.length} records</span>
      </div>

      {loading && <div className="alert alert-secondary">Loading activities…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No activities available yet.</div>
            </div>
          ) : (
            items.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id || item._id || `${item.name || 'activity'}-${index}`}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h6">{item.name || item.title || 'Activity'}</h3>
                    <p className="mb-1 text-muted">{item.description || item.type || 'No description provided.'}</p>
                    <small className="text-muted">{item.date || item.createdAt || 'Unknown date'}</small>
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

export default Activities;
