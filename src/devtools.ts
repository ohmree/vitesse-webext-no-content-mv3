export async function connectToDevtools(port: number) {
  const devtools = await import(/* @vite-ignore */ `@vue/${'devtools'}`);
  await devtools.connect(undefined, port);
}
