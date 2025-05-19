import { useSelector } from 'react-redux';
import List from '/src/shared/components/List/List';
import {Button} from  "antd";
import { useDeleteInstitutMutation } from '../../../entities/cv/index.js';
import { useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const InstitutList = () => {
  const institutions = useSelector((state) => state.cv.cv?.institutions);
  const [deleteInstitut] = useDeleteInstitutMutation();
  const { cv_id } = useParams();

  const institutOptions = institutions?.map((item) => ({
    name: item.name,
    description: item.speciality,
    action: (
      <Button
        buttonStatus={'danger'}
        onClick={() => {
          deleteInstitut({ cv_id, institution_id: item.id });
        }}
      >
        <DeleteOutlined />
      </Button>
    ),
  }));

  return (
    <div className="job_list">
      <List options={institutOptions} />
    </div>
  );
};

export default InstitutList;
