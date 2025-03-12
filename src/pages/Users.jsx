import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const [users] = useState(JSON.parse(localStorage.getItem('users') || '[]'));
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>Users Management</h2>
        <button className="btn btn-primary" id="addUser" onClick={() => setShowPopup(true)}>
          <FontAwesomeIcon icon={faUserPlus} /> Add User
        </button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-info">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
                <button className="btn-close" onClick={() => setShowPopup(false)}>✖</button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      // value={newUser.name}
                      // onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      // value={newUser.email}
                      // onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      name="role"
                      // value={newUser.role}
                      // onChange={handleChange}
                      required
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      // value={newUser.password}
                      // onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Add User</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;
