import React from "react"
import Loader from "./Loader"

const Loadable =
  (Component: React.FC<AcknowledgedAny>) => (props: AcknowledgedAny) => (
    <React.Suspense fallback={<Loader />}>
      <Component {...props} />
    </React.Suspense>
  )

export default Loadable
