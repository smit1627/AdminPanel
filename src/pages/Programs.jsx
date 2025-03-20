import React, { useState } from 'react';
import { Search, Plus, Edit, List, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trash2 } from 'lucide-react';
import '../App.css';

const Programs = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      utilityName: 'COLUMBIA GAS OF VA',
      programName: 'VA_COL_GAS_VAR_100%_Jan24',
      startDate: '1/1/2024',
      endDate: '',
      active: true,
      ratePlanDetails: [
        { range: '0-100', rate: '0.56', unit: 'Therms' },
        { range: '101+', rate: '0.48', unit: 'Therms' }
      ]
    },
    {
      id: 2,
      utilityName: 'WASHINGTON GAS VA',
      programName: 'VA_Washi_GAS_VAR_100%_Jan24',
      startDate: '1/1/2024',
      endDate: '',
      active: true,
      ratePlanDetails: [
        { range: '0-150', rate: '0.59', unit: 'Therms' },
        { range: '151+', rate: '0.51', unit: 'Therms' }
      ]
    }
  ]);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newProgram, setNewProgram] = useState({
    utilityName: '',
    programName: '',
    startDate: '',
    endDate: '',
    ratePlanDetails: []
  });
  
  // Handle Create Program
  const handleCreateProgram = () => {
    setNewProgram({
      utilityName: '',
      programName: '',
      startDate: '',
      endDate: '',
      ratePlanDetails: []
    });
    setShowCreateForm(true);
    setIsEditing(false);
  };
  
  // Handle Edit Program
  const handleEditProgram = (program) => {
    setNewProgram({
      id: program.id,
      utilityName: program.utilityName,
      programName: program.programName,
      startDate: program.startDate,
      endDate: program.endDate || '',
      active: program.active,
      ratePlanDetails: [...program.ratePlanDetails]
    });
    setShowCreateForm(true);
    setIsEditing(true);
  };
  
  // Handle View Details
  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setShowViewDetailsModal(true);
  };
  
  // Handle Preview
  const handlePreview = (program) => {
    setSelectedProgram(program);
    setShowPreviewModal(true);
  };
  
  // Handle Delete
  const handleDelete = (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(program => program.id !== programId));
    }
  };
  
  // Handle Go Back
  const handleGoBack = () => {
    setShowCreateForm(false);
    setIsEditing(false);
  };
  
  // Handle Add Rate Plan
  const handleAddRatePlan = () => {
    setNewProgram({
      ...newProgram,
      ratePlanDetails: [...newProgram.ratePlanDetails, { range: '', rate: '', unit: '' }]
    });
  };
  
  // Handle Remove Rate Plan
  const handleRemoveRatePlan = (index) => {
    const updatedRatePlans = [...newProgram.ratePlanDetails];
    updatedRatePlans.splice(index, 1);
    setNewProgram({
      ...newProgram,
      ratePlanDetails: updatedRatePlans
    });
  };
  
  // Handle Rate Plan Changes
  const handleRatePlanChange = (index, field, value) => {
    const updatedRatePlans = [...newProgram.ratePlanDetails];
    updatedRatePlans[index][field] = value;
    setNewProgram({
      ...newProgram,
      ratePlanDetails: updatedRatePlans
    });
  };
  
  // Handle Form Changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({
      ...newProgram,
      [name]: value
    });
  };
  
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing program
      setPrograms(programs.map(program => 
        program.id === newProgram.id ? newProgram : program
      ));
    } else {
      // Add new program
      const newId = Math.max(...programs.map(p => p.id)) + 1;
      setPrograms([...programs, { ...newProgram, id: newId, active: true }]);
    }
    
    setShowCreateForm(false);
    setIsEditing(false);
  };
  
  // Format date for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    }
    return dateString;
  };
  
  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    
    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    }
    return dateString;
  };
  
  // Filter programs based on search term
  const filteredPrograms = programs.filter(program => 
    program.utilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="programs-container">
      {!showCreateForm ? (
        <div className="container py-4">
          <div className="card main-card">
            {/* Header */}
            <div className="card-header d-flex justify-content-between align-items-center">
              <h1 className="programs-title">Manage Programs</h1>
              <div className="d-flex">
                <div className="position-relative me-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="search-icon" size={18} />
                </div>
                <button
                  onClick={handleCreateProgram}
                  className="btn btn-primary create-btn"
                >
                  <Plus size={18} className="me-2" />
                  Create Program
                </button>
              </div>
            </div>
            
            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Utility Name</th>
                    <th>Program Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((program) => (
                    <tr key={program.id} className="table-row">
                      <td className="utility-name">{program.utilityName}</td>
                      <td>{program.programName}</td>
                      <td>{program.startDate}</td>
                      <td>{program.endDate || '—'}</td>
                      <td>
                        <span className={`badge ${program.active ? 'bg-success' : 'bg-secondary'}`}>
                          {program.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-sm btn-outline-primary me-1" 
                            title="Edit"
                            onClick={() => handleEditProgram(program)}
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1" 
                            title="View Details"
                            onClick={() => handleViewDetails(program)}
                          >
                            <List size={18} />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-primary me-1" 
                            title="Preview"
                            onClick={() => handlePreview(program)}
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            title="Delete"
                            onClick={() => handleDelete(program.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div className="pagination-info">
                Showing 1 to {filteredPrograms.length} of {filteredPrograms.length} entries
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item">
                    <button className="page-link" aria-label="First">
                      <ChevronsLeft size={18} />
                    </button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" aria-label="Previous">
                      <ChevronLeft size={18} />
                    </button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" aria-label="Next">
                      <ChevronRight size={18} />
                    </button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" aria-label="Last">
                      <ChevronsRight size={18} />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-4">
          <div className="card create-form-card">
            {/* Create/Edit Form Header */}
            <div className="card-header">
              <h2 className="form-title">{isEditing ? 'Edit Program' : 'Create Program'}</h2>
              <p className="form-subtitle">{isEditing ? 'Edit existing program' : 'Create new program'}</p>
            </div>
            
            {/* Create/Edit Form */}
            <div className="card-body">
              <form onSubmit={handleSubmit} className="create-form">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Utility <span className="text-danger">*</span>
                      </label>
                      <select 
                        className="form-select" 
                        required
                        name="utilityName"
                        value={newProgram.utilityName}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Utility</option>
                        <option value="COLUMBIA GAS OF VA">COLUMBIA GAS OF VA</option>
                        <option value="WASHINGTON GAS VA">WASHINGTON GAS VA</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Program Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="programName"
                        value={newProgram.programName}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Start Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        required
                        name="startDate"
                        value={formatDateForInput(newProgram.startDate)}
                        onChange={(e) => setNewProgram({
                          ...newProgram,
                          startDate: formatDateForDisplay(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={formatDateForInput(newProgram.endDate)}
                        onChange={(e) => setNewProgram({
                          ...newProgram,
                          endDate: formatDateForDisplay(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label className="form-label">
                          Status
                        </label>
                        <select 
                          className="form-select"
                          name="active"
                          value={newProgram.active}
                          onChange={(e) => setNewProgram({
                            ...newProgram,
                            active: e.target.value === 'true'
                          })}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Rate Plan Details */}
                <div className="rate-plan-section">
                  <h3 className="section-title mb-3">Rate Plan Details</h3>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Range</th>
                          <th>Rate</th>
                          <th>Unit</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newProgram.ratePlanDetails.length > 0 ? (
                          newProgram.ratePlanDetails.map((detail, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={detail.range}
                                  onChange={(e) => handleRatePlanChange(index, 'range', e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  step="0.01"
                                  className="form-control"
                                  value={detail.rate}
                                  onChange={(e) => handleRatePlanChange(index, 'rate', e.target.value)}
                                />
                              </td>
                              <td>
                                <select 
                                  className="form-select"
                                  value={detail.unit}
                                  onChange={(e) => handleRatePlanChange(index, 'unit', e.target.value)}
                                >
                                  <option value="">Select Unit</option>
                                  <option value="kWh">kWh</option>
                                  <option value="Therms">Therms</option>
                                </select>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleRemoveRatePlan(index)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No rate plan details added yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddRatePlan}
                    className="btn btn-outline-primary add-rate-btn"
                  >
                    <Plus size={16} className="me-2" /> Add Rate Plan Detail
                  </button>
                </div>
                
                {/* Form Actions */}
                <div className="form-actions mt-4 pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                  >
                    {isEditing ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="btn btn-secondary"
                  >
                    Go Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* View Details Modal */}
      {showViewDetailsModal && selectedProgram && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Program Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewDetailsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p className="fw-bold mb-1">Utility Name:</p>
                    <p>{selectedProgram.utilityName}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="fw-bold mb-1">Program Name:</p>
                    <p>{selectedProgram.programName}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="fw-bold mb-1">Start Date:</p>
                    <p>{selectedProgram.startDate}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="fw-bold mb-1">End Date:</p>
                    <p>{selectedProgram.endDate || '—'}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="fw-bold mb-1">Status:</p>
                    <span className={`badge ${selectedProgram.active ? 'bg-success' : 'bg-secondary'}`}>
                      {selectedProgram.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <h6 className="mt-4 mb-3">Rate Plan Details</h6>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Range</th>
                        <th>Rate</th>
                        <th>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProgram.ratePlanDetails && selectedProgram.ratePlanDetails.length > 0 ? (
                        selectedProgram.ratePlanDetails.map((detail, index) => (
                          <tr key={index}>
                            <td>{detail.range}</td>
                            <td>{detail.rate}</td>
                            <td>{detail.unit}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">No rate plan details available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowViewDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Preview Modal */}
      {showPreviewModal && selectedProgram && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Program Preview</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPreviewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="card">
                  <div className="card-header bg-light">
                    <h4>{selectedProgram.programName}</h4>
                    <span className={`badge ${selectedProgram.active ? 'bg-success' : 'bg-secondary'}`}>
                      {selectedProgram.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="fw-bold">Utility Provider:</p>
                        <p>{selectedProgram.utilityName}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="fw-bold">Valid Period:</p>
                        <p>{selectedProgram.startDate} - {selectedProgram.endDate || 'Ongoing'}</p>
                      </div>
                    </div>
                    
                    <h5 className="mt-4">Rate Structure</h5>
                    <div className="table-responsive mt-3">
                      <table className="table table-striped">
                        <thead className="table-primary">
                          <tr>
                            <th>Usage Range</th>
                            <th>Rate per Unit</th>
                            <th>Unit Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProgram.ratePlanDetails && selectedProgram.ratePlanDetails.map((detail, index) => (
                            <tr key={index}>
                              <td>{detail.range}</td>
                              <td>${detail.rate}</td>
                              <td>{detail.unit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4 p-3 bg-light rounded">
                      <h6>Program Notes</h6>
                      <p>This program is designed for {selectedProgram.utilityName} customers and provides tiered pricing based on usage.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleEditProgram(selectedProgram);
                  }}
                >
                  Edit This Program
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowPreviewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Backdrop */}
      {(showViewDetailsModal || showPreviewModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default Programs;