'use client';
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from 'react-hook-form';

import Dialog from '~/components/dialog/Dialog';
import useDebounce from '~/hooks/useDebounce';
import { useSignIn, useLogin, useCheckDuplicationEmail } from '~/queries/user';
import { useDialogStore } from '~/stores/useDialogStore';
import { loginButton, loginContainer, loginForm, loginInput } from '~/styles/login/login.css';

type Inputs = {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
};

export default function SignIn() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const { open, updateDialogState } = useDialogStore();

  const { mutate: handleSignIn } = useSignIn();
  const { mutate: handleLogin } = useLogin();

  const { mutate: checkDuplicationEmail, data: isDuplicated } = useCheckDuplicationEmail();

  const onChangeEmail = useDebounce(checkDuplicationEmail, 400);

  const onSubmit: SubmitHandler<Inputs> = ({ username, email, password, passwordCheck }) => {
    if (password !== passwordCheck) {
      return updateDialogState({
        open: true,
        mainText: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        cancelText: '',
      });
    }

    handleSignIn(
      {
        username,
        email,
        password,
        passwordCheck,
      },
      {
        onSuccess: () =>
          updateDialogState({
            open: true,
            mainText: '회원가입에 성공하였습니다.',
            cancelText: '',
            handleConfirm: () => {
              handleLogin(
                { username, password },
                {
                  onSuccess: () => {
                    router.push('/today');
                  },
                  onError: (error: any) => {
                    console.log(error);
                  },
                },
              );
            },
          }),
        onError: (error: any) => {
          updateDialogState({
            open: true,
            mainText: error?.response?.data?.message || '서버 점검 중입니다.',
            cancelText: '',
          });
        },
      },
    );
  };

  return (
    <>
      <div style={{ padding: '5px 0' }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>회원가입</span>
      </div>
      <form className={loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input className={loginInput} type='text' placeholder='이름' {...register('username', { required: true })} />
        <input
          className={loginInput}
          type='text'
          placeholder='이메일'
          {...register('email', { required: true })}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
        {isDuplicated && <span style={{ fontSize: 12, color: 'red' }}>이미 가입된 이메일 주소입니다.</span>}
        <input
          className={loginInput}
          type='password'
          placeholder='비밀번호'
          {...register('password', { required: true })}
        />
        <input
          className={loginInput}
          type='password'
          placeholder='비밀번호 확인'
          {...register('passwordCheck', { required: true })}
        />
        <input className={loginButton({ isLoading: false })} type='submit' value='회원가입' />
      </form>
      {open && <Dialog />}
    </>
  );
}
