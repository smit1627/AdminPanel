import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('sidebar-active');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                <button
                    className="navbar-toggler d-md-none"
                    onClick={toggleSidebar}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-brand">Dashboard</div>
                <div className="d-flex align-items-center">
                    <div className="dropdown me-3">
                        <button className="btn btn-link position-relative" type="button" data-bs-toggle="dropdown">
                            <FontAwesomeIcon icon={faBell} className="text-muted" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">New User Registration</a></li>
                            <li><a className="dropdown-item" href="#">System Update</a></li>
                            <li><a className="dropdown-item" href="#">New Order Received</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-link" type="button" data-bs-toggle="dropdown">
                            <FontAwesomeIcon icon={faUser} className="text-muted" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar