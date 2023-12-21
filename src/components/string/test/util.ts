export const swap = (string: string) => {
  const splittedString = string.split('');

  for (let start = 0, end = splittedString.length - 1; start <= end; start++, end--) {
    [splittedString[start], splittedString[end]] = [splittedString[end], splittedString[start]]
  }

  return splittedString;
}