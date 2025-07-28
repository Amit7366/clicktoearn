// utils/modifyPayload.ts

export const modifyPayload = (values: any) => {
  return {
    password: values.password,
    normalUser: {
      name: values.normalUser.name,
      email: values.normalUser.email,
      referredBy: values.normalUser.referredBy || "",
      userName: values.normalUser?.userName, 
      contactNo: values.normalUser.contactNo,
    },
  };
};
