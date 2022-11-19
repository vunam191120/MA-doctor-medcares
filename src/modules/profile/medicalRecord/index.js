import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ImEye } from 'react-icons/im';
import { HiPencil } from 'react-icons/hi';

import Tag from '../../../components/Tag';
import { formatDateAndTime } from '../../../helpers/formatDate';
import {
  fetchMedicalRecords,
  selectMedicalRecordIsLoading,
  selectMedicalRecords,
} from '../../../store/slices/medicalRecordsSlice';
import { selectUserNeedUpdate } from '../../../store/slices/usersSlice';

export default function MedicalRecord() {
  const dispatch = useDispatch();
  const medicalRecords = useSelector(selectMedicalRecords);
  const isLoading = useSelector(selectMedicalRecordIsLoading);
  const user = useSelector(selectUserNeedUpdate);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(fetchMedicalRecords(user.doctor_id));
    }
  }, [dispatch, user, user.doctor_id]);

  const medicalRecordColumns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'record_id',
    },
    {
      title: 'Patient ID',
      key: 'patient_id',
      dataIndex: 'patient_id',
    },
    {
      title: 'Patient Name',
      key: 'patient_name',
      dataIndex: 'patient_name',
    },
    // {
    //   title: 'Address',
    //   key: 'patient_address',
    //   dataIndex: 'patient_address',
    // },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => <Tag status={record.status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="button-containers">
          <Link
            to={`detail/${record.record_id}`}
            className="button button--blue--light square"
          >
            <ImEye className="icon" />
            <span>View</span>
          </Link>
          <Link
            to={`update/${record.record_id}`}
            className="button button--light square"
          >
            <HiPencil className="icon" />
            <span>Update</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="medical-record-container">
      <div className="header">
        <h3 className="title">Medical Record</h3>
        <Link to="create" className="button button--blue--light">
          Add medical record
        </Link>
      </div>

      <Table
        className="medical-record-table"
        x={true}
        loading={isLoading}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        columns={medicalRecordColumns}
        dataSource={medicalRecords}
        rowKey={(record) => record.record_id}
      />
    </div>
  );
}
