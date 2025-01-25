export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomStudentId = () => {
  const minDigits = 11;
  const maxDigits = 15;

  const numDigits =
    Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;

  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
