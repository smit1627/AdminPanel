import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarWeek,
    faCalendarDay,
    faCalendarAlt,
    faDollarSign,
    faChartLine,
    faChartBar,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import Charts from '../components/Dashboard/Charts';
import Stats from '../components/Dashboard/Stats';
import Navbar from '../components/Navbar'



const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    const reports = [
        {
            id: 'weekly',
            title: 'Weekly Reports',
            icon: faCalendarWeek,
            color: '#4361ee',
            description: 'View detailed weekly performance metrics and analytics',
            lastUpdated: '2 days ago'
        },
        {
            id: 'daily',
            title: 'Daily Reports',
            icon: faCalendarDay,
            color: '#2ec4b6',
            description: 'Track daily activities and performance indicators',
            lastUpdated: 'Today'
        },
        {
            id: 'monthly',
            title: 'Monthly Reports',
            icon: faCalendarAlt,
            color: '#f72585',
            description: 'Monthly overview of business performance and metrics',
            lastUpdated: '5 days ago'
        },
        {
            id: 'expenses',
            title: 'Expenses Reports',
            icon: faDollarSign,
            color: '#e63946',
            description: 'Track and analyze company expenses and costs',
            lastUpdated: 'Yesterday'
        },
        {
            id: 'profit',
            title: 'Company Profit Reports',
            icon: faChartLine,
            color: '#2ec4b6',
            description: 'Monitor company profits and revenue streams',
            lastUpdated: '3 days ago'
        },
        {
            id: 'loss',
            title: 'Company Loss Reports',
            icon: faChartBar,
            color: '#e63946',
            description: 'Analyze and track company losses and liabilities',
            lastUpdated: '1 week ago'
        },
        {
            id: 'salary',
            title: 'Salary Reports',
            icon: faUsers,
            color: '#4cc9f0',
            description: 'Employee salary and compensation analysis',
            lastUpdated: '4 days ago'
        }
    ];

    return (
        <div className="reports-container">
            {/* <Sidebar /> */}
            {/* <div className="main-content">
                
            </div> */}
            <div className="reports-header">
                <h2>Reports Dashboard</h2>
                <p>View and analyze different types of reports</p>
            </div>

            <div className="reports-grid">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className={`report-card ${selectedReport === report.id ? 'selected' : ''}`}
                        onClick={() => setSelectedReport(report.id)}
                    >
                        <div className="report-icon" style={{ backgroundColor: report.color }}>
                            <FontAwesomeIcon icon={report.icon} />
                        </div>
                        <div className="report-content">
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                            <div className="report-footer">
                                <span>Last updated: {report.lastUpdated}</span>
                                <button className="view-report-btn">View Report</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
