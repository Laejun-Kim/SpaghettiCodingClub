import { toast } from 'react-toastify';

export const useWIPToast = () => {
  toast.warn('🚧 아직 구현되지 않은 기능입니다. 🚧', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
