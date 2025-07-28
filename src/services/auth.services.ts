
import { authKey } from '@/contants/authkey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { decodedToken } from '@/utils/jwt';

import {
   getFromLocalStorage,
   removeFromLocalStorage,
   setToLocalStorage,
} from '@/utils/local-storage';
import { jwtDecode } from 'jwt-decode';

type DecodedUser = {
   userName: string;
   role: string;
   [key: string]: any;
};
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
   //   console.log(accessToken);
   return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
   const authToken = getFromLocalStorage(authKey);
   //   console.log(authToken);
   if (authToken) {
      const decodedData: any = decodedToken(authToken);
      // console.log(decodedData)
      return {
         ...decodedData,
         role: decodedData?.role?.toLowerCase(),
      };
   } else {
      return '';
   }
};

export const isLoggedIn = () => {
   const authToken = getFromLocalStorage(authKey);
   if (authToken) {
      return !!authToken;
   }
};

export const removeUser = () => {
   return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
   return await axiosInstance({
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
   });
};

export const loginUser = async (userName: string, password: string) => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
   });
   //   console.log(res)
   if (!res.ok) throw new Error("Login failed");

   const data = await res.json();

   const token = data.data.accessToken;
   //console.log(token);
   setToLocalStorage(authKey, token);
   if (!token) throw new Error("Token not found");

   const user = jwtDecode<DecodedUser>(token);
   //console.log(user)
   return { accessToken: token, user };
};