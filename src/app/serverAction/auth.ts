'use server';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { parse } from 'cookie';
import axios from 'axios';

// AccessToken 재발급
export const getNewAccessToken = async (accessToken: string) => {
  try {
    const { value } = cookies().get('refresh-token') as RequestCookie;

    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member/token`, {
      headers: {
        'refresh-token': `Bearer ${value}`,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

//쿠키 삭제(server-action)
export const deleteCookie = (name: string) => {
  if (cookies().get(name)) {
    cookies().delete(name);
  }
};

//쿠키 셋팅
export const setNewCookie = async (cookie: string) => {
  'use server';

  const parsedCookie = parse(cookie);
  const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
  const httpOnly = cookie.includes('httponly');

  deleteCookie(cookieName);

  cookies().set({
    name: cookieName,
    value: cookieValue,
    httpOnly: true,
    maxAge: parseInt(parsedCookie['Max-Age']),
    path: parsedCookie.path,
    // sameSite: parsedCookie.samesite,
    expires: new Date(parsedCookie.expires),
    // secure: true,
  });
};
