import { useEffect, useState } from 'react';
import { getNewAccessToken } from '../service/UserService';

const useNullTokenChecker = () => {
  const [isTokenNull, setIsTokenNull] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken === null) {
          try {
            await getNewAccessToken();
            setIsTokenNull(false);
          } catch (error) {
            setIsTokenNull(true);
          }
        }
       else {
        setIsTokenNull(false);
      }
    };
    checkToken();
  }, []);
  return isTokenNull;
};

export default useNullTokenChecker;
