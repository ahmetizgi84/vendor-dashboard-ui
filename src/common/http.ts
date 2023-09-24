import { cacheGet } from "./cacheManager";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import constants from "./constants";
import { TLoginPayloadDTO } from "./types";
import { TResponseWrapper } from "@/types";

// HANDLERS
export function httpRequestInterceptor(config: InternalAxiosRequestConfig) {
  const tokenStr = cacheGet("TOKEN");
  if (tokenStr && config.headers) config.headers["Authorization"] = "Bearer " + tokenStr;
  //   if (config.headers) config.headers["Content-Type"] = "multipart/form-data";

  return config;
}

export function httpResponseInterceptor(response: AxiosResponse) {
  const data = response.data;
  if ((data.status !== undefined && data.status === false) || (data.success !== undefined && data.success === false))
    return Promise.reject({
      reason: "UNSUCCESSFUL_RESPONSE",
      response,
    });

  return response;
}

export function handleHttpRequestError(error: any) {
  console.error(error);
  return Promise.reject(error);
}

export function handleHttpResponseError(error: any) {
  console.error(error);

  if (error.response != null && error.response.status === 401) {
    console.warn("401 Unauthorized - Logging out...");
    // clearSiteData;
    // TODO Better logout redirection.
    window.location.href = "/";
  }

  return Promise.reject(error);
}

// CREATE AXIOS
const http = axios.create({
  baseURL: constants.ApiURL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 4000,
});

// API REQUESTS
export async function httpGetCsrfToken() {
  return http.get(`/sanctum/csrf-cookie`);
}

export async function httpLogin(request: TLoginPayloadDTO) {
  return http.post<TResponseWrapper>(`/api/login`, request);
}

// Handlers Implemented
http.interceptors.request.use(httpRequestInterceptor, handleHttpRequestError);
http.interceptors.response.use(httpResponseInterceptor, handleHttpResponseError);
