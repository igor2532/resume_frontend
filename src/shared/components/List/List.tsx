import { ReactNode } from 'react';
import { v4 as generateUUID } from 'uuid';
import './index.scss';

type TOptionList = {
  name: string;
  description?: string;
  action?: ReactNode[];
};

type TListProps = {
  options?: TOptionList[];
};

const Item = (item: TOptionList) => {
  return (
    <li className="uiXeny-list-item">
      <div className="item-body">
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
      </div>
      <div className="item-actions">{item.action}</div>
    </li>
  );
};

const List = (props: TListProps) => {
  const itemsToRender = props.options?.map((item) => (
    <Item
      name={item.name}
      description={item.description}
      action={item.action}
      key={generateUUID()}
    />
  ));

  return (
    <div className={'uiXeny-list'}>
      <ul className="list-items">{itemsToRender}</ul>
    </div>
  );
};

export default List;
