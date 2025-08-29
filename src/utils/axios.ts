import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Logger, JsonFormatter } from "./logger";
import packageJson from "../../package.json";

const axiosLogger = new Logger(
  {
    appName: `${packageJson.name}@${packageJson.version}`,
    loggerName: "AxiosLogger",
  },
  new JsonFormatter({ space: 0 })
);

const axiosBase = axios.create({});

// Request interceptor
axiosBase.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log outgoing request
    axiosLogger.info(
      `🚀 Request:, ${JSON.stringify({
        method: config.method?.toUpperCase(),
        url: config.url,
        headers: config.headers,
        params: config.params,
        data: config.data,
        timestamp: new Date().toISOString(),
      })}`
    );

    return config;
  },
  (error) => {
    // Log request error
    axiosLogger.error(
      `❌ Request Error:, ${JSON.stringify({
        message: error.message,
        config: error.config,
        timestamp: new Date().toISOString(),
      })}`
    );

    return Promise.reject(error);
  }
);

// Response interceptor
axiosBase.interceptors.response.use(
  (response) => {
    // Log successful response
    axiosLogger.info(
      `✅ Response:, ${JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        timestamp: new Date().toISOString(),
      })}`
    );

    return response;
  },
  (error) => {
    // Log response error
    axiosLogger.error(
      `❌ Response Error:, ${JSON.stringify({
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        timestamp: new Date().toISOString(),
      })}`
    );

    return Promise.reject(error);
  }
);

export default axiosBase;
