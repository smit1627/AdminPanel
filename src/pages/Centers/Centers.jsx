import React, { useState, useEffect } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon, XIcon } from 'lucide-react';
import '../Centers/Centers.css';

const Centers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [centers, setCenters] = useState([]);

  // New center form state
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    client: 'Outright Software',
    active: true,
  });

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Load centers from localStorage on component mount
  useEffect(() => {
    const storedCenters = localStorage.getItem('centers');
    if (storedCenters && centers.length === 0) { // Check if there is already data in localStorage and state is empty
      setCenters(JSON.parse(storedCenters));
    }
  }, []);

  // Save centers to localStorage whenever they change
  useEffect(() => {
    // Only save to localStorage when centers state is updated
    if (centers.length > 0) {
      console.log('Saving centers to localStorage:', centers); // Debugging log
      localStorage.setItem('centers', JSON.stringify(centers));
    }
  }, [centers]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCenters = [...centers].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCenters = sortedCenters.filter(
    center =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current centers for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCenters = filteredCenters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter({
      ...newCenter,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const resetForm = () => {
    setNewCenter({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      client: 'Outright Software',
      active: true,
    });
    setSelectedFile(null);
    setFileName('No file chosen');
  };

  const handleCreateCenter = (e) => {
    e.preventDefault();

    // Generate a new unique ID
    const newId = centers.length > 0
      ? Math.max(...centers.map(center => center.id)) + 1
      : 1;

    // Create the new center object
    const centerToAdd = {
      ...newCenter,
      id: newId,
      logo: selectedFile ? fileName : null,
    };

    // Add to centers array
    const updatedCenters = [...centers, centerToAdd];
    setCenters(updatedCenters);

    // Update localStorage
    console.log(updatedCenters);

    localStorage.setItem('centers', JSON.stringify(updatedCenters));

    // Reset form and close modal
    resetForm();
    setShowCreateModal(false);
  };

  return (
    <div className="centers-container">
      <div className="header">
        <h1>Manage Centers</h1>
        <button
          className="create-button"
          onClick={() => setShowCreateModal(true)}
        >
          <PlusIcon size={16} />
          Create Center
        </button>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by name, city, or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="centers-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className={sortField === 'name' ? `sort-${sortDirection}` : ''}>
                Name
              </th>
              <th onClick={() => handleSort('city')} className={sortField === 'city' ? `sort-${sortDirection}` : ''}>
                City
              </th>
              <th onClick={() => handleSort('state')} className={sortField === 'state' ? `sort-${sortDirection}` : ''}>
                State
              </th>
              <th onClick={() => handleSort('country')} className={sortField === 'country' ? `sort-${sortDirection}` : ''}>
                Country
              </th>
              <th onClick={() => handleSort('client')} className={sortField === 'client' ? `sort-${sortDirection}` : ''}>
                Client
              </th>
              <th onClick={() => handleSort('active')} className={sortField === 'active' ? `sort-${sortDirection}` : ''}>
                Active
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCenters.map((center) => (
              <tr key={center.id} className="center-row">
                <td>{center.name}</td>
                <td>{center.city}</td>
                <td>{center.state}</td>
                <td>{center.country}</td>
                <td>{center.client}</td>
                <td>
                  <span className={`status-badge ${center.active ? 'active' : 'inactive'}`}>
                    {center.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-button edit">
                    <PencilIcon size={16} />
                  </button>
                  <button className="action-button view">
                    <EyeIcon size={16} />
                  </button>
                  <button className="action-button delete">
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCenters.length)} of {filteredCenters.length} entries
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo;
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &lsaquo;
          </button>

          <button className="pagination-button active">{currentPage}</button>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &raquo;
          </button>
        </div>
      </div>

      {/* Create Center Modal */}
      {showCreateModal && (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white rounded-lg w-full max-w-lg shadow-lg animate-fadeIn">
            <div className="modal-header p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Create Center</h2>
              <button className="close-button text-gray-600 hover:text-gray-900" onClick={() => setShowCreateModal(false)}>
                <XIcon size={18} />
              </button>
            </div>
            <div className="modal-body p-6">
              <form onSubmit={handleCreateCenter}>
                <div className="form-group mb-4">
                  <label htmlFor="name" className="form-label text-gray-700">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newCenter.name}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="address" className="form-label text-gray-700">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={newCenter.address}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="city" className="form-label text-gray-700">City <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={newCenter.city}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="state" className="form-label text-gray-700">State <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={newCenter.state}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="zipCode" className="form-label text-gray-700">ZipCode <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={newCenter.zipCode}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="country" className="form-label text-gray-700">Country <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={newCenter.country}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="client" className="form-label text-gray-700">Client <span className="text-red-500">*</span></label>
                  <select
                    id="client"
                    name="client"
                    value={newCenter.client}
                    onChange={handleInputChange}
                    required
                    className="form-control border-gray-300 p-3 rounded-md w-full"
                  >
                    <option value="Outright Software">Outright Software</option>
                    <option value="Hardik Shah 1">Hardik Shah 1</option>
                    <option value="Dhaval Vora">Dhaval Vora</option>
                    <option value="Sunsea Energy">Sunsea Energy</option>
                    <option value="XYZ Centers">XYZ Centers</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="logo" className="form-label text-gray-700">Logo</label>
                  <div className="file-upload flex flex-col items-start">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      className="choose-file bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                      onClick={() => document.getElementById('logo').click()}
                    >
                      Choose File
                    </button>
                    <span className="file-name text-gray-600 mt-2">{fileName}</span>
                  </div>
                </div>

                <div className="modal-footer p-4 border-t border-gray-200 flex justify-between">
                  <button type="submit" className="create-button bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
                    Create
                  </button>
                  <button
                    type="button"
                    className="back-button bg-gray-100 text-gray-700 p-3 rounded-md hover:bg-gray-200"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Back to List
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Centers;