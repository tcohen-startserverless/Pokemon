/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TEST: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}