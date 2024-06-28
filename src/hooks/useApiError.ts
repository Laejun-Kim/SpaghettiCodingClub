import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useApiError = () => {
  const handleError = useCallback((error) => {
    console.log(error);
    // const httpStatus = error.response.status; // axios 에러 코드
    // const serviceCode = error.response.data.code; // 응답 코드
    const httpMessage = error.response.data.message; // 응답 메시지

    // if (handlers[httpStatus][serviceCode]) {
    //   handlers[httpStatus][serviceCode]();
    //   return;
    // }

    // if (handlers[httpStatus]) {
    //   handlers[httpStatus].default();
    //   return;
    // }

    handlers.default(httpMessage);
  }, []);

  return { handleError };
};

const defaultHandler = (httpMessage: string) => {
  toast.error(httpMessage);
};

const handler409 = () => {
  toast.error('409 Error');
};

const handler40010001 = () => {
  toast.error('409 10001 Error');
};

const handler500 = () => {
  toast.error('서버에서 알 수 없는 문제가 발생하였습니다.');
};

const handlers = {
  default: defaultHandler,
  409: {
    default: handler409,
    10001: handler40010001,
  },
  500: {
    default: handler500,
  },
};

export default useApiError;
