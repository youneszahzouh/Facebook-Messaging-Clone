export function addApiUrlAsPrefix(url: string) {
  return process.env.NEXT_PUBLIC_BACKEND_API + url;
}
