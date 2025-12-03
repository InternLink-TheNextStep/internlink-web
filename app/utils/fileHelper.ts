

export function getSpaceFileUrl(filePath: string | null | undefined): string {
  if (!filePath) return "";

  const config = useRuntimeConfig();
  const SPACE_URL = config.public.doSpacesUrl;

  if (!SPACE_URL) {
    return filePath; // fallback
  }

  return `${SPACE_URL}/${filePath}`;
}
