import './salary.scss';
// import {Icon} from  "antd";

import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Spin } from 'antd';

const AiSalaryHelp = ({ open, onClose, salary, comment, isLoading }) => {
  return (
    <div className={'ai_salary_side ' + (open ? 'ai_salary_side--open' : '')}>
      <VerticalAlignBottomOutlined onClick={onClose} style={{ position: 'absolute', right: 10, top: 10 }} />
      {isLoading && <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} />}
      <div className="ai_salary_side__body">
        {!isLoading && (
          <>
            <div className={'ai_salary_side__body__item'}>
              <b>Предлагаемая ЗП:</b> <span>{salary}</span>
            </div>
            <div className={'ai_salary_side__body__item'}>
              <b>Комментарий к ЗП:</b>
              <span>{comment}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AiSalaryHelp;
