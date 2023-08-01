const setCookie = (name: string, value: string, daysToExpire: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + date.toUTCString();
  
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

const getCookie = (name: string) => {
  const cookieArr = document.cookie.split('; ');
  for (const cookie of cookieArr) {
    const cookiePair = cookie.split('=');
    if (cookiePair[0] === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

const deleteCookie = (name: string) => {
  const date = new Date();
  document.cookie = name + `=; ${date}; path=/;`;
};

export { setCookie, getCookie, deleteCookie };
