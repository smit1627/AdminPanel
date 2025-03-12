import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faUsers,
    faChartBar,
    faCog,
    faClipboard
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    return (

        <div className="sidebar bg-dark text-white p-2">
            <div className="sidebar-header p-3">
                <h3 className="text-center">Admin Panel</h3>
            </div>
            <div className="sidebar-menu">
                <NavLink to="/" className="menu-item">
                    <FontAwesomeIcon icon={faHome} /> Dashboard
                </NavLink>
                <NavLink to="/users" className="menu-item">
                    <FontAwesomeIcon icon={faUsers} /> Users
                </NavLink>
                <NavLink to="/reports" className="menu-item">
                    <FontAwesomeIcon icon={faChartBar} /> Reports
                </NavLink>
                <NavLink to="/tasks" className="menu-item">
                    <FontAwesomeIcon icon={faClipboard} /> Tasks
                </NavLink>
                <NavLink to="/settings" className="menu-item">
                    <FontAwesomeIcon icon={faCog} /> Settings
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar