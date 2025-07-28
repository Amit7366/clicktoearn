import { FieldValues } from 'react-hook-form';
type LoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    needsPasswordChange: boolean;
  };
};

export const userLogin = async (data: FieldValues): Promise<LoginResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const userInfo = await res.json();

  if (!res.ok || !userInfo.success) {
    const error = new Error(userInfo.message || 'Login failed');
    (error as any).response = { data: userInfo };
    throw error;
  }

  return userInfo;
};
