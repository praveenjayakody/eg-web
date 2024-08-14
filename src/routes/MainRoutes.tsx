import { RouteObject } from "react-router-dom"

import lazyLoadWrapper from "../lib/utils/lazyLoadWrapper"
import Loadable from "../layout/Loadable"

// TODO: add AuthGuard
// import AuthGuard from "@layout/AuthGuard/AuthGuard"

const Auth = Loadable(lazyLoadWrapper(() => import("../pages/Auth/Auth")))
const SignUp = Loadable(lazyLoadWrapper(() => import("../pages/SignUp/SignUp")))

const MainRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      }
    ]
  }
]

export default MainRoutes
