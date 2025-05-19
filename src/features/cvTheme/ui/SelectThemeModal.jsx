import {Modal} from  "antd";
import {Button} from  "antd";
import { Card } from 'antd';
import './index.scss';
import { useDispatch } from 'react-redux';
import { setStyle } from '../../../entities/cv/model/cvSlice.js';

const SelectThemeModal = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const themes = [
    {
      img: '/public/assets/cvs_styles/industrial.svg',
      name: 'Модерн',
      techName: 'industrial',
    },
    {
      img: '/public/assets/cvs_styles/default.svg',
      name: 'Консервативная',
      techName: 'default',
    },
    {
      img: '/public/assets/cvs_styles/pastel.svg',
      name: 'Пастель',
      techName: 'pastel',
    },
  ];

  return (
    <Modal
      open={open}
      title={'Выберите стиль резюме'}
      className={'select_style_modal'}
      onClose={onClose}
      footerActions={[
        <Button onClick={onClose} key={1}>
          Отмена
        </Button>,
        <Button buttonType={'primary'} onClick={onClose} key={2}>
          Ок
        </Button>,
      ]}
    >
      <div className={'select_style_modal__body'}>
        {themes.map((theme) => (
          <Card
            key={theme.techName}
            hoverable
            cover={<img alt="example" src={theme.img} style={{ borderRadius: 1 }} />}
            style={{ width: 200, borderRadius: 1 }}
            onClick={() => {
              dispatch(setStyle(theme.techName));
            }}
            actions={[
              <Button sizeType={'large'} key={1}>
                {theme.name}
              </Button>,
            ]}
          ></Card>
        ))}
      </div>
    </Modal>
  );
};

export default SelectThemeModal;
