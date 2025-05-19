import { toast, ToastOptions, Id } from 'react-toastify';

let currentToast: Id | null = null;

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    if (currentToast) {
      toast.dismiss(currentToast);
    }
    currentToast = toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string | Error, options?: ToastOptions) => {
    if (currentToast) {
      toast.dismiss(currentToast);
    }
    const errorMessage = message instanceof Error ? message.message : message;
    currentToast = toast.error(errorMessage, { ...defaultOptions, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    if (currentToast) {
      toast.dismiss(currentToast);
    }
    currentToast = toast.info(message, { ...defaultOptions, ...options });
  },
  warning: (message: string, options?: ToastOptions) => {
    if (currentToast) {
      toast.dismiss(currentToast);
    }
    currentToast = toast.warning(message, { ...defaultOptions, ...options });
  },
  dismiss: () => {
    if (currentToast) {
      toast.dismiss(currentToast);
      currentToast = null;
    }
  },
};
