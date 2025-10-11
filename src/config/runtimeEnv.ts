export const ENV = {
  apiBase: () =>
    window.__ENV__?.API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL,
  wsBase: () => window.__ENV__?.WS_URL ?? import.meta.env.VITE_WS_URL,
};
