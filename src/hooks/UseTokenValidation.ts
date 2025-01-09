import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useTokenValidation = (token: string) => {
    const navigate = useNavigate();
    const [isInvalidToken, setIsInvalidToken] = useState(false);
    
    useEffect(() => {
        if (!token) {
          navigate('/unauthorized');
        } else {
          try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp) {
              const isExpired = decodedToken.exp * 1000 < Date.now();
              if (isExpired) {
                setIsInvalidToken(true);
              }
            } else {
              setIsInvalidToken(true);
            }
          } catch (err) {
            navigate('/unauthorized');
          }
        }
      }, [token, navigate]);
      return isInvalidToken;
}