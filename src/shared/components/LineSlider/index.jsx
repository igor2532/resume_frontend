import './index.scss';
import React, { useState } from 'react';
import { Button, Progress } from 'antd';

const LineSlider = ({ children, isInfinityScroll = false }) => {
  const sliderRef = React.useRef(null);
  const [sliderSlide, setSliderSlide] = useState(33);
  const sliderIteration = Math.floor(100 / children.length);
  const sliderProgress =
    ((-sliderRef.current?.style.transform.slice(11, -2) + 100) / 100) * sliderIteration ||
    sliderIteration;
  const onClickRight = () => {
    const sliderPos = +sliderRef.current.style.transform.slice(11, -2);
    if (-sliderPos / 100 >= children.length - 1) {
      sliderRef.current.style.transform = `translateX(0%)`;
      setSliderSlide(99);
    } else {
      sliderRef.current.style.transform = `translateX(${sliderPos - 100}%)`;
      setSliderSlide(sliderSlide + 33);
    }
  };

  const onClickLeft = () => {
    const sliderPos = +sliderRef.current.style.transform.slice(11, -2);
    if (sliderPos === 0) {
      sliderRef.current.style.transform = `translateX(${-(children.length - 1) * 100}%)`;
      setSliderSlide(sliderSlide - 1);
    } else {
      sliderRef.current.style.transform = `translateX(${sliderPos + 100}%)`;
      setSliderSlide(sliderSlide - 33);
    }
  };

  const sliderItems = children.map((el) => {
    return React.createElement('div', { className: 'specification__container', key: el.key }, el);
  });

  return (
    <div className={'specification_slider_wrapper'}>
      <div className="specification_slider_wrapper__content">
        <div className="specification_slider_wrapper__content__slider" ref={sliderRef}>
          {sliderItems}
        </div>
      </div>
      <div className="specification_slider_wrapper__actions">
        <Button
          type={'link'}
          onClick={onClickLeft}
          className={'specification_slider_wrapper__actions__button'}
          disabled={sliderProgress === sliderIteration}
        >
          НАЗАД
        </Button>
        <Progress steps={children.length} showInfo={false} percent={sliderProgress} />
        <Button
          type={'link'}
          onClick={onClickRight}
          className={'specification_slider_wrapper__actions__button'}
          disabled={sliderProgress === sliderIteration * children.length}
        >
          ПРОДОЛЖИТЬ
        </Button>
      </div>
    </div>
  );
};

export default LineSlider;
