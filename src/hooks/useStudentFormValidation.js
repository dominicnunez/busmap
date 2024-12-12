import { useCallback } from "react";
import { useErrorManager, ErrorTypes } from "./useErrorManager";

const validateName = (value, fieldName) => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 2) {
    return `${fieldName} must contain at least 2 letters`;
  }
  if (!/^[a-zA-Z\s-']+$/.test(value)) {
    return `${fieldName} can only contain letters, spaces, hyphens and apostrophes`;
  }
  if (/[-']{2,}/.test(value)) {
    return `${fieldName} cannot contain consecutive hyphens or apostrophes`;
  }
  if (/^[-'\s]|[-'\s]$/.test(value)) {
    return `${fieldName} cannot start or end with hyphens, apostrophes, or spaces`;
  }
  return "";
};

const validateStopNumber = (value, fieldName) => {
  if (!value) {
    return `${fieldName} is required`;
  } else if (parseInt(value) < 1) {
    return `${fieldName} must be greater than 0`;
  } else if (parseInt(value) > 999) {
    return `${fieldName} cannot exceed 999`;
  }
  return "";
};

export function useStudentFormValidation() {
  const { setError, clearError, clearAllErrors, getError, hasErrors } = useErrorManager();

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
        error = validateStopNumber(value, "Stop number");
        break;

      case 'amRoute':
      case 'pmRoute':
        if (!formData.amRoute && !formData.pmRoute) {
          error = "Student must be assigned to at least one route";
        }
        break;
    }

    if (error) {
      setError(ErrorTypes.VALIDATION, name, error);
    } else {
      clearError(ErrorTypes.VALIDATION, name);
    }
    
    // For route validation, handle both fields
    if ((name === 'amRoute' || name === 'pmRoute') && error) {
      setError(ErrorTypes.VALIDATION, 'amRoute', error);
      setError(ErrorTypes.VALIDATION, 'pmRoute', error);
    }
    
    return !error;
  }, [setError, clearError]);

  const validateStudent = useCallback((student) => {
    clearAllErrors();
    
    // Validate all fields
    const fields = ['firstName', 'lastName', 'stopNumber', 'amRoute', 'pmRoute'];
    fields.forEach(field => {
      validateField(field, student[field], student);
    });

    return !hasErrors(ErrorTypes.VALIDATION);
  }, [clearAllErrors, validateField, hasErrors]);

  return {
    validateField,
    validateStudent,
    getValidationError: (fieldName) => getError(ErrorTypes.VALIDATION, fieldName),
  };
}