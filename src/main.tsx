import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { CssBaseline } from "@mui/material"
import { QueryClientProvider } from "@tanstack/react-query"

import App from "./App.tsx"
import "./index.css"
import { rtkQueryClient } from "./lib/query/rtkQuery.client.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={rtkQueryClient}>
      <CssBaseline />
      <App />
    </QueryClientProvider>
  </StrictMode>
)
