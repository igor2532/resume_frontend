import { useEffect, useState } from 'react';
import { useTheme } from '../../../shared/hooks/useTheme';
import { useParams } from 'react-router-dom';
import { useGetCvByIdQuery } from '../../../entities/cv';
import { useDispatch } from 'react-redux';
import { ConstructorSideBar } from '../../../features/cv';
import { CvContentHOC } from '../../../widgets/CvContentHOC';
import { setCv } from '../../../entities/cv/model/cvSlice';

const ConstructorPage = () => {
  const { changeTheme } = useTheme();
  const [editMode, setEditMode] = useState(false); // режим редактирования

  useEffect(() => {
    changeTheme('cvConstructorTheme');
  }, []);

  const { cv_id } = useParams();
  const { data: cv } = useGetCvByIdQuery(+cv_id, { skip: !cv_id });
  const dispatch = useDispatch();

  useEffect(() => {
    if (cv) {
      dispatch(setCv(cv));
    }
  }, [cv, dispatch]);

  return (
    <div className={'constructor_page'}>
      {/* Кнопка переключения режимов */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10, maxWidth:'800px', margin: '0 auto' }}>
        <button  onClick={() => setEditMode((prev) => !prev)}>
          {editMode ? 'Вернуться к просмотру' : 'Редактировать'}
        </button>
      </div>
      {/* Контент по режиму */}
      {editMode ? (
           <div className="constructor-sidebar">
        <ConstructorSideBar />
         </div>
      ) : (
        <div className="constructor_page__content_wrapper">
          <CvContentHOC />
        </div>
      )}
    </div>
  );
};

export default ConstructorPage;
