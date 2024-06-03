import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import http from '~/utils/http';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const newHeaders = new Headers();
    newHeaders.set('set-cookie', 'refresh_token=; Path=/; Max-Age=0');
    newHeaders.append('set-cookie', 'access_token=; Path=/; Max-Age=0');
    const accessToken = cookies().get('access_token')?.value;

    await http.post(
      '/users/logout',
      {},
      {
        baseURL,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return NextResponse.json({ message: '로그아웃 되었습니다.' }, { status: 200, headers: newHeaders });
  } catch (error: any) {
    return NextResponse.json({ ...error }, { status: error.status });
  }
}
