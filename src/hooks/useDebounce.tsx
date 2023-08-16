import { useState } from 'react';
import { useAlert } from '../providers/AlertProvider';

const useDebounce = () => {
  const [isClickable, setIsClickable] = useState(true);
  const { showAlert } = useAlert();
  function debounce(func: () => void, delay: number) {
    if (isClickable) {
      setIsClickable(false);
      func();
      setTimeout(() => {
        setIsClickable(true);
      }, delay);
    } else {
      showAlert({
        title: `Please wait ${delay / 1000} seconds before operating again.`,
        status: 999,
      });
    }
  }
  return [debounce];
};

export default useDebounce;
