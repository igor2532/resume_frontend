import { ArrowRightOutlined } from '@ant-design/icons';
import {Button} from  "antd";

export const GetStartedWidget = ({ onClickStart }) => {
  return (
    <div className={'first_page'}>
      <p>Приветственная страница</p>
      {/*<Link to={'specifications'}>*/}
      <Button buttonType={'primary'} onClick={onClickStart} sizeType={'large'}>
        <span>Начать</span>
        <ArrowRightOutlined />
      </Button>
      {/*</Link>*/}
    </div>
  );
};
