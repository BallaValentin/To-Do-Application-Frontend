import { jwtDecode } from 'jwt-decode';

const checkTokenValidity = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  if (!jwtToken) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(jwtToken);
    if (decodedToken.exp) {
      return decodedToken.exp * 1000 < Date.now();
    }
    return true;
  } catch (error) {
    return true;
  }
};

export default checkTokenValidity;
