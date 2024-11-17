import { Table, TableProps, Typography, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterComponent, { FilterField } from '../../ui/filter';
import ConfirmModal from '../../ui/confirm-modal';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteSchool, fetchSchools, School } from '../../redux/slices/schools';
import styles from './index.module.css';

const { Title } = Typography;

const filterFields: FilterField[] = [
  { type: 'text', label: 'Name', key: 'name', placeholder: 'Search by Name' },
  { type: 'select', label: 'Level', key: 'level', options: ['Primary', 'Middle', 'High'] },
];

function Schools() {
  const dispatch = useDispatch<AppDispatch>();
  const { schools, loading } = useSelector((state: RootState) => state.schools);

  const [filters, setFilters] = useState<Record<string, any>>({});
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSchools(filters));
  }, [filters, dispatch]);

  const showDeleteModal = (school: School) => {
    setSelectedSchool(school.id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedSchool) return;

    try {
      await dispatch(deleteSchool(selectedSchool)).unwrap();
      message.success('School deleted successfully');
    } catch (error) {
      message.error('Failed to delete school');
    }
    setDeleteModalVisible(false);
    setSelectedSchool(null);
  };

  const columns: TableProps<School>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Level', dataIndex: 'level', key: 'level', align: 'center' },
    { title: 'Principal', dataIndex: 'principal', key: 'principal' },
    { title: 'Students Count', dataIndex: 'studentsCount', key: 'studentsCount', align: 'center' },
    { title: 'Location', dataIndex: 'location', key: 'location', align: 'center' },
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
        Schools
      </Title>
      <FilterComponent filters={filterFields} setFilters={setFilters} />
      <Table
        dataSource={schools}
        columns={columns}
        rowKey={(data) => data.id}
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete School"
        content={<p>Are you sure you want to delete <b>{selectedSchool}</b>?</p>}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Schools;
