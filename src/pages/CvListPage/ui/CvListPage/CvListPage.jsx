import './index.scss';
import { CvList } from '../../../../widgets/cv/index.js';
import { useGetCvListQuery } from '../../../../entities/cv/index.js';
import { useNavigate } from 'react-router-dom';
import {Button} from  "antd";

const CvListPage = () => {
  const { data } = useGetCvListQuery();
  const navigate = useNavigate();

  const onClickNew = () => {
    navigate('/init-constructor');
  };

  return (
    <div className="cv_list_page">
      <div className="cv_list_page__content">
        <h3>Список ваших резюме:</h3>
        <CvList list={data} />
        <Button
          className={'cv_list_page__content__btn'}
          onClick={onClickNew}
          buttonType={'primary'}
          sizeType={'large'}
        >
          Создать новое +
        </Button>
      </div>
    </div>
  );
};

export default CvListPage;
