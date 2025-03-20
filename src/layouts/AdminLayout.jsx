import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const AdminLayout = () => {
    return (
        <div className="row">
            <div className="col-lg-2">
                <Sidebar />
            </div>
            <div className="col-lg-10">
                <div className="main-content">
                    <Navbar />
                    <div className="content-wrapper">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout