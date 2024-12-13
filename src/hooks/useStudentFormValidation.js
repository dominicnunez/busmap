import { useCallback } from "react";
import { useErrorManager, ErrorTypes } from "./useErrorManager";
import { validateName, validateStopNumber, validateRoutes } from "../validation/validationRules";

export function useStudentFormValidation() {
  const { setError, clearError, clearAllErrors, getError } = useErrorManager();

  const validateField = useCallback((name, value, formData) => {
    let error = "";
    
    switch (name) {
      case 'firstName':
        error = validateName(value, "First name");
        break;
      case 'lastName':
        error = validateName(value, "Last name");
        break;
      case 'stopNumber':
        error = validateStopNumber(value);
        break;
      case 'amRoute':
      case 'pmRoute':
        error = validateRoutes(formData.amRoute, formData.pmRoute);
        break;
    }

    if (error) {
      setError(ErrorTypes.VALIDATION, name, error);
    } else {
      clearError(ErrorTypes.VALIDATION, name);
    }
    
    if ((name === 'amRoute' || name === 'pmRoute') && error) {
      setError(ErrorTypes.VALIDATION, 'amRoute', error);
      setError(ErrorTypes.VALIDATION, 'pmRoute', error);
    }
    
    return !error;
  }, [setError, clearError]);

  const validateStudent = useCallback((student) => {
    clearAllErrors();
    const validations = [
      validateField('firstName', student.firstName, student),
      validateField('lastName', student.lastName, student),
      validateField('stopNumber', student.stopNumber, student),
      validateField('amRoute', student.amRoute, student)
    ];
    return validations.every(Boolean);
  }, [clearAllErrors, validateField]);

  return {
    validateField,
    validateStudent,
    getValidationError: (fieldName) => getError(ErrorTypes.VALIDATION, fieldName),
  };
}