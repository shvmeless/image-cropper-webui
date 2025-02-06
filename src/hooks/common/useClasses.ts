// FUNCTION
export function useClasses (...styles: Array<string | boolean | null | undefined>): string {
  return styles
    .filter((value) => (typeof value === 'string' && value !== ''))
    .join(' ')
}
