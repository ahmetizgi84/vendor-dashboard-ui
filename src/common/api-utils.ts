import axios from "axios";
import { apiGetCsrfToken, apiLogin } from "./api";
import { LoginPayloadType } from "./types";

export const apiLoginAsync = async (values: LoginPayloadType) => {
  try {
    const csrfTokenResponse = await apiGetCsrfToken();
    console.log("csrf-token: ", csrfTokenResponse);
    const cookie = csrfTokenResponse.headers["set-cookie"] as string[];
    // const cookie2 = csrfTokenResponse.request.responseHeaders["set-cookie"] as string[];
    console.log("cookie: ", cookie);

    const request = {
      email: values.email,
      password: values.password,
    };

    // const response = await apiLogin(request);
    // return response.data;
  } catch (error) {
    console.error("apiLogin error: ", error);
  }
};
