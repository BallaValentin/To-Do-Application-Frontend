import { useEffect } from 'react';

const useNullTokenChecker = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log(`The jwt token is : ${jwtToken}`);
    if (jwtToken == null) {
      console.log('Missing jwt token');
      return true;
    }
    return false;
  };

export default useNullTokenChecker;
