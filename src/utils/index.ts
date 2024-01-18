export const convertNewLineToBR = (text: string) => {
  return text.replace(/\n/g, '<br>');
}
