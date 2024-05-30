'use client';
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

import Dialog from '~/components/dialog/Dialog';
import { RoutePath } from '~/constants/route';
import { useLogin } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { loginButton, loginContainer, loginForm, loginInput } from '~/styles/login/login.css';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();

  const { mutate: handleLogin, status } = useLogin();

  const { open, updateDialogState } = useDialogStore();
  const updateUserInfoState = useUserInfoState((state) => state.updateUserInfoState);

  const isLoading = status === 'pending' || status === 'success';

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    handleLogin(
      { username, password },
      {
        onSuccess: () => {
          updateUserInfoState(username);

          router.push('/today');
        },
        onError: (error: any) => {
          updateDialogState({
            open: true,
            mainText: error.message || '서버 점검 중입니다.',
            cancelText: '',
          });
        },
      },
    );
  };

  return (
    <>
      <div style={{ padding: '30px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 14 }}>오늘은 회사에서 어떤 일들이 펼쳐질까</p>
        <span style={{ fontSize: 34, fontWeight: 700 }}>오늘의 워크로그</span>
      </div>
      <form className={loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input className={loginInput} type='text' placeholder='아이디' {...register('username', { required: true })} />
        {/* {errors.id && <span>{loginDescription.error.username}</span>} */}
        <input
          className={loginInput}
          type='password'
          placeholder='비밀번호'
          {...register('password', { required: true })}
        />
        {/* {errors.password && <span>{loginDescription.error.password}</span>} */}
        <input
          className={loginButton({ isLoading })}
          type='submit'
          value={isLoading ? '로그인 중' : '로그인'}
          disabled={isLoading}
        />
        <span
          onClick={() => router.push(RoutePath.SignIn)}
          style={{
            color: '#5e6776',
            fontSize: 16,
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          회원가입
        </span>
      </form>
      {open && <Dialog />}
    </>
  );
}
