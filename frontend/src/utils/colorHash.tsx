export const colorHash = (str: string) => {
  let hash = 0;

  for(let i=0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 6);

  return `#${ color.padStart(6, '0') }`;
};