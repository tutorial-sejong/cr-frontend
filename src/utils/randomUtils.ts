export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const generateRandomStudentId= () => {
  const min = Math.pow(10, 7); // 8자리 최소값: 10^7
  const max = Math.pow(10, 12) - 1; // 12자리 최대값: 10^12 - 1

  return Math.floor(Math.random() * (max - min + 1)) + min;
};