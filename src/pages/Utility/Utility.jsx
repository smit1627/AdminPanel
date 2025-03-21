import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Select,
  message,
  Badge,
  Tooltip,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ExportOutlined,
  EyeOutlined,
  CheckCircleFilled,
  CloseCircleFilled
} from '@ant-design/icons';
import '../Utility/Utility.css';

const Utility = () => {
  // State management
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50'],
  });

  // Mock fetch utilities data (replace with actual API call)
  const fetchUtilities = async (page = 1, pageSize = 10, searchQuery = '') => {
    setLoading(true);
    try {
      // Replace this with your actual API call
      // const response = await api.get('/utilities', { params: { page, pageSize, search: searchQuery } });
      // setUtilities(response.data.items);
      // setPagination({...pagination, total: response.data.total, current: page})

      // Mock data for demonstration
      setTimeout(() => {
        // Sample data - replace with your API response
        const mockData = [
          { id: 1, clientName: 'Client A', utilityName: 'Electricity', code1: 'ELEC001', code2: 'REG123', active: true, lastUpdated: '2025-03-10' },
          { id: 2, clientName: 'Client B', utilityName: 'Water', code1: 'WAT002', code2: 'REG456', active: true, lastUpdated: '2025-03-09' },
          { id: 3, clientName: 'Client C', utilityName: 'Gas', code1: 'GAS003', code2: 'REG789', active: false, lastUpdated: '2025-03-08' },
          { id: 4, clientName: 'Client D', utilityName: 'Internet', code1: 'NET004', code2: 'REG101', active: true, lastUpdated: '2025-03-07' },
          { id: 5, clientName: 'Client E', utilityName: 'Waste Management', code1: 'WST005', code2: 'REG112', active: false, lastUpdated: '2025-03-06' },
        ];

        const filteredData = mockData.filter(item =>
          searchQuery ?
            item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.utilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code1.toLowerCase().includes(searchQuery.toLowerCase()) :
            true
        );

        setUtilities(filteredData);
        setPagination({ ...pagination, total: filteredData.length, current: page });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch utilities:', error);
      message.error('Failed to load utilities data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilities(pagination.current, pagination.pageSize, searchText);
  }, []);

  // Modal handlers
  const showModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingRecord) {
        // Replace with your actual API call for updating
        // const response = await api.put(`/utilities/${editingRecord.id}`, values);
        message.success('Utility updated successfully');
      } else {
        // Replace with your actual API call for creating
        // const response = await api.post('/utilities', values);
        message.success('Utility created successfully');
      }

      // Refresh the list
      fetchUtilities(pagination.current, pagination.pageSize, searchText);

      // Close modal and reset form
      setIsModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
    } catch (error) {
      console.error('Failed to save utility:', error);
      message.error('Failed to save utility');
    }
  };

  // Search handler
  const handleSearch = () => {
    fetchUtilities(1, pagination.pageSize, searchText);
  };

  // Refresh handler
  const handleRefresh = () => {
    setSearchText('');
    fetchUtilities(1, pagination.pageSize, '');
  };

  // Export handler
  const handleExport = () => {
    message.success('Exporting data...');
    // Implement export functionality
  };

  // Table handlers
  const handleEdit = (record) => {
    showModal(record);
  };

  const handleDelete = async (id) => {
    try {
      // Replace with your actual API call
      // await api.delete(`/utilities/${id}`);
      message.success('Utility deleted successfully');
      fetchUtilities(pagination.current, pagination.pageSize, searchText);
    } catch (error) {
      console.error('Failed to delete utility:', error);
      message.error('Failed to delete utility');
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchUtilities(pagination.current, pagination.pageSize, searchText);
  };

  const handleView = (record) => {
    // Implement view functionality
    console.log('View record:', record);
    message.info(`Viewing details for ${record.clientName}`);
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
      render: (text, record) => (
        <div className="font-medium text-gray-800 hover:text-blue-500 cursor-pointer" onClick={() => handleView(record)}>
          {text}
        </div>
      ),
    },
    {
      title: 'Utility Name',
      dataIndex: 'utilityName',
      key: 'utilityName',
      sorter: (a, b) => a.utilityName.localeCompare(b.utilityName),
    },
    {
      title: 'Code 1',
      dataIndex: 'code1',
      key: 'code1',
      render: (text) => <span className="font-mono text-sm">{text}</span>,
    },
    {
      title: 'Code 2',
      dataIndex: 'code2',
      key: 'code2',
      render: (text) => <span className="font-mono text-sm">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Badge
          status={active ? "success" : "error"}
          text={
            <span className={active ? "text-green-600" : "text-red-600"}>
              {active ? (
                <><CheckCircleFilled className="mr-1" /> Active</>
              ) : (
                <><CloseCircleFilled className="mr-1" /> Inactive</>
              )}
            </span>
          }
        />
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="text-green-500 hover:text-green-700"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this utility?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-red-500 hover:text-red-700"
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Render
  return (
    <div className="utility-container p-6 bg-gray-50 min-h-screen">
      <div className="header-section mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Manage Utilities</h1>
          <div className="flex items-center space-x-3">
            <Tooltip title="Refresh">
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                className="refresh-button me-3"
              />
            </Tooltip>
            <div className="search-box">
              <Input
                placeholder="Search by client, utility or code..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handleSearch}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="search-input me-3"
                allowClear
              />
              <Button
                type="primary"
                onClick={handleSearch}
                className="search-button me-5"
              >
                Search
              </Button>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
              className="create-button px-4 py-3"
            >
              Create Utility
            </Button>
          </div>
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          Showing {utilities.length} utilities. Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={utilities}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          locale={{ emptyText: 'No data available in table' }}
          rowClassName={(record, index) => index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          className="utilities-table"
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Create/Edit Utility Modal */}
      <Modal
        title={editingRecord ? "Edit Utility" : "Create New Utility"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="utility-modal"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ active: true }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="clientName"
              label="Client Name"
              rules={[{ required: true, message: 'Please enter client name' }]}
              className="col-span-2"
            >
              <Input placeholder="Enter client name" className="form-input" />
            </Form.Item>

            <Form.Item
              name="utilityName"
              label="Utility Name"
              rules={[{ required: true, message: 'Please enter utility name' }]}
              className="col-span-2"
            >
              <Input placeholder="Enter utility name" className="form-input" />
            </Form.Item>

            <Form.Item
              name="code1"
              label="Code 1"
              rules={[{ required: true, message: 'Please enter code 1' }]}
            >
              <Input placeholder="Enter code 1" className="form-input" />
            </Form.Item>

            <Form.Item
              name="code2"
              label="Code 2"
            >
              <Input placeholder="Enter code 2 (optional)" className="form-input" />
            </Form.Item>

            <Form.Item
              name="active"
              label="Status"
              initialValue={true}
            >
              <Select className="form-select">
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleCancel} className="cancel-button">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="submit-button">
              {editingRecord ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Utility;