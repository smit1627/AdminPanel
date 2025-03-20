import React, { useState } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon, XIcon } from 'lucide-react';
import '../App.css';

const Centers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [centers, setCenters] = useState([
    { id: 1, name: 'Center 12', city: 'AHMEDABAD 1', state: 'Gujarat 1', country: 'India 1', client: 'Outright Software', active: true },
    { id: 2, name: 'Center 2', city: 'AHMEDABAD', state: 'Gujarat', country: 'India', client: 'Hardik Shah 1', active: true },
    { id: 3, name: 'Center 3', city: 'Ahmedabad', state: 'GJ', country: 'IN', client: 'Hardik Shah 1', active: true },
    { id: 4, name: 'DH 1', city: 'Ahmedabad', state: 'Gujarat', country: 'India', client: 'Dhaval Vora', active: true },
    { id: 5, name: 'Sunsea center 1', city: 'PA', state: 'PA', country: 'United states of America', client: 'Sunsea Energy', active: true },
    { id: 6, name: 'XYZ New York', city: 'New York', state: 'NY', country: 'USA', client: 'XYZ Centers', active: true },
  ]);

  // New center form state
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    client: 'Outright Software',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  return (
    <div className="centers-container">
      <div className="header">
        <h1>Manage Centers</h1>
        <button
          className="create-button"
          onClick={() => showModal(true)}
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


    </div>
  );
}


const showModal = () => {

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Create Center</h2>
          <button className="close-button" onClick={() => showModal(false)}>
            <XIcon size={18} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleCreateCenter}>
            <div className="form-group">
              <label htmlFor="name">Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCenter.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address <span className="required">*</span></label>
              <input
                type="text"
                id="address"
                name="address"
                value={newCenter.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City <span className="required">*</span></label>
              <input
                type="text"
                id="city"
                name="city"
                value={newCenter.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State <span className="required">*</span></label>
              <input
                type="text"
                id="state"
                name="state"
                value={newCenter.state}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZipCode <span className="required">*</span></label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={newCenter.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country <span className="required">*</span></label>
              <input
                type="text"
                id="country"
                name="country"
                value={newCenter.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="client">Client <span className="required">*</span></label>
              <select
                id="client"
                name="client"
                value={newCenter.client}
                onChange={handleInputChange}
                required
              >
                <option value="Outright Software">Outright Software</option>
                <option value="Hardik Shah 1">Hardik Shah 1</option>
                <option value="Dhaval Vora">Dhaval Vora</option>
                <option value="Sunsea Energy">Sunsea Energy</option>
                <option value="XYZ Centers">XYZ Centers</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="logo">Logo</label>
              <div className="file-upload">
                <button type="button" className="choose-file">Choose File</button>
                <span className="file-name">No file chosen</span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="create-button">Create</button>
              <button
                type="button"
                className="back-button"
                onClick={() => setShowCreateModal(false)}
              >
                Back to List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Centers;