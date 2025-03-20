import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import {
    faHome,
    faUsers,
    faChartBar,
    faCog,
    faClipboard,
    faAngleDown,
    faAngleRight,
    faLayerGroup,
    faTools,
    faBuilding,
    faPuzzlePiece,
    faSignOutAlt // Added logout icon
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const [masterMenuOpen, setMasterMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        // Clear authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Add any other auth-related items you need to clear
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="sidebar bg-dark text-white p-2">
            <div className="sidebar-header p-3">
                <h3 className="text-center">SuperAdmin Panel</h3>
            </div>
            <div className="sidebar-menu">
                <NavLink to="/" className="menu-item">
                    <FontAwesomeIcon icon={faHome} /> <span className="ms-2">Dashboard</span>
                </NavLink>
                
                {/* Master Menu dropdown */}
                <div className="dropdown-menu-container">
                    <div 
                        className="menu-item" 
                        onClick={() => setMasterMenuOpen(!masterMenuOpen)}
                    >
                        <div>
                            <FontAwesomeIcon icon={faLayerGroup} /> <span className="ms-2">Master Menu</span>
                        </div>
                        <FontAwesomeIcon 
                            icon={masterMenuOpen ? faAngleDown : faAngleRight} 
                            className="ms-auto" 
                        />
                    </div>
                    
                    <div className={`sub-menu ${masterMenuOpen ? 'open' : ''}`}>
                        <NavLink to="/utility" className="sub-menu-item">
                            <span>Utilities</span>
                        </NavLink>
                        <NavLink to="/centers" className="sub-menu-item">
                            <span>Centers</span>
                        </NavLink>
                        <NavLink to="/programs" className="sub-menu-item">
                            <span>Programs</span>
                        </NavLink>
                        <NavLink to="/users" className="sub-menu-item">
                            <span>Users</span>
                        </NavLink>
                    </div>
                </div>
                
                <NavLink to="/reports" className="menu-item">
                    <FontAwesomeIcon icon={faChartBar} /> <span className="ms-2">Reports</span>
                </NavLink>
                
                {/* Logout button - changed from NavLink to button */}
                <button onClick={handleLogout} className="menu-item" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> <span className="ms-2">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar