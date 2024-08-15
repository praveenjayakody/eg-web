import { RouteObject } from "react-router-dom"

import lazyLoadWrapper from "../lib/utils/lazyLoadWrapper"
import Loadable from "../layout/Loadable"
import AuthGuard from "../layout/AuthGuard"
import ProtectedGate from "../layout/ProtectedGate/ProtectedGate"

// TODO: add AuthGuard

const Login = Loadable(lazyLoadWrapper(() => import("../pages/Login/Login")))
const SignUp = Loadable(lazyLoadWrapper(() => import("../pages/SignUp/SignUp")))
const Welcome = Loadable(
  lazyLoadWrapper(() => import("../pages/Welcome/Welcome"))
)

const MainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/",
        element: <ProtectedGate />,
        children: [{ path: "/", element: <Welcome /> }]
      }
    ]
  }
]

export default MainRoutes
