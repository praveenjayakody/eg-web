import React from "react"
import { Outlet } from "react-router-dom"

// import { useApiQuery } from "@query"
// import { useUserStore } from "@stores/user.store"

const AuthGuard: React.FC = () => {
  // const { user, setUser } = useUserStore()

  // const { isLoading, isError } = useApiQuery<iUser>(
  //   ["user"],
  //   "/auth/iam",
  //   () => ({}),
  //   {
  //     enabled: !user,
  //     retry: false,
  //     onSuccess: data => {
  //       // todo: work around for stg
  //       if (data?.id) {
  //         setUser(data)
  //       } else {
  //         navigate("/auth" + location.search)
  //       }
  //     },
  //     onError: () => {
  //       navigate("/auth" + location.search)
  //     }
  //   }
  // )

  const isLoading = false
  const isError = false

  if (isLoading) {
    return <p>Loading</p>
  }

  // TODO: update error message and ui for error in this stage
  if (isError) {
    return <div>Error fetching user data</div>
  }

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default AuthGuard
