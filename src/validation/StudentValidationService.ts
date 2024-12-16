import { Student } from '../types/student';

export class ValidationMessageService {
  static readonly REQUIRED = (field: string) => `${field} is required`;
  
  static readonly NAME = {
    MIN_LETTERS: (field: string) => `${field} must contain at least 2 letters`,
    INVALID_CHARS: (field: string) => `${field} can only contain letters, spaces, hyphens and apostrophes`,
    CONSECUTIVE_SPECIAL: (field: string) => `${field} cannot contain consecutive hyphens or apostrophes`,
    EDGE_SPECIAL: (field: string) => `${field} cannot start or end with hyphens, apostrophes, or spaces`
  };

  static readonly STOP = {
    NEGATIVE: 'Stop number cannot be negative',
    RANGE: 'Stop number must be between 1 and 999'
  };

  static readonly ROUTE = 'Student must be assigned to at least one route';
  static readonly DUPLICATE_STUDENT = 'A student with this name already exists';
}

export class StudentValidationService {
  static validateName(value: string | undefined, fieldName: string): string {
    if (!value?.trim()) {
      return ValidationMessageService.REQUIRED(fieldName);
    }
    
    const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
    if (letterCount < 2) {
      return ValidationMessageService.NAME.MIN_LETTERS(fieldName);
    }
    
    if (!/^[a-zA-Z\s-']+$/.test(value)) {
      return ValidationMessageService.NAME.INVALID_CHARS(fieldName);
    }
    
    if (/[-']{2,}/.test(value)) {
      return ValidationMessageService.NAME.CONSECUTIVE_SPECIAL(fieldName);
    }
    
    if (/^[-'\s]|[-'\s]$/.test(value)) {
      return ValidationMessageService.NAME.EDGE_SPECIAL(fieldName);
    }
    
    return "";
  }

  static validateStopNumber(value: string | undefined): string {
    if (!value) {
      return ValidationMessageService.REQUIRED('Stop number');
    }
    
    if (value.includes('-')) {
      return ValidationMessageService.STOP.NEGATIVE;
    }
    
    const numValue = parseInt(value);
    if (numValue < 1 || numValue > 999) {
      return ValidationMessageService.STOP.RANGE;
    }
    
    return "";
  }

  static validateRoutes(amRoute: boolean, pmRoute: boolean): string {
    if (!amRoute && !pmRoute) {
      return ValidationMessageService.ROUTE;
    }
    return "";
  }

  static validateDuplicateStudent(
    student: Pick<Student, 'firstName' | 'lastName'>, 
    existingStudents: Student[], 
    editingStudentId: string | null = null
  ): string {
    const isDuplicate = existingStudents.some(
      (existing) =>
        existing.firstName.toLowerCase() === student.firstName.toLowerCase() &&
        existing.lastName.toLowerCase() === student.lastName.toLowerCase() &&
        existing.id !== editingStudentId
    );
    return isDuplicate ? ValidationMessageService.DUPLICATE_STUDENT : "";
  }
}