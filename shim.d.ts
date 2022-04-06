declare global {
  declare module 'webext-bridge' {
    export interface ProtocolMap {
      // Define message protocol types.
      // See https://github.com/antfu/webext-bridge#type-safe-protocols.
    }
  }
}
