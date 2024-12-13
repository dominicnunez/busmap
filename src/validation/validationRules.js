// validationRules.js
export const ValidationMessages = {
    REQUIRED: (field) => `${field} is required`,
    NAME: {
      MIN_LETTERS: (field) => `${field} must contain at least 2 letters`,
      INVALID_CHARS: (field) => `${field} can only contain letters, spaces, hyphens and apostrophes`,
      CONSECUTIVE_SPECIAL: (field) => `${field} cannot contain consecutive hyphens or apostrophes`,
      EDGE_SPECIAL: (field) => `${field} cannot start or end with hyphens, apostrophes, or spaces`
    },
    STOP: {
      NEGATIVE: 'Stop number cannot be negative',
      RANGE: 'Stop number must be between 1 and 999'
    },
    ROUTE: 'Student must be assigned to at least one route',
    DUPLICATE_STUDENT: 'A student with this name already exists'
  };
  
  export const validateName = (value, fieldName) => {
    if (!value?.trim()) {
      return ValidationMessages.REQUIRED(fieldName);
    }
    const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 2) {
      return ValidationMessages.NAME.MIN_LETTERS(fieldName);
    }
    if (!/^[a-zA-Z\s-']+$/.test(value)) {
      return ValidationMessages.NAME.INVALID_CHARS(fieldName);
    }
    if (/[-']{2,}/.test(value)) {
      return ValidationMessages.NAME.CONSECUTIVE_SPECIAL(fieldName);
    }
    if (/^[-'\s]|[-'\s]$/.test(value)) {
      return ValidationMessages.NAME.EDGE_SPECIAL(fieldName);
    }
    return "";
  };
  
  export const validateStopNumber = (value) => {
    if (!value) {
      return ValidationMessages.REQUIRED('Stop number');
    }
    if (value.includes('-')) {
      return ValidationMessages.STOP.NEGATIVE;
    }
    const numValue = parseInt(value);
    if (numValue < 1 || numValue > 999) {
      return ValidationMessages.STOP.RANGE;
    }
    return "";
  };
  
  export const validateRoutes = (amRoute, pmRoute) => {
    if (!amRoute && !pmRoute) {
      return ValidationMessages.ROUTE;
    }
    return "";
  };
  
  export const validateDuplicateStudent = (student, existingStudents, editingStudentId = null) => {
    const isDuplicate = existingStudents.some(
      (existing) =>
        existing.firstName.toLowerCase() === student.firstName.toLowerCase() &&
        existing.lastName.toLowerCase() === student.lastName.toLowerCase() &&
        existing.id !== editingStudentId
    );
    return isDuplicate ? ValidationMessages.DUPLICATE_STUDENT : "";
  };