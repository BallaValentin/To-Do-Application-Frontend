import { jwtDecode } from 'jwt-decode';
import { getNewAccessToken } from '../service/UserService';

const checkTokenValidity = async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp) {
      if (decodedToken.exp * 1000 < Date.now()) {
        try {
          console.log("Requesting new access token");
          await getNewAccessToken();
          return false;
        } catch (error) {
          return true;
        }
      }
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
};

export default checkTokenValidity;
