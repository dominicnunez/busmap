import { useState, useCallback } from 'react';

export enum ErrorTypes {
  FORM = 'form',
  VALIDATION = 'validation',
  INPUT = 'input',
  API = 'api'
}

type ErrorState = {
  [ErrorTypes.FORM]: string | null;
  [ErrorTypes.VALIDATION]: Record<string, string>;
  [ErrorTypes.INPUT]: Record<string, string>;
  [ErrorTypes.API]: string | null;
}

type SetErrorFn = (type: ErrorTypes, field: string | null, message: string) => void;
type ClearErrorFn = (type: ErrorTypes, field?: string | null) => void;
type GetErrorFn = (type: ErrorTypes, field?: string | null) => string | Record<string, string> | null;
type HasErrorsFn = (type?: ErrorTypes) => boolean;

export function useErrorManager() {
  const [errors, setErrors] = useState<ErrorState>({
    [ErrorTypes.FORM]: null,
    [ErrorTypes.VALIDATION]: {},
    [ErrorTypes.INPUT]: {},
    [ErrorTypes.API]: null
  });

  const setError: SetErrorFn = useCallback((type, field, message) => {
    setErrors(prev => {
      if (type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT) {
        return {
          ...prev,
          [type]: {
            ...prev[type],
            [field as string]: message
          }
        };
      }
      return {
        ...prev,
        [type]: message
      };
    });
  }, []);

  const clearError: ClearErrorFn = useCallback((type, field = null) => {
    setErrors(prev => {
      if (field && (type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT)) {
        const updatedErrors = { ...prev[type] };
        delete updatedErrors[field];
        return {
          ...prev,
          [type]: updatedErrors
        };
      }
      return {
        ...prev,
        [type]: type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT ? {} : null
      };
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({
      [ErrorTypes.FORM]: null,
      [ErrorTypes.VALIDATION]: {},
      [ErrorTypes.INPUT]: {},
      [ErrorTypes.API]: null
    });
  }, []);

  const getError: GetErrorFn = useCallback((type, field = null) => {
    if (field && (type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT)) {
      return errors[type][field];
    }
    return errors[type];
  }, [errors]);

  const hasErrors: HasErrorsFn = useCallback((type?) => {
    if (type) {
      if (type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT) {
        return Object.keys(errors[type]).length > 0;
      }
      return !!errors[type];
    }
    return Object.values(errors).some(error => 
      error && (typeof error === 'string' || Object.keys(error).length > 0)
    );
  }, [errors]);

  return {
    setError,
    clearError,
    clearAllErrors,
    getError,
    hasErrors
  };
}