import { RouteObject } from "react-router-dom"

import lazyLoadWrapper from "../lib/utils/lazyLoadWrapper"
import Loadable from "../layout/Loadable"

// TODO: add AuthGuard
// import AuthGuard from "@layout/AuthGuard/AuthGuard"

const Login = Loadable(lazyLoadWrapper(() => import("../pages/Login/Login")))
const SignUp = Loadable(lazyLoadWrapper(() => import("../pages/SignUp/SignUp")))

const MainRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
]

export default MainRoutes
