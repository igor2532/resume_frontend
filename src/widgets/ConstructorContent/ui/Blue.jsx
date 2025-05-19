import { useEffect, useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { useGetMeQuery } from '../../../entities/user/index.js';
import { SocialIcon } from 'react-social-icons';
import {
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CanvasImage from '../../../shared/components/CanvasImage/CanvasImage';

const BlueContent = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const [scaleIndex, setScaleIndex] = useState(null);
  const [styles, setStyles] = useState({});
  const { cv_id } = useParams();
  const { data: user } = useGetMeQuery();
  // const { data: cv } = useGetCvByIdQuery(+cv_id, { skip: !cv_id });
  const cv = useSelector((state) => state.cv.cv);

  useEffect(() => {
    const loadStyles = async () => {
      setStyles(await import(`./styles/default.module.css`));
    };
    loadStyles();
  }, [cv?.style]);

  useEffect(() => {
    const handleResize = () => {
      setScaleIndex(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // TODO домножение на 2 при большом колличестве контента?
    // setScaleIndex(targetRef.current?.offsetWidth * Math.sqrt(2) * 1.999);
    // setScaleIndex(targetRef.current?.offsetWidth * Math.sqrt(2));
  }, [targetRef]);

  return (
    <div ref={targetRef} className={styles.cv_container} id={'cv'}>
      {/*<div className={styles.donne2}></div>*/}

      <div className={styles.cv_side_info} style={{ backgroundColor: cv?.main_color }}>
        <CanvasImage
          path={'/tmp/Photo_on_Resume.png'}
          width={200}
          height={200}
          style={{ borderRadius: '100%' }}
        />
        <div className={styles.cv_main}>
          <div className={styles.cv_side}>
            <div className={styles.cv_contacts}>
              <h3>Контакты:</h3>{' '}
              <span>
                <MailOutlined style={{ marginRight: '10px' }} />
                {user?.email}
              </span>
              <span>
                <PhoneOutlined style={{ marginRight: '10px' }} />
                {user?.phone}
              </span>
              <div>
                {user?.user_nets.map((el) => {
                  return (
                    <div style={{ maxHeight: '30px' }} key={el.social_net}>
                      <SocialIcon
                        network={el.social_net}
                        style={{ width: '20px', marginRight: '8px' }}
                      />
                      {el.link}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.cv_hards}>
              Hard Skills:{' '}
              {cv?.hard_skill?.map((el) => (
                <div className={styles.cv_hard} key={el.id}>
                  {el.name}
                </div>
              ))}
            </div>
            <div className={styles.cv_hards}>
              Soft Skills:{' '}
              {cv?.soft_skills?.map((el) => (
                <div className={styles.cv_hard} key={el.id}>
                  {el.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cv_main_info}>
        <div className={styles.cv_head_data}>
          <div className={styles.cv_fio}>{user?.full_name}</div>
          <div className={styles.cv_post}>
            Должность: <i>{cv?.post}</i>
          </div>
          <div className={styles.cv_salary}>
            Ожидаемая ЗП: <i>{cv?.salary + cv?.currency}</i>
          </div>
          <div className={styles.cv_conditions}>
            Условия:{' '}
            {cv.conditions?.map((el) => (
              <div
                className={styles.cv_conditions__item}
                key={el.id}
                style={{ backgroundColor: cv?.main_color }}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cv_jobs}>
          <b>
            <IdcardOutlined /> Места работы:
          </b>
          {cv.jobs?.map((el) => (
            <div
              className={styles.cv_jobs__item}
              key={el.id}
              style={{ backgroundColor: cv?.main_color }}
            >
              <div className={styles.cv_jobs__item__meta}>
                <b>{el.name}</b>
                <div className="cv_jobs__item">
                  {el.start} <br />
                  {el.finish}
                </div>
              </div>
              <div className={styles.cv_jobs__item__descr}>{el.commitment}</div>
            </div>
          ))}
        </div>
        <div className={styles.cv_jobs}>
          <b>
            <ReadOutlined /> Образование:
          </b>
          {cv.institutions?.map((el) => (
            <div
              className={styles.cv_jobs__item}
              key={el.id}
              style={{ backgroundColor: cv?.main_color }}
            >
              <div className={styles.cv_jobs__item__meta}>
                <p style={{ fontWeight: 'bold' }}>{el.name}</p>
                {el.start} – {el.finish}
              </div>
              <div className={styles.cv_jobs__item__descr}>{el.speciality}</div>
            </div>
          ))}
        </div>
        <div className={styles.cv_jobs}>
          <b>
            <ReadOutlined /> Проекты:
          </b>
          {cv.projects?.map((el) => (
            <div
              className={styles.cv_jobs__item}
              key={el.id}
              style={{ backgroundColor: cv?.main_color }}
            >
              <div className={styles.cv_jobs__item__meta}>
                <p style={{ fontWeight: 'bold' }}>{el.name}</p>
              </div>
              <div className={styles.cv_jobs__item__descr}>{el.description}</div>
            </div>
          ))}
        </div>
        {cv?.about && (
          <div className={styles.cv_about}>
            <b>
              <UserOutlined style={{ marginRight: '10px' }} />О себе:
            </b>
            <p>{cv?.about}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlueContent;
