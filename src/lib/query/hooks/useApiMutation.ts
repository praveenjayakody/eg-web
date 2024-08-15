import { AxiosRequestConfig } from "axios"
import { UseMutationOptions, useMutation } from "@tanstack/react-query"

import axiosInstance from "../axios.instance"
import { GENERIC_SERVER_ERROR } from "../../models"
import { rtkQueryClient } from "../rtkQuery.client"

/**
 * Example:
 *   const loginQuery = useApiMutation<User, { email: string; password: string }>(
      '/auth/login',
      'post',
      {
        onSuccess: data => {
          console.log(data);
        },
      },
    );
  *
  * loginQuery.mutate({ email: 'john@doe.com', password: 'pwd' })
 */

export const useApiMutation = <
  TData = unknown,
  TVariables = unknown,
  TError = GENERIC_SERVER_ERROR
>(
  url: string,
  method: "delete" | "post" | "put" | "patch" = "post",
  options: UseMutationOptions<TData, TError, TVariables> = {},
  axiosConfiguration: Partial<AxiosRequestConfig> = {}
) => {
  let config: AxiosRequestConfig | undefined

  if (axiosConfiguration) {
    config = axiosConfiguration
  }

  return useMutation<TData, TError, TVariables>(
    {
      retry: 0,
      mutationFn: data =>
        axiosInstance
          .request({ url, method, data, ...config })
          .then(response => response.data),
      ...options
    },
    rtkQueryClient // INFO: https://github.com/TanStack/query/discussions/6321
  )
}
