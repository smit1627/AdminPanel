import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Download, Calendar, Filter, RefreshCw, ChevronDown,
  Grid, List, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { DatePicker, Select, Tabs, Card, Statistic, Table, Button, Dropdown, Menu } from 'antd';
import moment from 'moment';

import '../Reports/Reports.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports = () => {
  // State for all data
  const [utilities, setUtilities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters and date ranges
  const [dateRange, setDateRange] = useState([moment().subtract(30, 'days'), moment()]);
  const [viewType, setViewType] = useState('grid');
  const [activeTab, setActiveTab] = useState('overview');
  const [filterUtility, setFilterUtility] = useState('all');
  const [filterCenter, setFilterCenter] = useState('all');
  const [filterProgram, setFilterProgram] = useState('all');

  // Derived data for charts
  const [utilityData, setUtilityData] = useState([]);
  const [centerData, setCenterData] = useState([]);
  const [programData, setProgramData] = useState([]);
  const [userData, setUserData] = useState([]);

  // Load data from localStorage when component mounts
  useEffect(() => {
    setLoading(true);

    try {
      // Load utilities
      const storedUtilities = JSON.parse(localStorage.getItem('utilities') || '[]');
      setUtilities(storedUtilities);

      // Load centers
      const storedCenters = JSON.parse(localStorage.getItem('centers') || '[]');
      setCenters(storedCenters);

      // Load programs
      const storedPrograms = JSON.parse(localStorage.getItem('programs') || '[]');
      setPrograms(storedPrograms);

      // Load users
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      setUsers(storedUsers);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Process data when it changes
  useEffect(() => {
    processUtilityData();
    processCenterData();
    processProgramData();
    processUserData();
  }, [utilities, centers, programs, users, filterUtility, filterCenter, filterProgram, dateRange]);

  // Process utility data for charts
  const processUtilityData = () => {
    if (!utilities || utilities.length === 0) return;

    // Group utilities by state
    const stateGroups = utilities.reduce((acc, utility) => {
      const state = utility.state || 'Unknown';
      if (!acc[state]) acc[state] = 0;
      acc[state]++;
      return acc;
    }, {});

    // Convert to chart data format
    const chartData = Object.keys(stateGroups).map(state => ({
      name: state,
      value: stateGroups[state]
    }));

    setUtilityData(chartData);
  };

  // Process center data for charts
  const processCenterData = () => {
    if (!centers || centers.length === 0) return;

    // Group centers by client
    const clientGroups = centers.reduce((acc, center) => {
      const client = center.client || 'Unknown';
      if (!acc[client]) acc[client] = 0;
      acc[client]++;
      return acc;
    }, {});

    // Convert to chart data format
    const chartData = Object.keys(clientGroups).map(client => ({
      name: client,
      value: clientGroups[client]
    }));

    setCenterData(chartData);
  };

  // Process program data for charts
  const processProgramData = () => {
    if (!programs || programs.length === 0) return;

    // Group programs by utility
    const utilityGroups = programs.reduce((acc, program) => {
      const utility = program.utilityName || 'Unknown';
      if (!acc[utility]) acc[utility] = 0;
      acc[utility]++;
      return acc;
    }, {});

    // Convert to chart data format
    const chartData = Object.keys(utilityGroups).map(utility => ({
      name: utility,
      value: utilityGroups[utility]
    }));

    setProgramData(chartData);
  };

  // Process user data for charts
  const processUserData = () => {
    if (!users || users.length === 0) return;

    // Group users by role
    const roleGroups = users.reduce((acc, user) => {
      const role = user.role || 'Unknown';
      if (!acc[role]) acc[role] = 0;
      acc[role]++;
      return acc;
    }, {});

    // Convert to chart data format
    const chartData = Object.keys(roleGroups).map(role => ({
      name: role,
      value: roleGroups[role]
    }));

    setUserData(chartData);
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  // Handle export report
  const handleExportReport = () => {
    alert('Exporting report...');
    // Implement export functionality (CSV, PDF, etc.)
  };

  // Summary statistics
  const summaryStats = [
    { title: 'Total Utilities', value: utilities?.length || 0, icon: 'utility' },
    { title: 'Total Centers', value: centers?.length || 0, icon: 'center' },
    { title: 'Total Programs', value: programs?.length || 0, icon: 'program' },
    { title: 'Total Users', value: users?.length || 0, icon: 'user' }
  ];

  // Render icon based on type
  const renderIcon = (type) => {
    switch (type) {
      case 'utility': return <div className="stat-icon utility-icon"></div>;
      case 'center': return <div className="stat-icon center-icon"></div>;
      case 'program': return <div className="stat-icon program-icon"></div>;
      case 'user': return <div className="stat-icon user-icon"></div>;
      default: return null;
    }
  };

  // Generate mock time series data for usage trends
  const generateTimeSeriesData = () => {
    const data = [];
    const startDate = moment(dateRange[0]);
    const endDate = moment(dateRange[1]);
    const daysDiff = endDate.diff(startDate, 'days');

    for (let i = 0; i <= daysDiff; i++) {
      const date = moment(startDate).add(i, 'days');
      data.push({
        date: date.format('YYYY-MM-DD'),
        usage: Math.floor(Math.random() * 100) + 50,
        cost: Math.floor(Math.random() * 200) + 100
      });
    }

    return data;
  };

  const timeSeriesData = generateTimeSeriesData();

  // Generate mock program performance data
  const generateProgramPerformanceData = () => {
    if (!programs || programs.length === 0) return [];

    return programs.slice(0, 5).map(program => ({
      name: program.programName,
      performance: Math.floor(Math.random() * 100),
      enrollment: Math.floor(Math.random() * 1000),
      savings: Math.floor(Math.random() * 5000)
    }));
  };

  const programPerformanceData = generateProgramPerformanceData();

  // Table columns for detailed reports
  const utilitiesColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: status => (
        <span className={`status-badge ${status ? 'active' : 'inactive'}`}>
          {status ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const centersColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'State', dataIndex: 'state', key: 'state' },
    { title: 'Client', dataIndex: 'client', key: 'client' },
    {
      title: 'Status', dataIndex: 'active', key: 'active',
      render: active => (
        <span className={`status-badge ${active ? 'active' : 'inactive'}`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const programsColumns = [
    { title: 'Utility Name', dataIndex: 'utilityName', key: 'utilityName' },
    { title: 'Program Name', dataIndex: 'programName', key: 'programName' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    {
      title: 'End Date', dataIndex: 'endDate', key: 'endDate',
      render: endDate => endDate || '—'
    },
    {
      title: 'Status', dataIndex: 'active', key: 'active',
      render: active => (
        <span className={`status-badge ${active ? 'active' : 'inactive'}`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const usersColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: status => (
        <span className={`status-badge ${status === 'Active' ? 'active' : 'inactive'}`}>
          {status || 'Unknown'}
        </span>
      )
    }
  ];

  // Filter menu
  const filterMenu = (
    <Menu>
      <Menu.Item key="1">
        <h4>Filter by Utility</h4>
        <Select
          style={{ width: 200 }}
          value={filterUtility}
          onChange={setFilterUtility}
        >
          <Option value="all">All Utilities</Option>
          {utilities && utilities.map(utility => (
            <Option key={utility.id} value={utility.id}>{utility.name}</Option>
          ))}
        </Select>
      </Menu.Item>
      <Menu.Item key="2">
        <h4>Filter by Center</h4>
        <Select
          style={{ width: 200 }}
          value={filterCenter}
          onChange={setFilterCenter}
        >
          <Option value="all">All Centers</Option>
          {centers && centers.map(center => (
            <Option key={center.id} value={center.id}>{center.name}</Option>
          ))}
        </Select>
      </Menu.Item>
      <Menu.Item key="3">
        <h4>Filter by Program</h4>
        <Select
          style={{ width: 200 }}
          value={filterProgram}
          onChange={setFilterProgram}
        >
          <Option value="all">All Programs</Option>
          {programs && programs.map(program => (
            <Option key={program.id} value={program.id}>{program.programName}</Option>
          ))}
        </Select>
      </Menu.Item>
    </Menu>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading report data...</p>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <div className="title-section">
          <h1>Reports & Analytics</h1>
          <p>Comprehensive insights and data visualization</p>
        </div>

        <div className="actions-section">
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            className="date-picker"
          />

          <Dropdown overlay={filterMenu} trigger={['click']}>
            <Button className="filter-button">
              <Filter size={16} />
              Filters
              <ChevronDown size={16} />
            </Button>
          </Dropdown>

          <Button
            type="primary"
            icon={<Download size={16} />}
            onClick={handleExportReport}
            className="export-button"
          >
            Export Report
          </Button>
        </div>
      </div>

      <div className="view-toggle">
        <Button
          type={viewType === 'grid' ? 'primary' : 'default'}
          icon={<Grid size={16} />}
          onClick={() => setViewType('grid')}
        >
          Grid
        </Button>
        <Button
          type={viewType === 'list' ? 'primary' : 'default'}
          icon={<List size={16} />}
          onClick={() => setViewType('list')}
        >
          List
        </Button>
      </div>

      <div className="summary-stats">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="stat-card">
            {renderIcon(stat.icon)}
            <Statistic
              title={stat.title}
              value={stat.value}
              className="stat-value"
            />
          </Card>
        ))}
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="report-tabs">
        <TabPane tab="Overview" key="overview">
          <div className="overview-section">
            <div className="chart-row">
              <Card title="Utilities by State" className="chart-card">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={utilityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {utilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Centers by Client" className="chart-card">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={centerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Centers" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="chart-row">
              <Card title="Programs by Utility" className="chart-card">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={programData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#0088FE" name="Programs" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Users by Role" className="chart-card">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card title="Usage Trends" className="full-width-card">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="usage"
                    stroke="#8884d8"
                    name="Usage (kWh)"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cost"
                    stroke="#82ca9d"
                    name="Cost ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Program Performance" className="full-width-card">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance (%)" />
                  <Bar dataKey="enrollment" fill="#82ca9d" name="Enrollment" />
                  <Bar dataKey="savings" fill="#ffc658" name="Savings ($)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="Utilities" key="utilities">
          <Card title="Utilities Report" className="report-detail-card">
            <div className="report-summary">
              <div className="summary-item">
                <h3>Total Utilities</h3>
                <p className="summary-value">{utilities?.length || 0}</p>
              </div>
              <div className="summary-item">
                <h3>Active Utilities</h3>
                <p className="summary-value">
                  {utilities?.filter(u => u.status).length || 0}
                </p>
              </div>
              <div className="summary-item">
                <h3>Inactive Utilities</h3>
                <p className="summary-value">
                  {utilities?.filter(u => !u.status).length || 0}
                </p>
              </div>
            </div>

            <div className="chart-section">
              <h3>Utilities by State</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={utilityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {utilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="table-section">
              <h3>Utilities List</h3>
              <Table
                dataSource={utilities}
                columns={utilitiesColumns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Centers" key="centers">
          <Card title="Centers Report" className="report-detail-card">
            <div className="report-summary">
              <div className="summary-item">
                <h3>Total Centers</h3>
                <p className="summary-value">{centers?.length || 0}</p>
              </div>
              <div className="summary-item">
                <h3>Active Centers</h3>
                <p className="summary-value">
                  {centers?.filter(c => c.active).length || 0}
                </p>
              </div>
              <div className="summary-item">
                <h3>Inactive Centers</h3>
                <p className="summary-value">
                  {centers?.filter(c => !c.active).length || 0}
                </p>
              </div>
            </div>

            <div className="chart-section">
              <h3>Centers by Client</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={centerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" name="Centers" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="table-section">
              <h3>Centers List</h3>
              <Table
                dataSource={centers}
                columns={centersColumns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Programs" key="programs">
          <Card title="Programs Report" className="report-detail-card">
            <div className="report-summary">
              <div className="summary-item">
                <h3>Total Programs</h3>
                <p className="summary-value">{programs?.length || 0}</p>
              </div>
              <div className="summary-item">
                <h3>Active Programs</h3>
                <p className="summary-value">
                  {programs?.filter(p => p.active).length || 0}
                </p>
              </div>
              <div className="summary-item">
                <h3>Inactive Programs</h3>
                <p className="summary-value">
                  {programs?.filter(p => !p.active).length || 0}
                </p>
              </div>
            </div>

            <div className="chart-section">
              <h3>Programs by Utility</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" name="Programs" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-section">
              <h3>Program Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance (%)" />
                  <Bar dataKey="enrollment" fill="#82ca9d" name="Enrollment" />
                  <Bar dataKey="savings" fill="#ffc658" name="Savings ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="table-section">
              <h3>Programs List</h3>
              <Table
                dataSource={programs}
                columns={programsColumns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Users" key="users">
          <Card title="Users Report" className="report-detail-card">
            <div className="report-summary">
              <div className="summary-item">
                <h3>Total Users</h3>
                <p className="summary-value">{users?.length || 0}</p>
              </div>
              <div className="summary-item">
                <h3>Active Users</h3>
                <p className="summary-value">
                  {users?.filter(u => u.status === 'Active').length || 0}
                </p>
              </div>
              <div className="summary-item">
                <h3>Inactive Users</h3>
                <p className="summary-value">
                  {users?.filter(u => u.status !== 'Active').length || 0}
                </p>
              </div>
            </div>

            <div className="chart-section">
              <h3>Users by Role</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {userData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="table-section">
              <h3>Users List</h3>
              <Table
                dataSource={users}
                columns={usersColumns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reports;