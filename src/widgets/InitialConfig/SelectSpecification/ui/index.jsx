import './index.scss';
import ITImg from '../../../../../public/assets/page_images/spec/prog_picture.svg?react';
import ManagerImg from '../../../../../public/assets/page_images/spec/manager_picture.svg?react';
import EduImg from '../../../../../public/assets/page_images/spec/edu_picture.svg?react';
import { SpecCard } from './SpecCard.jsx';
import { useGSAP } from '@gsap/react';
import gsap, { Quint } from 'gsap';
import { useRef, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

// TODO заменить иконки на спецификации профессий!
const specItems = [
  {
    image: <ITImg />,
    title: 'IT - специалист',
    value: 'technic',
  },
  {
    image: <ManagerImg />,
    title: 'Менеджмент',
    value: 'sign',
  },
  {
    image: <EduImg />,
    title: 'Образование',
    value: 'social',
  },
  // {
  //   image: <ITImg />,
  //   title: 'IT - специалист',
  // },
  // {
  //   image: <ManagerImg />,
  //   title: 'Менеджмент',
  // },
  // {
  //   image: <EduImg />,
  //   title: 'Образование',
  // },
  // {
  //   image: <EduImg />,
  //   title: 'Образование',
  // },
];

const SelectSpecification = ({ onClickStart, selectElementSpec }) => {
  const { contextSafe } = useGSAP();
  const buttonRef = useRef(null);
  const [confirmIconPosition, setConfirmIconPosition] = useState({});
  const navigate = useNavigate();
  let location = useLocation();

  const animateOnSelect = contextSafe(() => {
    gsap.to(buttonRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: Quint.easeIn,
    });
  });

  const onClickSpecCard = (e, el) => {
    const position = e.currentTarget.getBoundingClientRect();
    setConfirmIconPosition({
      left: position.left - position.width - 50,
      top: position.top,
    });
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('type', el.value);
    const newSearch = searchParams.toString();
    window.history.replaceState(null, '', `${location.pathname}?${newSearch}`);
    selectElementSpec(el);
    animateOnSelect();
  };

  const confirmIconElement = (
    <CheckCircleOutlined
      style={{
        color: '#38b664',
        filter: 'drop-shadow(0px 0px 2px rgba(0, 171, 52, 1))',
        position: 'absolute',
        transform: 'scale(8)',
        opacity: '1',
        top: '-500px',
        ...confirmIconPosition,
      }}
    />
  );

  return (
    <>
      <div className={'select_specification'}>
        <div className="select_specification__scroll">
          <div className="select_specification__scroll__list">
            {specItems.map((el) => (
              <SpecCard
                avatar={el.image}
                title={el.title}
                key={el.value}
                onClick={(e) => {
                  onClickSpecCard(e, el);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        className={
          'uiXeny-button--primary uiXeny-button uiXeny-button--sizeMedium uiXeny-button--sizeLarge'
        }
        style={{
          position: 'absolute',
          opacity: 0,
          bottom: '20%',
          boxShadow: '10px 9px 8px 0px rgba(34, 60, 80, 0.15)',
        }}
        onClick={() => {
          onClickStart();
        }}
        ref={buttonRef}
      >
        Продолжить
      </button>
    </>
  );
};

export default SelectSpecification;
