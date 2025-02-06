import { useEffect, useState } from 'react';
import checkTokenValidity from '../util/checkTokenValidity';

const useTokenChecker = () => {
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  useEffect(() => {
    const checkToken = async () => {
      console.log('Checking token...');
      const expired = await checkTokenValidity();
      setIsTokenExpired(expired);
    };

    checkToken();

    const interval = setInterval(checkToken, 30000);

    return () => clearInterval(interval);
  }, [checkTokenValidity]);

  return isTokenExpired;
};

export default useTokenChecker;
