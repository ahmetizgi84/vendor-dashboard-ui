import { notification } from "antd";

import { httpGetCsrfToken, httpLogin, httpRegister } from "@/common/http";
import { TLoginPayloadDTO, TRegisterPayloadDTO } from "@/common/types";
import { setAuthLoading, setLoginData } from "./actions";
import { cacheDelete, cacheSet } from "@/common/cacheManager";

export const apiGetCsrfToken = async (): Promise<string> => {
  try {
    const csrfTokenResponse = await httpGetCsrfToken();
    console.log("csrf-token: ", csrfTokenResponse);
    return "csrf token";
  } catch (error: any) {
    console.error("apiGetCsrfToken error: ", error);
    return error.message;
  }
};

export const apiLoginAsync = async (values: TLoginPayloadDTO) => {
  setAuthLoading(true);
  try {
    // const csrfToken = await apiGetCsrfToken();
    const request: TLoginPayloadDTO = {
      email: values.email,
      password: values.password,
    };

    // const response = await httpLogin(request);
    // const data = response.data;
    // setLoginData(data.data);
    // cacheSet("AUTH_STATE", data.data);

    await new Promise((resolve) => {
      setTimeout(() => {
        const loginData = {
          token: "abc",
          user: {
            id: 1,
            name: "John",
            surname: "Doe",
            email: "john@example.com",
            email_verified_at: null,
          },
        };
        setLoginData(loginData);
        cacheSet("AUTH_STATE", loginData);
        resolve(true);
      }, 3000);
    });
  } catch (error) {
    console.error("apiLoginAsync error: ", error);
    return {
      error: "Invalid login attempt",
    };
  } finally {
    setAuthLoading(false);
  }
};

export const apiRegisterAsync = async (values: TRegisterPayloadDTO) => {
  setAuthLoading(true);
  try {
    const response = await httpRegister(values);
    const data = response.data;
    setLoginData(data.data);
    cacheSet("AUTH_STATE", data.data);
    notification.success({
      message: "Success",
      description: "Registered successfully",
      placement: "bottomRight",
    });
    return {
      error: false,
    };
  } catch (error: any) {
    console.error("apiRegisterAsync error: ", error);
    notification.error({
      message: "Error",
      description: error.response.data.message,
      placement: "bottomRight",
    });
    return {
      error: "Invalid register attempt",
    };
  } finally {
    setAuthLoading(false);
  }
};

export const logOutUser = () => {
  setLoginData(null);
  cacheDelete("AUTH_STATE");
};
