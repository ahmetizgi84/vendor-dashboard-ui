import { httpGetCsrfToken, httpLogin } from "@/common/http";
import { TLoginPayloadDTO } from "@/common/types";
import { setAuthLoading, setLoginData } from "./actions";

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

    const response = await httpLogin(request);
    const data = response.data;
    console.log("data: ", data);
    setLoginData(data.data);
  } catch (error) {
    console.error("apiLoginAsync error: ", error);
    return {
      error: "Invalid login attempt",
    };
  } finally {
    setAuthLoading(false);
  }
};
