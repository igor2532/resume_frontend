import './index.scss';

export const CvCard = ({ name, imageSrc }) => {
  return (
    <div className={'cv_card_wrapper'}>
      <img src={imageSrc} alt="" className={'cv_card_wrapper__img'} />
      <div className="cv_card_wrapper__name">{name}</div>
    </div>
  );
};
