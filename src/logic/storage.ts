import { StorageSerializers, useLocalStorage } from '@vueuse/core';

export const storageDemo = useLocalStorage<string | null>('webext-demo', null, {
  listenToStorageChanges: true,
  serializer: StorageSerializers.string,
});
