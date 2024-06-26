import API from '@/utils/axios';
import { FormValues } from '@/app/(auth)/components/signup/SignupForm';
import { signOut } from 'next-auth/react';
import { deleteCookie } from '../serverAction/auth';

interface ICredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

//로그인
export const signInWithCredentials = async (params: ICredentials) => {
  return await API.post('/member/login', params);
};

//로그아웃
export const signoutWithCredentials = () => {
  ('use server');
  deleteCookie('refresh-token');
  deleteCookie('access-token');

  signOut({ callbackUrl: '/' });
};

//회사 검증
export const verifyCompany = async (authCode: string) => {
  const res = await API.post('/member/verify/company', { auth_code: authCode });
  return res.data;
};

//이메일 검증
export const validateEmail = async (email: string) => {
  const res = await API.post('/member/validate/email', { email });
  return res.data;
};

//이메일 검증 번호 입력
export const verifyEmail = async ({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}) => {
  const res = await API.post('/member/verify/email', {
    email,
    auth_code: authCode,
  });
  return res.data;
};

//닉네임 검증
export const validateNickname = async (username: string) => {
  const res = await API.post('/member/validate/username', { username });
  return res.data;
};

//회원가입
export const signUp = async (formValues: FormValues) => {
  const res = await API.post('/member/register', formValues);
  return res.data;
};
