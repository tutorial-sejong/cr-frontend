export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const generateRandomStudentId = () => {
  const minDigits = 11;
  const maxDigits = 15;

  // 랜덤하게 자리수를 선택
  const numDigits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;

  // 선택된 자리수에 맞는 최소값과 최대값 계산
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
