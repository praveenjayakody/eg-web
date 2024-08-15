/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AcknowledgedAny = any

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
