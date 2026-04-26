/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MESSAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
