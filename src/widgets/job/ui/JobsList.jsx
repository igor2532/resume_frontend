import { useSelector } from 'react-redux';
import List from '/src/shared/components/List/List';
import {Button} from  "antd";
import { useDeleteJobMutation } from '../../../entities/cv/index.js';
import { useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const JobsList = () => {
  const jobs = useSelector((state) => state.cv.cv?.jobs);
  const [deleteJob] = useDeleteJobMutation();
  const { cv_id } = useParams();

  const jobsOptions = jobs?.map((item) => ({
    name: item.name,
    description: item.commitment,
    action: (
      <Button
        buttonStatus={'danger'}
        // buttonType={'primary'}
        onClick={() => {
          deleteJob({ cv_id, id: item.id });
        }}
      >
        <DeleteOutlined />
      </Button>
    ),
  }));

  return (
    <div className="job_list">
      <List options={jobsOptions} />
    </div>
  );
};

export default JobsList;
