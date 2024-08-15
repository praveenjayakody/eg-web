import { AxiosRequestConfig } from "axios"
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query"

import axiosInstance from "../axios.instance"
import { rtkQueryClient } from "../rtkQuery.client"

// EXAMPLE:
// Use this hook to fetch data upon component mounting with optional dynamic configurations.
// const { data, isLoading, error } = useApiQuery('myData', '/my-endpoint', {
//     params: { param1: 'Dated' }
// });
// api ref: https://react-query.tanstack.com/reference/useQuery
/**
 * To do a manual (loginQuery.refetch() MUST  be called to execute) POST request with data that does not cache
 *   const loginQuery = useApiQuery<string>(
      ['login'],
      '/auth/login',
      () => ({
        method: 'post',
        data: {
          email: 'john.doe@mail.com',
          password: 'pwd',
        },
      }),
      { enabled: false, staleTime: 1 },
    );
  * But to get the loading state of an uncached query, use `isRefetching || isLoading` instead of `isLoading`
 */
export const useApiQuery = <TData = unknown>(
  queryKey: QueryKey,
  url: string,
  configFn?: () => AxiosRequestConfig,
  options?: Omit<UseQueryOptions<TData>, "queryKey">
) => {
  let config: AxiosRequestConfig | undefined

  if (configFn) {
    config = configFn()
  }

  return useQuery<TData>(
    {
      queryKey,
      queryFn: () =>
        axiosInstance
          .request({ url, method: config?.method ?? "get", ...config })
          .then(response => response.data),
      ...options
    },
    rtkQueryClient // INFO: https://github.com/TanStack/query/discussions/6321
  )
}
