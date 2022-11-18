import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchMedicalRecord,
  selectMedicalRecordIsLoading,
  selectMedicalRecordNeedUpdate,
} from '../../../../store/slices/medicalRecordsSlice';

export default function MedicalRecordDetail() {
  const { record_id } = useParams();
  const dispatch = useDispatch();
  const medicalRecordNeedUpdate = useSelector(selectMedicalRecordNeedUpdate);
  const { medical_record, images, prescriptions } = medicalRecordNeedUpdate;
  const isLoading = useSelector(selectMedicalRecordIsLoading);

  useEffect(() => {
    dispatch(fetchMedicalRecord(record_id));
  }, [dispatch, record_id]);

  return (
    <>
      {/* Medical Record Detail */}
      <div className="medical-detail-container info-list">
        <h3 className="title">Medical Record Information</h3>
        <div className="info-list">
          <div className="info-item">
            <span className="info-title">Patient Name: </span>
            <span className="info-text">{medical_record.patient_name}</span>
          </div>
          <div className="info-item">
            <span className="info-title">Address: </span>
            <span className="info-text">{medical_record.patient_address}</span>
          </div>
          <div className="info-item">
            <span className="info-title">Diagnose: </span>
            <span className="info-text">{medical_record.diagnose}</span>
          </div>
        </div>
      </div>

      {/* Document */}
      <div className="medical-detail-container document-list">
        <h3 className="title">Documents</h3>
        <div className="document-list"></div>
      </div>

      <div className="medical-detail-container prescription-list">
        <h3 className="title">Prescription</h3>
        {/* Prescription */}
        <div className="prescription"></div>
      </div>
    </>
  );
}
