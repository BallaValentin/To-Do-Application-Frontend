import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useNullTokenChecker = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log(`The jwt token is : ${jwtToken}`);
    if (jwtToken == null) {
      console.log('Missing jwt token');
      navigate('/login');
    }
  }, []);
};

export default useNullTokenChecker;
