import { Table, TableProps, Modal, Button, Typography, message } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterComponent, { FilterField } from '../../components/filter';
import ConfirmModal from '../../components/confirm-modal';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteUniversity, fetchUniversities, University } from '../../redux/slices/universities';
import styles from './index.module.css';

const { Title } = Typography;

const filterFields: FilterField[] = [
  { type: 'text', label: 'Name', key: 'name', placeholder: 'Search by Name' },
  { type: 'number', label: 'Year of Establishment', key: 'year', placeholder: 'Enter Year' },
  {
    type: 'select',
    label: 'Region',
    key: 'region',
    options: ['North America', 'Europe', 'Asia', 'Oceania', 'Africa', 'South America'],
  },
];

function Universities() {
  const dispatch = useDispatch<AppDispatch>();
  const { universities, loading } = useSelector((state: RootState) => state.universities);

  const [filters, setFilters] = useState<Record<string, any>>({});
  const [corpusModalVisible, setCorpusModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCorpus, setSelectedCorpus] = useState<string[] | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUniversities(filters));
  }, [filters, dispatch]);

  const showCorpusModal = (corpus: string[], universityName: string) => {
    setSelectedCorpus(corpus);
    setSelectedUniversity(universityName);
    setCorpusModalVisible(true);
  };

  const showDeleteModal = (university: University) => {
    setSelectedUniversity(university.id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedUniversity) return;

    try {
      await dispatch(deleteUniversity(selectedUniversity)).unwrap();
      message.success('University deleted successfully');
    } catch (error) {
      message.error('Failed to delete university');
    }
    setDeleteModalVisible(false);
    setSelectedUniversity(null);
  };

  const columns: TableProps<University>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Year', dataIndex: 'year', key: 'year', align: 'center' },
    { title: 'Region', dataIndex: 'region', key: 'region', align: 'center' },
    {
      title: 'Corpus',
      dataIndex: 'corpus',
      key: 'corpus',
      render: (_, { corpus, name }) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => showCorpusModal(corpus, name)}>
          View
        </Button>
      ),
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => showDeleteModal(record)}>
          Delete
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Universities
      </Title>
      <FilterComponent filters={filterFields} setFilters={setFilters} />
      <Table
        dataSource={universities}
        columns={columns}
        rowKey={(data) => data.id}
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
      <Modal
        title={selectedUniversity}
        open={corpusModalVisible}
        onCancel={() => setCorpusModalVisible(false)}
        footer={null}
      >
        {selectedCorpus && (
          <ul>
            {selectedCorpus.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </Modal>
      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete University"
        content={<p>Are you sure you want to delete <b>{selectedUniversity}</b>?</p>}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default Universities;
