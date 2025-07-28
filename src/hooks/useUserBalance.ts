// hooks/useUserBalance.ts
import { getUserInfo } from "@/services/auth.services";
import { useGetUserBalanceQuery } from "@/redux/api/balanceApi";

export const useUserBalance = () => {
  const userInfo = getUserInfo();
  const objectId = userInfo?.objectId;

  const query = useGetUserBalanceQuery(objectId!, {
    skip: !objectId,
  });

  return {
    ...query,
    objectId,
  };
};
