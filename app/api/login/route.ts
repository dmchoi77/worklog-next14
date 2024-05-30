import { NextApiResponse } from 'next';

import { NextRequest, NextResponse } from 'next/server';

import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginResponse } from '~/types/apis/user.types';
import http from '~/utils/http';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, res: NextApiResponse) {
  const requestBody = await req.json();
  try {
    const response = await http.post<ICommonResponse<ILoginResponse>>(
      '/users/login',
      {
        username: requestBody.username,
        password: requestBody.password,
      },
      {
        baseURL,
      },
    );

    const { accessToken, refreshToken } = response.data.data;

    const newHeaders = new Headers();
    newHeaders.set('set-cookie', `access_token=${accessToken}; path=/; samesite=Lax; secure=true;`);
    newHeaders.append('set-cookie', `refresh_token=${refreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

    return NextResponse.json({ ...response.data.data }, { status: response.status, headers: newHeaders });
  } catch (error: any) {
    return NextResponse.json({ ...error }, { status: error.status });
  }
}
