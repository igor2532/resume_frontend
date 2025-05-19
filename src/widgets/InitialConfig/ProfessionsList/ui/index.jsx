import './index.scss';
import {
  useGetProfessionsQuery,
  useLazyProfessionsCounterQuery,
} from '../../../../entities/specification/index.js';
import { useEffect, useState } from 'react';
import { Divider, Grid, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setPostName } from '../../../../entities/cv/model/cvSlice.js';
import {Button} from  "antd";

export const ProfessionsList = ({ onFinishInit,cv }) => {
  const [selectedParam, setSelectedParam] = useState();
  const [searchedValue, setSearchedValue] = useState('');
  const [updateCounter, updateCounterState] = useLazyProfessionsCounterQuery();
  const [selectedProfession, setProfession] = useState(null);
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const dispatch = useDispatch();

  const breakPoints = Grid.useBreakpoint();

  useEffect(() => {
    setSelectedParam(window.location.search?.split('=')?.[1]);
  }, [window.location.search]);

  const { data } = useGetProfessionsQuery(selectedParam, {
    skip: !selectedParam,
  });

  const onClickProfession = async (el) => {
    setProfession(el);
  };

  const onChangeSearched = (e) => {
    setSearchedValue(e.target.value);
  };

  const filteredList = data?.filter((el) =>
    el.name.trim().toLowerCase().includes(searchedValue.trim().toLowerCase()),
  );

const onClickContinue = async () => {
  try {
    if (selectedProfession?.id) {
      dispatch(setPostName(selectedProfession.name));
    } else if (searchedValue.trim()) {
      dispatch(setPostName(searchedValue.trim()));
    } else {
      return; // Ничего не выбрано и не введено — выходим
    }

    setBtnDisabled(true);
    onFinishInit(selectedProfession);

    if (selectedProfession?.id) {
      await updateCounter({ spec: selectedParam, id_prof: selectedProfession.id }).unwrap();
    }
  } catch (error) {
    console.error('Ошибка при продолжении:', error);
  }
};


  return (
    <div className={'professions_list'}>
      <h2>Выберите название профессии:</h2>
      <div className="professions_list__items_wrapper">
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            placeholder={'Найдите или введите профессию...'}
            size={'large'}
            value={searchedValue}
            onChange={onChangeSearched}
          />
          <Button
            // disabled={isBtnDisabled}
            style={{ height: '100%', width: 'fit-content', padding: '0 12px' }}
            icon={<ArrowRightOutlined />}
            buttonType={'primary'}
            onClick={onClickContinue}
            sizeType={'large'}
          >
            {breakPoints.xs ? '' : 'продолжить'}
          </Button>
        </div>
        <Divider />
        <div className="professions_list__items_wrapper__list">
          {filteredList?.map((el) => (
            <div
              className={
                'professions_list__items_wrapper__list__item' +
                (selectedProfession?.id === el.id
                  ? ' professions_list__items_wrapper__list__item--selected'
                  : '')
              }
              key={el.id}
            >
              {el.name} <Button onClick={() => onClickProfession(el)}>Выбрать</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
