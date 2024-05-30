import { cookies } from 'next/headers';

import http from './http';

export const setTokenToHttp = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  http.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
