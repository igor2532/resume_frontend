import { createBrowserRouter, redirect } from 'react-router-dom';
import { InitialConfigPage } from '../pages';
import { ConstructorPage } from '../pages/ConstructorPage';
import { CvListPage } from '../pages/CvListPage';
import { AuthPage } from '../pages/authPages/Auth';
import { userApi } from '../entities/user';
import { store } from './store';
import { baseApi } from './base.api';
import Layout from '../shared/components/Layout/Layout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <span style={{ color: 'red' }}>Ошибка маршрута!</span>,
    children: [
      {
        index: true,
        loader: () => redirect('/cvs'),
      },
      {
        path: 'auth',
        element: <AuthPage />,
        loader: async () => {
          const request = store.dispatch(userApi.endpoints.getMe.initiate());
          try {
            const response = await request.unwrap();
            if (response?.id) return redirect('/cvs');
            return null;
          } catch {
            return null;
          } finally {
            request.unsubscribe();
          }
        },
      },
      {
        path: 'register',
        element: <div>Register</div>, // Заменишь позже на свою страницу регистрации
      },
      {
        path: 'init-constructor',
        element: <InitialConfigPage />,
        loader: async () => {
          try {
            const request = await store.dispatch(baseApi.endpoints.getMe.initiate()).unwrap();
            return request;
          } catch {
            return redirect('/auth');
          }
        },
      },
      {
        path: 'cvs',
        element: <CvListPage />,
        loader: async () => {
          try {
            const request = await store.dispatch(baseApi.endpoints.getCvList.initiate()).unwrap();
            return request.length ? request : redirect('/init-constructor');
          } catch {
            return redirect('/auth');
          }
        },
      },
{
  path: 'constructor/:cv_id',
  element: <ConstructorPage />,
}
    ],
  },
]);

export default routes;
