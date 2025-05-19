import { useSelector } from 'react-redux';
import List from '/src/shared/components/List/List';
import {Button} from  "antd";
import { useDeleteProjectMutation } from '../../../entities/cv/index.js';
import { useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const ProjectsList = () => {
  const projects = useSelector((state) => state.cv.cv?.projects);
  const [deleteProject] = useDeleteProjectMutation();
  const { cv_id } = useParams();

  const projectsOptions = projects?.map((item) => ({
    name: item.name,
    description: item.description,
    action: (
      <Button
        buttonStatus={'danger'}
        onClick={() => {
          deleteProject({ cv_id, project_id: item.id });
        }}
      >
        <DeleteOutlined />
      </Button>
    ),
  }));

  return (
    <div className="job_list">
      <List options={projectsOptions} />
    </div>
  );
};

export default ProjectsList;
