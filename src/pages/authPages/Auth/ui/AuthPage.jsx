import './index.scss';
import { AuthForm } from '/src/features/user';

const AuthPage = () => {
  return (
    <div className="auth_page">
      <div className="auth_page__form_wrapper">
        <div className="auth_page__form_wrapper__container">
          <h2>Авторизация</h2>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
