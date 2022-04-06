# Vitesse WebExt MV3

This is the excellent [`vitesse-webext`](https://github.com/antfu/vitesse-webext/), updated to work with manifest V3 and without the content scripts.

## Note about PrimeIcons
Currently we copy the icon fonts to our own assets dir, since they fail to load otherwise.
This needs to be fixed but I'm not sure how.

## Usage

### Folders

- `src` - main source.
  - `background` - scripts for background.
  - `components` - auto-imported Vue components that are shared in popup and options page.
  - `styles` - styles shared in popup and options page.
  - `assets` - static assets.
- `dist` - built files, also serve stub entry for Vite on development.
- `scripts` - development and bundling helper scripts.
  - `manifest.ts` - manifest for the extension.

### Development

```console
$ pnpm dev
```

Then **load extension in browser with the `dist/` folder**.

For Firefox developers, you can run the following command instead:

```console
$ pnpm start:firefox
```

`web-ext` will auto reload the extension when `dist/` files changed.

> While Vite handles HMR automatically in the most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommanded for cleaner hard reloading.

### Build

To build the extension, run

```console
$ pnpm release:firefox
```

,or

```console
$ pnpm release:chromium
```

Then you can upload `extension.crx` or `extension.xpi` to the appropriate extension store.
