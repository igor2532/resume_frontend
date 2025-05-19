import './styles/default.css';
import { useSelector } from 'react-redux';
import CanvasComponent from '../../../shared/components/CanvasImage/CanvasImage';
import { useGetMeQuery } from '../../../entities/user/index.js';
import { SocialIcon } from 'react-social-icons';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { formatDateCv } from '../../../shared/lib/formatDateCv';
import { useGetConditionsQuery } from '../../../entities/cv';

// Функция для безопасного парсинга строковых массивов
const safeParseArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const arr = JSON.parse(val);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }
  return [];
};

const Default = () => {
  const cv = useSelector((state) => state.cv.cv || {});
  const { data: user } = useGetMeQuery();
const { data: allConditions = [] } = useGetConditionsQuery();
const cvConditions = cv.conditions || []; 
const selectedConditions = allConditions.filter(cond =>
  cvConditions.includes(cond.id) || cvConditions.includes(String(cond.id))
);
  // Поддержка для разных форматов  
  
  const {
    post = '',
    salary = '',
    currency = '',
    about = '',
    title = '',
    main_color = '#2e1838d2',
  } = cv || {};

  // Преобразуем массивы
  const conditions = safeParseArray(cv.conditions) || [];
  const jobs = safeParseArray(cv.jobs) || [];
  const institutions = safeParseArray(cv.institutions) || [];
  const projects = safeParseArray(cv.projects) || [];
  const hard_skill = safeParseArray(cv.hard_skill) || [];
  const soft_skills = safeParseArray(cv.soft_skills) || [];

  return (
    <div className="cv-container" id="cv">
      <div className="header">
        <CanvasComponent
          width={200}
          path={'/tmp/ksenya.jpg'}
          height={200}
          style={{
            borderRadius: '100%',
            boxShadow: `5px 10px ${main_color}`,
          }}
        />
        <div className="header-text">
          <h1 style={{ color: main_color }}>{user?.full_name || ''}</h1>
          <p className="position">
            {title} x {salary?.toLocaleString ? salary.toLocaleString() : salary} {currency}
          </p>
          <div className="conditions">
  {selectedConditions.length > 0
    ? selectedConditions.map((condition, idx) => (
        <span
          key={condition.id}
          className="condition"
          style={{ backgroundColor: main_color }}
        >
          {condition.name}
        </span>
      ))
    : <span style={{ color: '#aaa' }}>нет условий</span>
  }
</div>
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <div className="section contact-info">
            <h2 style={{ color: main_color }}>/ Контакты</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MailOutlined style={{ marginRight: '10px' }} />
              <p>{user?.email || ''}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PhoneOutlined style={{ marginRight: '10px' }} />
              <p>{user?.phone || ''}</p>
            </div>
            {Array.isArray(user?.user_nets) &&
              user.user_nets.map((el) => (
                <div key={el.id || el.social_net} style={{ display: 'flex', alignItems: 'center', maxHeight: 28 }}>
                  <SocialIcon network={el.social_net} style={{ width: '20px', marginRight: '8px' }} />
                  <p>{el.link}</p>
                </div>
              ))}
          </div>
          <div className="section">
            <h2 style={{ color: main_color }}>/ Hard Skills</h2>
            <ul className="skills">
              {hard_skill.length > 0
                ? hard_skill.map((skill, idx) => <li key={skill.id || skill || idx}>{skill.name || skill}</li>)
                : <li style={{ color: '#aaa' }}>нет данных</li>
              }
            </ul>
          </div>
          <div className="section">
            <h2 style={{ color: main_color }}>/ Soft Skills</h2>
            <ul className="skills">
              {soft_skills.length > 0
                ? soft_skills.map((skill, idx) => <li key={skill.id || skill || idx}>{skill.name || skill}</li>)
                : <li style={{ color: '#aaa' }}>нет данных</li>
              }
            </ul>
          </div>
        </div>
        <div className="main-content">
          <div className="section">
            <h2 style={{ color: main_color }}>/ Образование</h2>
            {institutions.length > 0
              ? institutions.map((institution, idx) => (
                  <div key={institution.id || idx} className="education">
                    <p className="date">
                      {formatDateCv(institution.start, 'YYYY')} – {formatDateCv(institution.finish, 'YYYY')}
                    </p>
                    <div className="education_description">
                      <b>{institution.name}</b>
                      <p>{institution.speciality}</p>
                    </div>
                  </div>
                ))
              : <div style={{ color: '#aaa' }}>нет данных</div>
            }
          </div>
          <div className="section">
            <h2 style={{ color: main_color }}>/ Опыт работы</h2>
            {jobs.length > 0
              ? jobs.map((job, idx) => (
                  <div key={job.id || idx} className="job">
                    <p className="date">
                      {formatDateCv(job.start, 'YYYY-MM')} – {formatDateCv(job.finish, 'YYYY-MM')}
                    </p>
                    <div className="job_description">
                      <b>{job.name}</b>
                      <p>{job.commitment}</p>
                    </div>
                  </div>
                ))
              : <div style={{ color: '#aaa' }}>нет данных</div>
            }
          </div>
          <div className="section">
            <h2 style={{ color: main_color }}>/ Проекты</h2>
            {projects.length > 0
              ? projects.map((project, idx) => (
                  <div key={project.id || idx} className="project">
                    <div>
                      <b>{project.name}</b>
                      <p>{project.description}</p>
                    </div>
                    {project.link && <a href={project.link}>{project.link}</a>}
                  </div>
                ))
              : <div style={{ color: '#aaa' }}>нет данных</div>
            }
          </div>
          <div className="section">
            <h2 style={{ color: main_color }}>/ Обо мне</h2>
            <div className="about-text">
              {about
                ? about.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
                : <p style={{ color: '#aaa' }}>нет данных</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
