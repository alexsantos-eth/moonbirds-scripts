/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY_DEV: string;
  readonly VITE_API_KEY_PROD: string;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
