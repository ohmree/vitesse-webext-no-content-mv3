import 'vue/macros-global';
import 'vite/client';

declare global {
  declare const __DEV__: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  declare interface ImportMetaEnv {
    // Type definitions for dotenv variables go here.
  }
}
