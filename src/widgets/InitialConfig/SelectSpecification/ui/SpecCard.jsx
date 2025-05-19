import { InfoCircleOutlined } from '@ant-design/icons';

export const SpecCard = ({ avatar, title, onClick }) => {
  return (
    <div className={'specification_card_wrapper'} onClick={onClick}>
      {avatar}
      <div className="specification_card_wrapper__text">{title}</div>
      <InfoCircleOutlined className={'specification_card_wrapper__info'} />
    </div>
  );
};
