
export function parseIntFromParameter(
  id: string,
  defaultNumber: number = null,
): number {
  const result = parseInt(id, 10);
  return isNaN(result) ? defaultNumber : result;
}
