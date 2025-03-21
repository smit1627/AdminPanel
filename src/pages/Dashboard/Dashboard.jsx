import { useState } from 'react';
import Stats from '../../components/Dashboard/Stats';
import Charts from '../../components/Dashboard/Charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import '../Dashboard/Dashboard.css';

const Dashboard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-12">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <h2>Dashboard Overview</h2>
                        </div>

                        <div className={`dashboard-content ${isExpanded ? 'expanded' : ''}`}>
                            <div className="row g-4">
                                <div className="col-12">
                                    <Stats />
                                </div>
                                <div className="col-12">
                                    <Charts />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;