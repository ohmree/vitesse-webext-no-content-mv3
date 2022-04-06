// Only in dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed');
});
