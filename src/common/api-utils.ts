import { apiLogin } from "./api";
import { LoginPayloadType } from "./types";

export const apiLoginAsync = async (values: LoginPayloadType) => {
  try {
    // const bodyFormData = new FormData();
    // bodyFormData.append("email", values.email);
    // bodyFormData.append("password", values.password);

    const request = {
      email: values.email,
      password: values.password,
    };

    const response = await apiLogin(request);
    return response.data;
  } catch (error) {
    console.error("apiLogin error: ", error);
  }
};
