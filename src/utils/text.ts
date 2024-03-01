

export function nlToBr(str: string): string {
  return str.replace(/\n/g, '<br />');
}
