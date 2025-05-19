import './index.scss';

export const OtherProjectsMenu = ({ open = true }) => {
  return (
    <div className={'other_projects_menu' + (open ? '' : '--opened')}>
      <div className="other_projects_menu__wrapper"></div>
    </div>
  );
};
