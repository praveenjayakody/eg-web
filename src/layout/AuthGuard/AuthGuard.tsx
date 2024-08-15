import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { useApiQuery } from "../../lib/query"
import { ApiUser } from "../../lib/models"
import { useUserStore } from "../../stores/user.store"

const AuthGuard: React.FC = () => {
  const navigate = useNavigate()
  const { user, setUser } = useUserStore()

  const { isLoading, isError, data } = useApiQuery<ApiUser>(
    ["user"],
    "/auth/iam",
    () => ({}),
    {
      enabled: !user,
      retry: false
    }
  )

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  useEffect(() => {
    if (isError) {
      navigate("/login" + location.search)
    }
  }, [isError, navigate])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default AuthGuard
