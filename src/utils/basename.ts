/**
 * Converts Vite's `BASE_URL` into a value React Router accepts as `basename`.
 *
 * Vite always emits `BASE_URL` with a leading and a trailing slash
 * (`"/little-mathematician/"`), or `"/"` for a root deployment, or `"./"` for a
 * relative base. React Router compares the location against the basename and is
 * happiest without the trailing slash, while a relative base cannot describe a
 * sub-path at all, so it degrades to the root basename.
 */
export const toBasename = (baseUrl: string): string => {
  if (!baseUrl.startsWith("/")) return "/";

  const trimmed = baseUrl.replace(/\/+$/, "");

  return trimmed === "" ? "/" : trimmed;
};
