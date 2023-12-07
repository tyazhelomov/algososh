export const sleep = (time: number): Promise<NodeJS.Timeout> => new Promise(resolve => setTimeout(resolve, time));

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
