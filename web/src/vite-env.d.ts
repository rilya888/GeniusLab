/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_FORM_ENDPOINT?: string;
  readonly VITE_PUBLIC_FORMSPREE_FORM_ID?: string;
  readonly VITE_PUBLIC_SITE_URL?: string;
  readonly VITE_PUBLIC_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
