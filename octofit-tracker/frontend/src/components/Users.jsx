import React, { useEffect, useState } from 'react';
import { getCollection } from '../api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadUsers() {
      try {
        const data = await getCollection('users');
        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Users</h2>
        <span className="text-muted">{items.length} users</span>
      </div>

      {loading && <div className="alert alert-secondary">Loading users…</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {items.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info">No users available yet.</div>
            </div>
          ) : (
            items.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id || item._id || `${item.name || 'user'}-${index}`}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h6">{item.name || item.username || item.email || 'User'}</h3>
                    <p className="mb-1 text-muted">{item.email || item.role || 'No profile info provided.'}</p>
                    <small className="text-muted">{item.team || item.location || 'No additional details'}</small>
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

export default Users;
