import { ColorPicker, Divider, notification } from 'antd';
import generatePDF from 'react-to-pdf';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddConditionsMutation,
  useAddHardsMutation,
  useAddSoftMutation,
  useGetConditionsQuery,
  useGetHardsQuery,
  useGetSoftsQuery,
  useMakeAIMarkMutation,
  useMakeAISalaryMutation,
  useUpdateCvMutation,
  useCreateCvMutation,
} from '../../../entities/cv/index.js';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Select} from "antd";
import {Input} from "antd";
import { Button } from "antd";
const { TextArea } = Input;
import {
  ArrowLeftOutlined,
  FormatPainterFilled,
  SaveOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { CreateJobModal } from '/src/features/job/CreateJobModal';
import {
  setContent,
  setCurrency,
  setMainColor,
  setPostName,
  setSalary,
  resetCv,
  setCv,
  setConditions
} from '../../../entities/cv/model/cvSlice.js';
import JobsList from '../../../widgets/job/ui/JobsList.jsx';
import { CreateInstitutModal } from '../../institut/CreateInstitutModal/index.js';
import { InstitutList } from '../../../widgets/institut/index.js';
import { ProjectsList } from '../../../widgets/projects/index.js';
import CreateProjectModal from '../../project/ui/CreateProjectModal.jsx';
import logo from '../../../../public/assets/cvLogo.svg';
import { SelectThemeModal } from '../../cvTheme/index.js';
import AiSalaryHelp from '../../../widgets/ai/ui/AiSalaryHelp.jsx';

const ConstructorSideBar = () => {
  // const post = useSelector((state) => state.cv.post);
  const { cv_id } = useParams();
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.cv.cv);
  const [makeAiSalary, aiSalaryState] = useMakeAISalaryMutation();
  const [makeAiMark, aiMarkState] = useMakeAIMarkMutation();
  const [saveCv] = useUpdateCvMutation();
  const [createCv] = useCreateCvMutation();
  const [addSoftSkill] = useAddSoftMutation();
  const [addConditions] = useAddConditionsMutation();
  const [addHards] = useAddHardsMutation();
  const { data: hardSkills } = useGetHardsQuery();
  const { data: softSkills } = useGetSoftsQuery();
const { data: conditions } = useGetConditionsQuery();


  const navigate = useNavigate();
const { profession_id } = useParams();
  const currencyOptions = [
    { label: '$', value: '$' },
    { label: '₽', value: '₽' },
    { label: '€', value: '€' },
    { label: '₸', value: '₸' },
  ];
useEffect(() => {
  
  if (cv?.title) {
    setTitle(cv.title);
  }
  else {}
}, [cv?.title]);

// Безопасно определяем выбранные значения

//Test
let conditionsArr = [];
if (typeof cv?.conditions === 'string') {
  try {
    conditionsArr = JSON.parse(cv.conditions);
  } catch {
    conditionsArr = [];
  }
} else if (Array.isArray(cv?.conditions)) {
  conditionsArr = cv.conditions;
} else {
  conditionsArr = [];
}

// 2. Массив options для select
const conditionsOptions = (conditions || []).map(el => ({
  value: el.id,
  label: el.name,
}));

// 3. Формируем выбранные
const selectedConditions = conditionsOptions.filter(option =>
  conditionsArr.includes(option.value)
);

//end test

  const softSkillsOptions = !softSkills
    ? []
    : softSkills.map((el) => ({ value: el.id, label: el.name }));

  const hardSkillsOptions = !hardSkills
    ? []
    : hardSkills.map((el) => ({ value: el.id, label: el.name }));

  const aiSalary = aiSalaryState.data ? JSON.parse(aiSalaryState.data?.response) : '';
  const aiMark = aiMarkState.data ? JSON.parse(aiMarkState.data?.response) : '';

  const [api, contextHolder] = notification.useNotification();
  const openErrorNotify = (error) => {
    api.error({
      message: error,
      description: aiMarkState.error?.data.error || aiSalaryState.error?.data.error,
    });
  };

  const openSuccessNotify = (message) => {
    api.success({
      message: message,
      description: aiMarkState.error?.data.error || aiSalaryState.error?.data.error,
    });
  };

  const [isModalAddJobOpen, setIsModalAddJobOpen] = useState(false);
  const [isModalAddEduOpen, setIsModalAddEduOpen] = useState(false);
  const [isModalAddProject, setIsModalAddProjectOpen] = useState(false);
  const [isModalStyles, setIsModalStylesOpen] = useState(false);
  const [isAiSalaryOpen, setAiSalaryOpen] = useState(false);

  const onAddSoft = async (softId) => {
    try {
      await addSoftSkill({ skills: softId, cv_id });
      openSuccessNotify('Изменено');
    } catch (e) {
      openErrorNotify('Ошибка');
    }
  };

  const onAddCondition = async (conditionId) => {
    try {
      await addConditions({ conditions: conditionId, cv_id });
      openSuccessNotify('Изменено');
    } catch (e) {
      openErrorNotify('Ошибка');
    }
  };

  const onAddHards = async (hardsId) => {
    try {
      await addHards({ hard_skills: hardsId, cv_id });
      openSuccessNotify('Изменено');
    } catch (e) {
      openErrorNotify('Ошибка');
    }
  };

  useEffect(() => {
    if (aiMarkState.error?.data.error) {
      openErrorNotify('Ошибка');
    }
    if (aiSalaryState.error?.data.error) {
      openErrorNotify('Ошибка');
    }
  }, [aiMarkState.error?.data, aiSalaryState.error?.data]);

  const getTargetElement = () => document.getElementById('cv');

  const onClickUpdateCv = async () => {
    try {
      //  if (cv_id) {
      // saveCv({ cv_id, body: cv }).unwrap();
      // openSuccessNotify('Сохранено');
      //  }
      //  else 
      //  {
      //   const newCv = await createCv(cv).unwrap();
      //    //setCvId(newCv.id);
      //  }
if (!cv.title) {
    openErrorNotify('Введите название резюме!');
    return;
  }
 
    if (!cv.id ) {
    
      createCv({}).unwrap().then((res) => {
        setCvId(res.id); // ← сохраняем id созданного резюме
      });
    }
    else {
      // const res = await saveCv({ cv_id, body: { ...cv, title: cv.post, conditions: JSON.stringify(cv.conditions) } }).unwrap();
      const res = await saveCv({ cv_id, body: {...cv, title: cv.post} })
dispatch(setCv(res));  
      openSuccessNotify('Сохранено');
    }
 



      
    } catch (e) {
      openErrorNotify('Ошибка');
    }
  };
  const generateWithOptions = () => generatePDF(getTargetElement, { page: {} });
  return (
    <div  style={{maxWidth:800, margin:'0 auto'}}   className="constructor_page__side">
      {contextHolder}
      <div className="constructor_page__side__controls">
        <Button
          buttonType={'link'}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftOutlined />
        </Button>
        <img src={logo} alt="cv-constructor" />

        <Button onClick={onClickUpdateCv}>
          <SaveOutlined />
        </Button>
      </div>
      <div style={{maxWidth:800, margin:'0 auto'}} className="constructor_page__side__editor">
        <Divider>Редактор резюме</Divider>
        <Button
          onClick={onClickUpdateCv}
          style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1 }}
          buttonType={'primary'}
        >
          <SaveOutlined />
        </Button>

        <Button
          buttonType={'primary'}
          onClick={generateWithOptions}
          style={{ position: 'fixed', bottom: '85px', right: '30px', zIndex: 1 }}
        >
          <VerticalAlignBottomOutlined />
        </Button>
        <div>
          <label>Название должности:</label>
         <Input
  style={{ height: 50 }}
  value={title}
  onChange={(e) => {
    setTitle(e.target.value);
    dispatch(setPostName(e.target.value));
  }}
/>
        </div>

        <Divider></Divider>

        <div>
          <label>Ожидаемая зарплата:</label>
          <div>
            <Input
              type="number"
              style={{ height: 50 }}
              value={cv?.salary}
              onChange={(data) => {
                dispatch(setSalary(data.target.value));
              }}
            ></Input>

            <Select
              options={currencyOptions}
              defaultValue={{ value: cv?.currency, label: cv?.currency }}
              sizeType={'small'}
              onChange={(currency) => {
                dispatch(setCurrency(currency));
              }}
            />
          </div>
        </div>

        <Divider></Divider>

        <div>
          <label>Условия:</label>
          {/* <Select
            multipleSelect
            defaultValue={cv?.conditions?.map((el) => ({ value: el.id, label: el.name }))}
            placeholder="Выберите один или несколько вариантов"
            options={conditionsOptions}
            onChange={onAddCondition}
          ></Select> */}
<Select
  mode="multiple"
  placeholder="Выберите один или несколько вариантов"
  value={selectedConditions.map(opt => opt.value)}
  options={conditionsOptions}
  onChange={(selected) => {
    // selected — это массив id
    dispatch(setConditions(selected));
  }}
/>

        </div>

        <Divider></Divider>

        <div>
          <label>Гибкие навыки (soft skills):</label>
          <Select
            multipleSelect
            placeholder="Выберите один или несколько вариантов"
            options={softSkillsOptions}
            defaultValue={cv?.soft_skills?.map((el) => ({ value: el.id, label: el.name }))}
            onChange={onAddSoft}
          ></Select>
        </div>

        <Divider></Divider>

        <div>
          <label>Профессиональные навыки (hard skills):</label>
          <Select
            multipleSelect
            placeholder="Выберите один или несколько вариантов"
            defaultValue={cv?.hard_skill?.map((el) => ({ value: el.id, label: el.name }))}
            options={hardSkillsOptions}
            onChange={onAddHards}
          ></Select>
        </div>

        <Divider></Divider>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <b>Опыт работы:</b>
            <Button
              onClick={() => {
                setIsModalAddJobOpen(true);
              }}
              style={{ fontSize: 'x-large' }}
              buttonType="primary"
            >
              +
            </Button>
          </div>
          <JobsList />
        </div>

        <Divider></Divider>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <b>Образование:</b>
            <Button
              onClick={() => {
                setIsModalAddEduOpen(true);
              }}
              style={{ fontSize: 'x-large' }}
              buttonType="primary"
            >
              +
            </Button>
          </div>
          <InstitutList />
        </div>
        <Divider></Divider>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <b>Проекты:</b>

            <Button
              onClick={() => {
                setIsModalAddProjectOpen(true);
              }}
              style={{ fontSize: 'x-large' }}
              buttonType="primary"
            >
              +
            </Button>
          </div>
          <ProjectsList />
        </div>
        <Divider></Divider>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <b>О себе:</b>
          </div>
<TextArea
  style={{ height: '200px' }}
  placeholder="Добавьте информацию о себе"
  value={cv?.content || ""}
  onChange={(data) => {
    dispatch(setContent(data.target.value));
  }}
/>

        </div>
        <Divider></Divider>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <b>Стилизация:</b>
            <Button
              onClick={() => {
                setIsModalStylesOpen(true);
              }}
              style={{ fontSize: 'x-large' }}
              buttonType="primary"
            >
              <FormatPainterFilled />
            </Button>
          </div>
          <ColorPicker
            defaultValue={cv?.main_color}
            onChange={(value, hex) => {
              dispatch(setMainColor(hex));
            }}
            showText={(color) => <span>Основной цвет стиля: ({color.toHexString()})</span>}
          />
        </div>

        <Divider>Платные услуги ИИ</Divider>
        <div className="constructor_page__side__services_buttons">
          <Button
            loading={aiSalaryState.isLoading}
            onClick={() => {
              setAiSalaryOpen(true);
              makeAiSalary(cv);
            }}
            buttonType={'primary'}
          >
            Оценить ЗП
          </Button>
          <Button
            loading={aiMarkState.isLoading}
            onClick={() => makeAiMark(cv)}
            buttonType={'primary'}
          >
            Оценить грамотность
          </Button>
        </div>
        {/*<Divider>Оценка AI</Divider>*/}

        {/*<div style={{ margin: '20px 5px', color: '#000000' }}>*/}
        {/*  <div>*/}
        {/*    {' '}*/}
        {/*    <p>Предлагаемая ЗП:</p> {aiSalary?.salary}*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <p>Комментарий к ЗП:</p> {aiSalary?.comment}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div style={{ margin: '20px 5px', color: '#000000' }}>*/}
        {/*  <div>*/}
        {/*    <p>Комментарий к резюме:</p> {aiMark?.comment}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div style={{ margin: '20px 5px', color: '#000000' }}>*/}
        {/*  <div>*/}
        {/*    <p>Оценка грамотности:</p> {aiMark?.mark_gramatic}*/}
        {/*  </div>*/}

        {/*  <div>*/}
        {/*    <p>Общая оценка:</p> {aiMark?.mark_eternal}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <CreateJobModal
        onClose={() => setIsModalAddJobOpen(false)}
        open={isModalAddJobOpen}
        onOk={() => setIsModalAddJobOpen(false)}
      />
      <CreateInstitutModal
        onOk={() => {
          setIsModalAddEduOpen(false);
        }}
        open={isModalAddEduOpen}
        onClose={() => setIsModalAddEduOpen(false)}
      />
      <CreateProjectModal
        open={isModalAddProject}
        onClose={() => {
          setIsModalAddProjectOpen(false);
        }}
        onOk={() => {
          setIsModalAddProjectOpen(false);
        }}
      />
      <SelectThemeModal
        open={isModalStyles}
        onClose={() => {
          setIsModalStylesOpen(false);
        }}
        onOk={() => {
          setIsModalStylesOpen(false);
        }}
      />
      <AiSalaryHelp
        open={isAiSalaryOpen}
        onClose={() => {
          setAiSalaryOpen(false);
        }}
        salary={aiSalary?.salary}
        comment={aiSalary?.comment}
        isLoading={aiSalaryState.isLoading}
      />
    </div>
  );
};

export default ConstructorSideBar;
