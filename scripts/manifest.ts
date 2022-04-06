import fs from 'fs-extra';
import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';
import { isDev, port, r } from './utils';

const browser: string = process.env.TARGET_BROWSER ?? 'chrome';

export default async function manifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

  if (browser.includes('firefox')) {
    const manifest: Manifest.WebExtensionManifest = {
      manifest_version: 2,
      name: pkg.displayName || pkg.name,
      version: pkg.version,
      description: pkg.description,
      browser_action: {
        default_icon: 'assets/icon-512.png',
        default_popup: 'popup/index.html',
      },
      options_ui: {
        page: 'options/index.html',
        open_in_tab: true,
        chrome_style: false,
      },
      background: {
        page: 'background/index.html',
        persistent: false,
      },
      icons: {
        16: 'assets/icon-512.png',
        48: 'assets/icon-512.png',
        128: 'assets/icon-512.png',
      },
      permissions: ['activeTab', 'tabs', 'storage', 'http://*/', 'https://*/'],
      browser_specific_settings: {
        gecko: {
          id: 'webext-demo@fixme.com',
        },
      },
    };
    if (isDev) {
      manifest.permissions?.push('webNavigation');

      // This is required on dev for Vite script to load.
      manifest.content_security_policy = `script-src \'self\' http://localhost:${port} http://localhost:8098 http://localhost:8099; object-src \'self\'`;
    }
    return manifest;
  } else {
    type Manifest = ReturnType<typeof chrome.runtime.getManifest>;

    const manifest: Manifest = {
      manifest_version: 3,
      name: pkg.displayName || pkg.name,
      version: pkg.version,
      description: pkg.description,
      action: {
        default_icon: {
          16: 'assets/icon-512.png',
          48: 'assets/icon-512.png',
          128: 'assets/icon-512.png',
        },
        default_popup: 'popup/index.html',
      },
      options_ui: {
        page: 'options/index.html',
        open_in_tab: true,
      },
      background: {
        service_worker: 'background/main.ts',
        type: 'module',
      },
      icons: {
        16: 'assets/icon-512.png',
        48: 'assets/icon-512.png',
        128: 'assets/icon-512.png',
      },
      permissions: ['activeTab', 'tabs', 'storage'],
    };
    return manifest;
  }
}
