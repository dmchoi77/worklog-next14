import { AuthLayoutStyle } from './layout.css';

import { loginContainer } from '~/styles/login/login.css';

type Props = { children: React.ReactNode };

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={AuthLayoutStyle}>
      <div className={loginContainer}>{children}</div>
    </div>
  );
};

export default AuthLayout;
