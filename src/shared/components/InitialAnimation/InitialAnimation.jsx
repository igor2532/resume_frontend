import { useAnimate, useInView } from 'framer-motion';
import './index.scss';
import { logo } from './logo.jsx';
import { useEffect, useRef, useState } from 'react';
import {
  useCreateInstitutMutation,
  useCreateJobMutation,
  useCreateProjectMutation,
  useGetSoftsQuery,
} from '../../../entities/cv/index.js';

export const InitialAnimation = () => {
  const isInitialAnimationEverPlayed = localStorage.getItem('is_animation_ever_played');
  if (isInitialAnimationEverPlayed) {
    return <></>;
  }

  localStorage.setItem('is_animation_ever_played', 'da');

  // после окончания последней анимации будет удаляться компонент
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isInitialAnimationOpen, setInitialAnimationOpen] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [logoRef, animateLogo] = useAnimate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [backlogRef, animateBacklog] = useAnimate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [urPersonalRef, animateUrPersonal] = useAnimate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isInViewUrPersonalRef = useInView(urPersonalRef);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  console.log(
    useUpdateCvMutation,
    useDeleteCvMutation,
    useCreateHardMutation,
    useGetHardsQuery,
    useCreateSoftMutation,
    useGetSoftsQuery,
    useCreateProjectMutation,
    useCreateInstitutMutation,
    useCreateJobMutation,
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // console.log(isInViewUrPersonalRef);

  if (isInViewUrPersonalRef) {
    animateUrPersonal(urPersonalRef.current, { opacity: [0, 1, 0] }, { duration: 8 });
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const backlogAnimationStep = useRef(1);

  const finishAnimateBacklog = () => {
    animateBacklog(backlogRef.current, { opacity: [1, 0] }, { duration: 2, ease: 'easeIn' });
    animateBacklog(0, 1, {
      onComplete: () => {
        setInitialAnimationOpen(false);
      },
      duration: 2,
      ease: 'easeIn',
    });
  };

  const startAnimateBacklog = () => {
    animateBacklog(
      backlogRef.current,
      { y: -windowHeight * backlogAnimationStep.current },
      { duration: 5, ease: 'easeInOut' },
    );
    animateLogo(0, windowHeight, {
      onUpdate: (latest) => {
        console.log(latest);
      },
      onComplete: () => {
        backlogAnimationStep.current += 1;

        if (backlogAnimationStep.current < 4) {
          startAnimateBacklog();
        }

        if (backlogAnimationStep.current === 4) {
          finishAnimateBacklog();
        }
      },
      duration: 5,
      ease: 'easeInOut',
    });
  };

  useEffect(() => {
    animateLogo(logoRef.current, { opacity: [0, 1, 1, 0.2], scale: [0.5, 6] }, { duration: 4 });
    animateLogo(0, 1, {
      onUpdate: (latest) => {
        if (latest >= 1) {
          startAnimateBacklog();
        }
      },
    });
  }, [animateLogo, logoRef]);

  return (
    <>
      {isInitialAnimationOpen && (
        <div className={'initial_animation'} ref={backlogRef}>
          <div className={'initial_animation__container'} ref={logoRef}>
            {logo}
          </div>
          <div className={'initial_animation__container'}>
            <span ref={urPersonalRef}>
              Ваш персональный помощник в <b>трудоустройстве</b>
            </span>
          </div>
          <div className={'initial_animation__container'}>
            <span>
              Создайте уникальный дизайн <b>своего</b> резюме
            </span>
          </div>
        </div>
      )}
    </>
  );
};
