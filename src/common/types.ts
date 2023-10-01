export type TLoginPayloadDTO = {
  email: string;
  password: string;
  //   remember: boolean;
};

export type TRegisterPayloadDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  password_confirmation: string;
};
