import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Table, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trash } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Centers/Centers.css';

const CentersDashboard = () => {
  const [centers, setCenters] = useState([
    { id: 1, name: 'Center 12', city: 'AHMEDABAD 1', state: 'Gujarat 1', country: 'India 1', client: 'Outright Software', active: true },
    { id: 2, name: 'Center 2', city: 'AHMEDABAD', state: 'Gujarat', country: 'India', client: 'Hardik Shah 1', active: true },
    { id: 3, name: 'Center 3', city: 'Ahmedabad', state: 'GJ', country: 'IN', client: 'Hardik Shah 1', active: true },
    { id: 4, name: 'DH 1', city: 'Ahmedabad', state: 'Gujarat', country: 'India', client: 'Dhaval Vora', active: true },
    { id: 5, name: 'Sunsea center 1', city: 'PA', state: 'PA', country: 'United states of America', client: 'Sunsea Energy', active: true },
    { id: 6, name: 'XYZ New York', city: 'New York', state: 'NY', country: 'USA', client: 'XYZ Centers', active: true },
  ]);


  const [editCenter, setEditCenter] = useState(null);
  const [viewCenter, setViewCenter] = useState(null);
  const [deleteCenter, setDeleteCenter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    client: 'Outright Software',
    logo: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  // Filter centers based on search term
  const filteredCenters = centers.filter(center =>
    Object.values(center).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort centers
  const sortedCenters = [...filteredCenters].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Get current centers
  const indexOfLastCenter = currentPage * itemsPerPage;
  const indexOfFirstCenter = indexOfLastCenter - itemsPerPage;
  const currentCenters = sortedCenters.slice(indexOfFirstCenter, indexOfLastCenter);

  // Calculate total pages
  const totalPages = Math.ceil(sortedCenters.length / itemsPerPage);

  // Request sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCenter({ ...newCenter, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setNewCenter({ ...newCenter, logo: e.target.files[0] });
  };

  // Handle center creation
  const handleCreateCenter = (e) => {
    e.preventDefault();
    const newId = centers.length > 0 ? Math.max(...centers.map(center => center.id)) + 1 : 1;

    const createdCenter = {
      id: newId,
      name: newCenter.name,
      city: newCenter.city,
      state: newCenter.state,
      country: newCenter.country,
      client: newCenter.client,
      active: true
    };

    setCenters([...centers, createdCenter]);
    setShowCreateModal(false);
    setNewCenter({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      client: 'Outright Software',
      logo: null
    });
  };

  const handleEdit = (center) => setEditCenter(center);
  const handleView = (center) => setViewCenter(center);
  const handleDelete = (id) => setDeleteCenter(id);

  const confirmDelete = () => {
    setCenters(centers.filter(center => center.id !== deleteCenter));
    setDeleteCenter(null);
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  return (
    <div className="centers-dashboard container-fluid p-4">
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Centers</h2>
        <button
          className="btn btn-primary create-btn d-flex align-items-center"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} className="me-2" />
          Create Center
        </button>
      </div>

      <div className="search-container mb-4">
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th onClick={() => requestSort('name')} className="sortable">
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => requestSort('city')} className="sortable">
                City {sortConfig.key === 'city' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => requestSort('state')} className="sortable">
                State {sortConfig.key === 'state' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => requestSort('country')} className="sortable">
                Country {sortConfig.key === 'country' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => requestSort('client')} className="sortable">
                Client {sortConfig.key === 'client' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th onClick={() => requestSort('active')} className="sortable">
                Active {sortConfig.key === 'active' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCenters.map(center => (
              <tr key={center.id}>
                <td>{center.name}</td>
                <td>{center.city}</td>
                <td>{center.state}</td>
                <td>{center.country}</td>
                <td>{center.client}</td>
                <td>
                  <span className={`badge ${center.active ? 'bg-success' : 'bg-secondary'}`}>
                    {center.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm action-btn edit-btn" title="Edit" onClick={() => handleEdit(center)}>
                      <Edit size={18} />
                    </button>
                    <button className="btn btn-sm action-btn view-btn" title="View Details" onClick={() => handleView(center)}  >
                      <Table size={18} />
                    </button>
                    <button className="btn btn-sm action-btn details-btn" title="More Details" onClick={() => handleDelete(center.id)}>
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-info d-flex justify-content-between align-items-center">
        <div>
          Showing {indexOfFirstCenter + 1} to {Math.min(indexOfLastCenter, sortedCenters.length)} of {sortedCenters.length} entries
        </div>
        <nav aria-label="Centers pagination">
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={firstPage}>
                <ChevronsLeft size={18} />
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={prevPage}>
                <ChevronLeft size={18} />
              </button>
            </li>
            {[...Array(totalPages).keys()].map(number => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={nextPage}>
                <ChevronRight size={18} />
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={lastPage}>
                <ChevronsRight size={18} />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Create Center Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Create Center</h5>
              <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateCenter}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newCenter.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={newCenter.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={newCenter.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={newCenter.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zipCode" className="form-label">ZipCode <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    name="zipCode"
                    value={newCenter.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">Country <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={newCenter.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="client" className="form-label">Client <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="client"
                    name="client"
                    value={newCenter.client}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="logo" className="form-label">Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    id="logo"
                    name="logo"
                    onChange={handleFileChange}
                  />
                  {!newCenter.logo && <div className="form-text">No file chosen</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                    Back to List
                  </button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {editCenter && (
        <div className="modal-backdrop" onClick={() => setEditCenter(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Edit Center</h5>
              <button className="btn-close" onClick={() => setEditCenter(null)}></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {editCenter.name}</p>
              <p><strong>City:</strong> {editCenter.city}</p>
              <p><strong>State:</strong> {editCenter.state}</p>
            </div>
          </div>
        </div>
      )}

      {viewCenter && (
        <div className="modal-backdrop" onClick={() => setViewCenter(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Center Details</h5>
              <button className="btn-close" onClick={() => setViewCenter(null)}></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {viewCenter.name}</p>
              <p><strong>Client:</strong> {viewCenter.client}</p>
              <p><strong>Country:</strong> {viewCenter.country}</p>
            </div>
          </div>
        </div>
      )}

      {deleteCenter && (
        <div className="modal-backdrop" onClick={() => setDeleteCenter(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Confirm Deletion</h5>
              <button className="btn-close" onClick={() => setDeleteCenter(null)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this center?</p>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentersDashboard;