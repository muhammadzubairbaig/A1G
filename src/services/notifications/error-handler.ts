import { AxiosError } from 'axios';
import { showToast } from '@/utils/toast';

export interface ErrorResponseData {
  error?: string;
  message?: string;
}

const errorHandler = (error: AxiosError<ErrorResponseData>): string => {
  if (!error?.response) {
    const message = 'Network error. Please check your connection.';
    showToast.error(message);
    return message;
  }

  const { status, data } = error.response;
  let message: string;

  switch (status) {
    case 400:
      message = data.error || 'Bad Request';
      break;
    case 401:
      message = 'Unauthorized. Please login again.';
      break;
    case 403:
      message = "Forbidden. You don't have permission.";
      break;
    case 404:
      message = 'Resource not found.';
      break;
    case 500:
      message = 'Server error. Please try again later.';
      break;
    default:
      message = data.message || 'Something went wrong.';
  }

  showToast.error(message);
  return message;
};

export default errorHandler;

/**
 * Formats error messages from different types of errors
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

/**
 * Handles errors by showing a toast notification
 */
export const handleError = (error: unknown): void => {
  const message = formatErrorMessage(error);
  showToast.error(message);
};
