import './index.scss';
import { Button } from 'antd';
import { ArrowLeftOutlined, LogoutOutlined } from '@ant-design/icons';
import logo from '../../../../public/assets/cvLogo.svg';
import { motion, useAnimate } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '/src/entities/user/index.js';
import { useDispatch } from 'react-redux';
import { baseApi } from '../../../app/base.api.js';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [burger1Ref, animBurger1] = useAnimate();
  const [burger2Ref, animBurger2] = useAnimate();
  const [burger3Ref, animBurger3] = useAnimate();
  const [backlogRef, animBacklog] = useAnimate();
  const [logout] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    await logout();
    onClickBurger();
    navigate('/auth');
    dispatch(baseApi.util.resetApiState());
  };

  const animateBackLog = () => {
    const borderRadius = !isMenuOpen
      ? ['0% 0% 0% 100%', '0% 0% 0% 0%']
      : ['0% 0% 0% 0%', '0% 0% 0% 100%'];
    const height = !isMenuOpen ? ['0dvh', '100dvh'] : ['100dvh', '0dvh'];
    const width = !isMenuOpen ? ['0vw', '100vw'] : ['100vw', '0vw'];
    const opacity = isMenuOpen ? [1, 0] : [0, 1];

    animBacklog(
      backlogRef.current,
      {
        height,
        width,
        opacity,
        originX: 0,
        originY: 0,
        borderRadius,
      },
      { duration: 0.2, ease: 'easeIn' },
    );
  };

  const animateOpenBurger = () => {
    const rotateZTop = !isMenuOpen ? [0, 45] : [45, 0];
    const rotateZBottom = !isMenuOpen ? [0, -45] : [-45, 0];
    const opacityMiddle = !isMenuOpen ? [1, 0] : [0, 1];
    const backgroundColor = isMenuOpen ? ['white', 'black'] : ['black', 'white'];

    animBurger1(
      burger1Ref.current,
      { rotateZ: rotateZTop, originX: 'left', backgroundColor },
      { duration: 0.2, ease: 'easeOut' },
    );
    animBurger3(
      burger3Ref.current,
      { rotateZ: rotateZBottom, originX: 'left', backgroundColor },
      { duration: 0.2, ease: 'easeOut' },
    );
    animBurger2(burger2Ref.current, { opacity: opacityMiddle }, { duration: 0.2, ease: 'easeOut' });

    animateBackLog();
  };

  const onClickBurger = () => {
    animateOpenBurger();
    setMenuOpen(!isMenuOpen);
  };

  const onKeyDownBurger = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClickBurger();
    }
  };

  const linkItemsRender = [
    {
      href: '/cvs',
      label: 'Мои резюме',
    },
    {
      href: '/init-constructor',
      label: 'Новое резюме',
    },
    {
      href: '/auth',
      label: 'Авторизация',
    },
    {
      href: '/register',
      label: 'Регистрация',
    },
  ];

  const menuBacklog = (
    <div
      className="menu_backlog"
      ref={backlogRef}
      style={{ pointerEvents: !isMenuOpen ? 'none' : 'inherit' }}
    >
      <h2>Menu</h2>
      <ul>
        {linkItemsRender.map((item) => (
          <motion.div
            className={'menu_backlog__item'}
            whileHover={{ color: '#93e2ff' }}
            whileTap={{ color: '#93e2ff', scale: 0.9 }}
            key={item.href}
            onClick={() => {
              onClickBurger();
            }}
          >
            <Link className={'menu_backlog__item__link'} to={item.href}>
              {item.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          className={'menu_backlog__item'}
          whileHover={{ color: '#93e2ff' }}
          whileTap={{ color: '#93e2ff', scale: 0.9 }}
          onClick={onClickLogout}
        >
          <LogoutOutlined /> Выйти
        </motion.div>
      </ul>
    </div>
  );

  const burgerAnima = (
    <>
      <div
        aria-label="Открыть меню"
        className="burger_wrapper"
        role="button"
        onKeyDown={onKeyDownBurger}
        tabIndex={0}
        onClick={onClickBurger}
      >
        <div className="burger_wrapper__item" ref={burger1Ref} />
        <div className="burger_wrapper__item" ref={burger2Ref} />
        <div className="burger_wrapper__item" ref={burger3Ref} />
      </div>
      {menuBacklog}
    </>
  );

  return (
    <div className="main_header">
      {burgerAnima}
      <Button icon={<ArrowLeftOutlined />} size={'large'} type={'link'} />
      <div className="main_header__logo_container">
        <img src={logo} alt="cv-constructor" />
      </div>
    </div>
  );
};

export default Header;
