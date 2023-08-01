const formatMoney = (number: number) => {
  const numString = number.toString();
  let result = '';

  for (let i = numString.length - 1; i >= 0; i--) {
    const digit = numString[i];
    if ((numString.length - i) % 3 === 0 && i !== 0) {
      result = ',' + digit + result;
    } else {
      result = digit + result;
    }
  }

  return result;
};

export default formatMoney;
