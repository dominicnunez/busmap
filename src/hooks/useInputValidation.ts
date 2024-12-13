import { useCallback } from "react";
import { useErrorManager, ErrorTypes } from "./useErrorManager";
import { validateName, validateStopNumber, validateRoutes } from "../validation/validationRules";
import { StudentFormData } from "../types/student";

type FieldName = keyof StudentFormData;
type ValidationFunction = (name: FieldName, value: any, formData: StudentFormData) => boolean;

export function useInputValidation() {
  const { setError, clearError, clearAllErrors, getError } = useErrorManager();

  const validateField: ValidationFunction = useCallback((name, value, formData) => {
    let error = "";
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        error = validateName(value, name === 'firstName' ? "First name" : "Last name");
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

  const validateStudent = useCallback((student: StudentFormData): boolean => {
    clearAllErrors();
    return [
      validateField('firstName', student.firstName, student),
      validateField('lastName', student.lastName, student),
      validateField('stopNumber', student.stopNumber, student),
      validateField('amRoute', student.amRoute, student)
    ].every(Boolean);
  }, [clearAllErrors, validateField]);

  return {
    validateField,
    validateStudent,
    getValidationError: (fieldName: FieldName) => getError(ErrorTypes.VALIDATION, fieldName),
  };
}