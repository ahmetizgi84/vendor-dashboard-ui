import { cacheGet } from "./cacheManager";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import constants from "./constants";
import { LoginPayloadType } from "./types";

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
const gozAPI = axios.create({
  baseURL: constants.ApiURL,
  headers: {
    // "Content-Type": "application/json; charset=utf-8",
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
  timeout: 40000,
  withCredentials: true,
});

// API REQUESTS

// TEST REQUEST
export async function apiLogin(request: LoginPayloadType) {
  return gozAPI.post(`/login`, request);
}

// Handlers Implemented
gozAPI.interceptors.request.use(httpRequestInterceptor, handleHttpRequestError);
gozAPI.interceptors.response.use(httpResponseInterceptor, handleHttpResponseError);
