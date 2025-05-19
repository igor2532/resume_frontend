import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

const CvContentPage = lazy(() => import('../../../widgets/ConstructorContent/index.js'));
const CvDefaultCVPage = lazy(() => import('../../../widgets/ConstructorContent/ui/Default.jsx'));
const CvBluePage = lazy(() => import('../../../widgets/ConstructorContent/ui/Blue.jsx'));

const CvContentHOC = () => {
  const cv = useSelector((state) => state.cv.cv);
  console.log('CvContentHOC cv:', cv); // добавь лог
  const safeParseArray = (val) => {
  if (Array.isArray(val)) return val;
  try {
    if (typeof val === 'string') {
      // Если строка в кавычках (например, '"[1,2]"'), убираем кавычки
      let s = val;
      if (val.startsWith('"') && val.endsWith('"')) {
        s = val.slice(1, -1);
      }
      return JSON.parse(s);
    }
  } catch (e) {
    return [];
  }
  return [];
};
const conditionsArr = safeParseArray(cv.conditions);
  let cvStyleToRender = null;

  switch (cv?.style) {
    case 'industrial': {
      cvStyleToRender = <CvContentPage />;
      break;
    }
    case 'default': {
      cvStyleToRender = <CvDefaultCVPage />;
      break;
    }
    // case 'pastel': {
    //   cvStyleToRender = <CvBluePage />;
    //   break;
    // }
  }
  return (
    <div>
      <Suspense fallback={<div>Загрузка...</div>}><CvContentPage /></Suspense>
    </div>
  );
};

export default CvContentHOC;
