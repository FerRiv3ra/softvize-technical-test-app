import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosClient } from './axiosClient';

/**
 * Allowed HTTP methods for API requests.
 */
export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

/**
 * Extended request configuration including API versioning.
 */
export interface CustomRequestConfig
  extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  url: string; // Endpoint URL (excluding version prefix)
  method?: HttpMethod; // HTTP method (optional, defaults to GET)
}

/**
 * Sends an HTTP request to the API with version handling.
 *
 * @template T - The expected response data type.
 * @param {CustomRequestConfig} config - The request configuration.
 * @param {'v1' | 'v2'} config.apiVersion - The API version to use.
 * @param {string} config.url - The endpoint path **without** the version (e.g., `/users`).
 * @param {HttpMethod} [config.method='GET'] - The HTTP method (defaults to `GET`).
 * @param {AxiosRequestConfig} config.restConfig - Additional Axios configuration (headers, params, data, etc.).
 * @returns {Promise<T>} - A promise resolving to the typed API response.
 *
 * @example
 * // Example: GET request
 * const user = await apiRequest<{ id: string; name: string }>({
 *   apiVersion: 'v2',
 *   url: '/user',
 * });
 *
 * @example
 * // Example: POST request
 * const newUser = await apiRequest<{ id: string }>({
 *   apiVersion: 'v1',
 *   url: '/users',
 *   method: 'POST',
 *   data: { name: 'John Doe' },
 * });
 */
export const apiRequest = <T>(
  config: CustomRequestConfig,
): Promise<AxiosResponse<T, any>> => {
  const { url, method = 'GET', ...restConfig } = config;

  // Perform the API request
  return axiosClient.request<T>({
    method,
    url,
    ...restConfig,
  });
};
