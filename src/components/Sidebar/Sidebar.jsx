import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
import {
    faHome,
    faUsers,
    faChartBar,
    faSignOutAlt,
    faLayerGroup,
    faPlug,
    faBuilding,
    faBoxes,
    faUserCog
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = () => {
    const [masterMenuOpen, setMasterMenuOpen] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [activeMenu, setActiveMenu] = useState('');
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Set initial menu state on page load
    useEffect(() => {
        const path = window.location.pathname;
        if (path === "/") setActiveMenu("dashboard");
        else if (path === "/reports") setActiveMenu("reports");
        else if (["/utility", "/centers", "/programs", "/users"].includes(path)) {
            setActiveMenu("master");
            setMasterMenuOpen(true);
        }

        // Auto-collapse on mobile
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setExpanded(false);
            } else {
                setExpanded(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <div className={`ultra-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="sidebar-backdrop"></div>

                <div className="sidebar-expander" onClick={() => setExpanded(!expanded)}>
                    <div className="expander-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className="sidebar-branding">
                    <div className="hexagon-logo">
                        <span>S</span>
                    </div>
                    <div className="brand-text">
                        <span className="brand-name">SuperAdmin</span>
                        <span className="brand-tagline">Control Panel</span>
                    </div>
                </div>

                <div className="menu-container" ref={menuRef}>
                    <NavLink
                        to="/"
                        className={`menu-card ${activeMenu === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('dashboard')}
                    >
                        <div className="menu-icon">
                            <FontAwesomeIcon icon={faHome} />
                            <div className="icon-ripple"></div>
                        </div>
                        <div className="menu-content">
                            <h3>Dashboard</h3>
                            <p>Overview & analytics</p>
                        </div>
                        <div className="menu-decoration"></div>
                    </NavLink>

                    <div className="master-menu-wrapper">
                        <div
                            className={`menu-card master-card ${activeMenu === 'master' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveMenu('master');
                                setMasterMenuOpen(!masterMenuOpen);
                            }}
                        >
                            <div className="menu-icon">
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <div className="icon-ripple"></div>
                            </div>
                            <div className="menu-content">
                                <h3>Master Menu</h3>
                                <p>System configuration</p>
                            </div>
                            <div className="menu-decoration"></div>
                            <div className={`submenu-toggle ${masterMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                        <div className={`submenu-panel ${masterMenuOpen ? 'open' : ''}`}>
                            <NavLink to="/utility" className={({ isActive }) => isActive ? "submenu-item active" : "submenu-item"}>
                                <div className="submenu-icon">
                                    <FontAwesomeIcon icon={faPlug} />
                                </div>
                                <span>Utilities</span>
                            </NavLink>
                            <NavLink to="/centers" className={({ isActive }) => isActive ? "submenu-item active" : "submenu-item"}>
                                <div className="submenu-icon">
                                    <FontAwesomeIcon icon={faBuilding} />
                                </div>
                                <span>Centers</span>
                            </NavLink>
                            <NavLink to="/programs" className={({ isActive }) => isActive ? "submenu-item active" : "submenu-item"}>
                                <div className="submenu-icon">
                                    <FontAwesomeIcon icon={faBoxes} />
                                </div>
                                <span>Programs</span>
                            </NavLink>
                            <NavLink to="/users" className={({ isActive }) => isActive ? "submenu-item active" : "submenu-item"}>
                                <div className="submenu-icon">
                                    <FontAwesomeIcon icon={faUserCog} />
                                </div>
                                <span>Users</span>
                            </NavLink>
                        </div>
                    </div>

                    <NavLink
                        to="/reports"
                        className={`menu-card ${activeMenu === 'reports' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('reports')}
                    >
                        <div className="menu-icon">
                            <FontAwesomeIcon icon={faChartBar} />
                            <div className="icon-ripple"></div>
                        </div>
                        <div className="menu-content">
                            <h3>Reports</h3>
                            <p>Data & statistics</p>
                        </div>
                        <div className="menu-decoration"></div>
                    </NavLink>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    <div className="logout-icon">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                    <span>Logout</span>
                </button>
            </div>

            {!expanded && (
                <div className="mini-sidebar">
                    <div className="mini-branding" onClick={() => setExpanded(true)}>
                        <div className="mini-logo">S</div>
                    </div>

                    <div className="mini-menu">
                        <NavLink to="/" className={({ isActive }) => isActive ? "mini-item active" : "mini-item"}>
                            <FontAwesomeIcon icon={faHome} />
                            <span className="mini-tooltip">Dashboard</span>
                        </NavLink>

                        <div
                            className={`mini-item ${activeMenu === 'master' ? 'active' : ''}`}
                            onClick={() => {
                                setExpanded(true);
                                setActiveMenu('master');
                                setTimeout(() => setMasterMenuOpen(true), 300);
                            }}
                        >
                            <FontAwesomeIcon icon={faLayerGroup} />
                            <span className="mini-tooltip">Master Menu</span>
                        </div>

                        <NavLink to="/reports" className={({ isActive }) => isActive ? "mini-item active" : "mini-item"}>
                            <FontAwesomeIcon icon={faChartBar} />
                            <span className="mini-tooltip">Reports</span>
                        </NavLink>
                    </div>

                    <div className="mini-logout" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className="mini-tooltip">Logout</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default Sidebar