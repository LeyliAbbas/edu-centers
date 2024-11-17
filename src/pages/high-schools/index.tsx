import { Table, TableProps, Typography, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterComponent, { FilterField } from '../../ui/filter';
import ConfirmModal from '../../ui/confirm-modal';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteHighSchool, fetchHighSchools, HighSchool } from '../../redux/slices/highSchools';
import styles from './index.module.css';

const { Title } = Typography;

const filterFields: FilterField[] = [
  { type: 'text', label: 'Name', key: 'name', placeholder: 'Search by Name' },
  { type: 'select', label: 'Region', key: 'region', options: ['North', 'South', 'East', 'West', 'Midwest'] },
  { type: 'number', label: 'Graduation Rate', key: 'graduationRate', placeholder: 'Enter Graduation Rate' }
];

function HighSchools() {
  const dispatch = useDispatch<AppDispatch>();
  const { highSchools, loading } = useSelector((state: RootState) => state.highSchools);

  const [filters, setFilters] = useState<Record<string, any>>({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedHighSchool, setSelectedHighSchool] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchHighSchools(filters));
  }, [filters, dispatch]);

  const showDeleteModal = (highSchool: HighSchool) => {
    setSelectedHighSchool(highSchool.id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedHighSchool) return;

    try {
      await dispatch(deleteHighSchool(selectedHighSchool)).unwrap();
      message.success('High School deleted successfully');
    } catch (error) {
      message.error('Failed to delete high school');
    }
    setDeleteModalVisible(false);
    setSelectedHighSchool(null);
  };

  const columns: TableProps<HighSchool>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Region', dataIndex: 'region', key: 'region', align: 'center' },
    { title: 'Year Established', dataIndex: 'yearEstablished', key: 'yearEstablished', align: 'center' },
    { title: 'Principal', dataIndex: 'principal', key: 'principal' },
    { title: 'Graduation Rate (%)', dataIndex: 'graduationRate', key: 'graduationRate', align: 'center' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => showDeleteModal(record)}
        >
          Delete
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        High Schools
      </Title>
      <FilterComponent filters={filterFields} setFilters={setFilters} />
      <Table
        dataSource={highSchools}
        columns={columns}
        rowKey={(data) => data.id}
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete High School"
        content={<p>Are you sure you want to delete <b>{selectedHighSchool}</b>?</p>}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default HighSchools;
