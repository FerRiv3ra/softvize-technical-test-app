import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosInstance, HeadersDefaults } from "axios";

import { apiUrl, apiVersion } from "../utils/constants/envConfig";
import { logAppError } from "../utils/helpers/Logger";
import { AUTH_ROUTES } from "./routes";

export interface CustomHeaders extends HeadersDefaults {
  Authorization?: string | null;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${apiUrl}/${apiVersion}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    let token: string | null = null;

    if (
      config.url === AUTH_ROUTES.ROUTE_AUTH_REFRESH &&
      config.method?.toLowerCase() === "get"
    ) {
      token = (await AsyncStorage.getItem("refreshToken")) ?? "";
    } else {
      token = (await AsyncStorage.getItem("accessToken")) ?? "";
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  async (response) => {
    const { url, method } = response.config;
    const isAuth =
      [AUTH_ROUTES.ROUTE_AUTH_SIGN_IN, AUTH_ROUTES.ROUTE_AUTH_SIGN_UP].includes(
        url as string
      ) && method?.toLowerCase() === "post";
    const isAuthRefresh =
      AUTH_ROUTES.ROUTE_AUTH_REFRESH === url && method?.toLowerCase() === "get";
    const isAuthRoute = isAuth || isAuthRefresh;

    if (isAuthRoute) {
      // API Auth - Extract and store tokens
      const { accessToken, refreshToken, user } = response.data.data;

      if (!!accessToken && !!refreshToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
      }

      return {
        ...response,
        data: {
          statusCode: response.data.statusCode,
          message: response.data.message,
          data: user,
        },
      };
    }

    return response;
  },
  (error: any) => {
    if (error.response) {
      console.log(
        `Error: ${error.response.status} - ${error.response.data.message}`
      );
    } else {
      logAppError(`Error on request: ${JSON.stringify(error)}`);
      return Promise.reject("Network or server error");
    }
    return Promise.reject(error);
  }
);

export { axiosClient };
