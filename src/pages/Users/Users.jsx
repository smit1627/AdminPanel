import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus, faSearch, faFilter, faTimes, faSave, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../Users/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  // Load users from localStorage when component mounts
  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setUsers(storedUsers);
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      setUsers([]);
    }
  }, []);

  // Handle input change for add user form
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle input change for edit user form
  const handleEditChange = (e) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission for new user
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new user object with a unique ID
    const userToAdd = { ...newUser, id: Date.now(), status: 'Active' };

    // Update state and localStorage
    const updatedUsers = [...users, userToAdd];
    setUsers(updatedUsers);
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }

    // Reset form and close modal
    setNewUser({ name: '', email: '', role: 'User', password: '' });
    setShowPopup(false);
  };

  // Handle saving edited user
  const handleSaveEdit = () => {
    if (!editedUser) return;

    const updatedUsers = users.map(user =>
      user.id === editedUser.id ? editedUser : user
    );

    setUsers(updatedUsers);
    try {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
    }
    setEditMode(false);
    setSelectedUser(editedUser);
  };

  // Handle user click to open sidebar
  const handleUserClick = (user) => {
    if (!user) return;

    setSelectedUser(user);
    setEditedUser({ ...user });
    setShowSidebar(true);
    setEditMode(false);
  };

  // Close sidebar
  const closeSidebar = () => {
    setShowSidebar(false);
    setSelectedUser(null);
    setEditMode(false);
    setEditedUser(null);
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    if (!userId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      try {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error saving users to localStorage:", error);
      }

      // Close sidebar if the deleted user was selected
      if (selectedUser && selectedUser.id === userId) {
        closeSidebar();
      }
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    if (!user) return false;

    const userName = user.name || '';
    const userEmail = user.email || '';

    return userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Inactive': return 'bg-gray-400';
      case 'Suspended': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  // Safely get user avatar URL
  const getUserAvatarUrl = (userName) => {
    if (!userName) return `https://ui-avatars.com/api/?name=User&background=random&color=fff&bold=true`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff&bold=true`;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
              onClick={() => setShowPopup(true)}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Add User</span>
            </button>
          </div>

          {/* Search and filter bar */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
                <FontAwesomeIcon icon={faFilter} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Users table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    user && (
                      <tr
                        key={user.id || Math.random()}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => handleUserClick(user)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                                src={getUserAvatarUrl(user.name)}
                                alt={user.name || 'User'}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name || 'Unnamed User'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email || 'No email'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.role || 'User'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)} text-white`}>
                            {user.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 transition p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUserClick(user);
                                setEditMode(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 transition p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUser(user.id);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No users found. Add a new user to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">Add New User</h3>
              <button
                className="text-gray-400 hover:text-gray-500 transition"
                onClick={() => setShowPopup(false)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
        {selectedUser && (
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editMode ? 'Edit User' : 'User Details'}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeSidebar}
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>

            {/* User Details Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                  {editMode ? (
                    <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 text-5xl" />
                  ) : (
                    <img
                      className="h-24 w-24 rounded-full object-cover border-4 border-gray-200"
                      src={getUserAvatarUrl(selectedUser.name)}
                      alt={selectedUser.name || 'User'}
                    />
                  )}
                </div>
                {editMode ? (
                  <div className="w-full">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedUser?.name || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedUser?.email || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
                      <select
                        name="role"
                        value={editedUser?.role || 'User'}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                      <select
                        name="status"
                        value={editedUser?.status || 'Active'}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={editedUser?.password || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedUser.name || 'Unnamed User'}</h3>
                    <p className="text-gray-500">{selectedUser.email || 'No email'}</p>
                  </>
                )}
              </div>

              {!editMode && (
                <div className="space-y-4">
                  <div className="border-t border-b border-gray-200 py-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">User Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="text-base font-medium text-gray-900">{selectedUser.role || 'User'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(selectedUser.status)} text-white`}>
                          {selectedUser.status || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 py-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Account Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="text-base font-medium text-gray-900">{selectedUser.id || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="text-base font-medium text-gray-900">
                          {selectedUser.id ? new Date(selectedUser.id).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 py-4">
                    <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Security</h4>
                    <div>
                      <p className="text-sm text-gray-500">Password</p>
                      <p className="text-base font-medium text-gray-900">••••••••</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between">
                {editMode ? (
                  <>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => {
                        setEditMode(false);
                        setEditedUser(selectedUser ? { ...selectedUser } : null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                      onClick={handleSaveEdit}
                    >
                      <FontAwesomeIcon icon={faSave} />
                      <span>Save Changes</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-4 py-2 border border-gray-300 text-red-600 rounded-md hover:bg-red-50 transition flex items-center gap-2"
                      onClick={() => selectedUser && handleDeleteUser(selectedUser.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                      onClick={() => setEditMode(true)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;