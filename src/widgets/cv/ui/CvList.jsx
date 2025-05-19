import './index.scss';
import { Link } from 'react-router-dom';
import { CvCard } from '../../../entities/cv/index.js';

const CvList = ({ list = [] }) => {
  return (
    <div className="cvs_list">
      {list.map((cv) => (
        <Link
          to={`/constructor/${cv.id}`}
          key={cv.id}
          style={{ textDecoration: 'none', width: 'fit-content' }}
        >
          <CvCard name={cv.title} imageSrc={`/assets/cvs_styles/${cv.style}.svg`} />
        </Link>
      ))}
    </div>
  );
};

export default CvList;
