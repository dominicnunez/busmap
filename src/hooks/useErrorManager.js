import { useState, useCallback } from 'react';

export const ErrorTypes = {
  FORM: 'form',
  VALIDATION: 'validation',
  INPUT: 'input',
  API: 'api'
};

export function useErrorManager() {
  const [errors, setErrors] = useState({
    [ErrorTypes.FORM]: null,
    [ErrorTypes.VALIDATION]: {},
    [ErrorTypes.INPUT]: {},
    [ErrorTypes.API]: null
  });

  const setError = useCallback((type, field, message) => {
    setErrors(prev => {
      // For field-level errors (validation and input)
      if (type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT) {
        return {
          ...prev,
          [type]: {
            ...prev[type],
            [field]: message
          }
        };
      }
      // For form-level errors (form and api)
      return {
        ...prev,
        [type]: message
      };
    });
  }, []);

  const clearError = useCallback((type, field = null) => {
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

  const getError = useCallback((type, field = null) => {
    if (field && (type === ErrorTypes.VALIDATION || type === ErrorTypes.INPUT)) {
      return errors[type][field];
    }
    return errors[type];
  }, [errors]);

  const hasErrors = useCallback((type = null) => {
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