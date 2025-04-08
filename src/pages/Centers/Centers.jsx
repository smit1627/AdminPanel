import React, { useState, useEffect } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { X as XIcon, Save as SaveIcon, ChevronDown as ChevronDownIcon, Upload as UploadIcon, Image as ImageIcon, PlusCircle as PlusCircleIcon } from "lucide-react";
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
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl animate-fadeIn overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                <PlusCircleIcon size={22} className="text-blue-500 mr-2" />
                Create Center
              </h2>
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                onClick={() => setShowCreateModal(false)}
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-white">
              <form onSubmit={handleCreateCenter} className="space-y-5">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Center Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newCenter.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter center name"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
                      Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={newCenter.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Street address"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={newCenter.city}
                      onChange={handleInputChange}
                      required
                      placeholder="City"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={newCenter.state}
                      onChange={handleInputChange}
                      required
                      placeholder="State"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">
                      Zip Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={newCenter.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="ZIP / Postal code"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={newCenter.country}
                      onChange={handleInputChange}
                      required
                      placeholder="Country"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="client" className="block text-sm font-medium text-slate-700 mb-1">
                      Client <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="client"
                        name="client"
                        value={newCenter.client}
                        onChange={handleInputChange}
                        required
                        className="appearance-none w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors bg-white text-slate-800 pr-10"
                      >
                        <option value="" disabled>Select client</option>
                        <option value="Outright Software">Outright Software</option>
                        <option value="Hardik Shah 1">Hardik Shah 1</option>
                        <option value="Dhaval Vora">Dhaval Vora</option>
                        <option value="Sunsea Energy">Sunsea Energy</option>
                        <option value="XYZ Centers">XYZ Centers</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <ChevronDownIcon size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="logo" className="block text-sm font-medium text-slate-700 mb-1">
                      Logo
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => document.getElementById('logo').click()}>
                          <UploadIcon size={24} className="text-blue-400 mb-2" />
                          <div className="text-sm text-slate-600">
                            {fileName ? (
                              <div className="flex items-center">
                                <ImageIcon size={16} className="mr-1 text-blue-500" />
                                {fileName}
                              </div>
                            ) : (
                              <span>Click to upload logo (optional)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-between gap-4 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <XIcon size={18} className="mr-1.5" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center shadow-sm"
                  >
                    <SaveIcon size={18} className="mr-1.5" />
                    Create Center
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