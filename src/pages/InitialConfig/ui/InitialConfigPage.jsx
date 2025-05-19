import './index.scss';
import { useEffect, useRef, useState } from 'react';
import { GetStartedWidget } from '../../../widgets/InitialConfig/GetStartedWidget';
import { useGSAP } from '@gsap/react';
import gsap, { Quint } from 'gsap';
import { SelectSpecification } from '../../../widgets/InitialConfig/SelectSpecification';
import { useNavigate } from 'react-router-dom';
import { ProfessionsList } from '../../../widgets/InitialConfig/ProfessionsList';
import { resetCv} from '../../../entities/cv/model/cvSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateCvMutation, useGetCvListQuery } from '../../../entities/cv';

const InitialConfigPage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const navigate = useNavigate();
  const onClickBurger = () => {
    setPopupOpen(!isPopupOpen);
  };  
  const [createCv] = useCreateCvMutation();
  const { data: cvList } = useGetCvListQuery();
// const cvList = useSelector((state) => state.cv.cvList);
  const sliderRef = useRef(null);
  const mainContent = useRef();
  const progressBar = useRef();
  const { contextSafe } = useGSAP();
  const [selectedSpec, selectElementSpec] = useState({});
const dispatch = useDispatch();
  const onClickBack = contextSafe(() => {
    let movingDist = 0;
    if (progressBarValue === 66) {
      movingDist = -mainContent.current?.getBoundingClientRect().width;
    } else if (progressBarValue === 99) {
      movingDist = -mainContent.current?.getBoundingClientRect().width;
    }
    gsap.to(sliderRef.current, {
      x: movingDist,
      ease: Quint.easeIn,
    });
    if (progressBarValue > 0) {
      setProgressBarValue((prev) => prev - 33);
    }
  });

  const onClickStart = contextSafe(() => {
    let movingDist = -mainContent.current?.getBoundingClientRect().width;
    if (progressBarValue === 33) {
      movingDist = -mainContent.current?.getBoundingClientRect().width * 2;
    } else if (progressBarValue === 66) {
      movingDist = -mainContent.current?.getBoundingClientRect().width * 2;
      // movingDist = -mainContent.current?.getBoundingClientRect().width * 3;
    }
    gsap.to(sliderRef.current, {
      x: movingDist,
      ease: Quint.easeIn,
    });
    setProgressBarValue((prev) => prev + 33);
  });

  const onFinishInit = async(cv) => {
        
      dispatch(resetCv());

    onClickStart();

 const userId = JSON.parse(localStorage.getItem('user'))?.id;
 try {
      const response = await createCv({
        userId,
        title: 'Новое резюме',
        content: '',
      }).unwrap();

      const newCvId = response.id;
      navigate(`/constructor/${newCvId}`);
    } catch (error) {
      console.error('Ошибка при создании резюме:', error);
    }

  };

  useEffect(() => {
    gsap.to(progressBar.current, { value: progressBarValue, ease: Quint.easeIn });
  }, [progressBarValue]);

  return (
    <div className="initial_config_wrapper">
      <progress
        className={'initial_config_wrapper__progress'}
        max="99"
        value="0"
        ref={progressBar}
      ></progress>

      <main className="initial_config_wrapper__content" ref={mainContent}>
        <div className="initial_config_wrapper__content__slider">
          <div className="initial_config_wrapper__content__slider__wrap" ref={sliderRef}>
            <div className={'initial_config_wrapper__content__slider__item'}>
              <GetStartedWidget onClickStart={onClickStart} />
            </div>
            <div className={'initial_config_wrapper__content__slider__item'}>
              <SelectSpecification
                onClickStart={onClickStart}
                selectElementSpec={selectElementSpec}
              />
            </div>
            <div className={'initial_config_wrapper__content__slider__item'}>
              <ProfessionsList onFinishInit={onFinishInit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InitialConfigPage;
