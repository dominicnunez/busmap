import { Student } from '@/modules/types/student';

// Validation messages
const messages = {
  required: (field: string) => `${field} is required`,
  name: {
    minLetters: (field: string) => `${field} must contain at least 2 letters`,
    invalidChars: (field: string) => `${field} can only contain letters, spaces, hyphens and apostrophes`,
    consecutiveSpecial: (field: string) => `${field} cannot contain consecutive hyphens or apostrophes`,
    edgeSpecial: (field: string) => `${field} cannot start or end with hyphens, apostrophes, or spaces`
  },
  stop: {
    negative: 'Stop number cannot be negative',
    range: 'Stop number must be between 1 and 999'
  },
  route: 'Student must be assigned to at least one route',
  duplicate: 'A student with this name already exists'
};

export function validateName(value: string | undefined, fieldName: string): string {
  if (!value?.trim()) {
    return messages.required(fieldName);
  }
  
  const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 2) {
    return messages.name.minLetters(fieldName);
  }
  
  if (!/^[a-zA-Z\s-']+$/.test(value)) {
    return messages.name.invalidChars(fieldName);
  }
  
  if (/[-']{2,}/.test(value)) {
    return messages.name.consecutiveSpecial(fieldName);
  }
  
  if (/^[-'\s]|[-'\s]$/.test(value)) {
    return messages.name.edgeSpecial(fieldName);
  }
  
  return "";
}

export function validateStopNumber(value: string | undefined): string {
  if (!value) {
    return messages.required('Stop number');
  }
  
  if (value.includes('-')) {
    return messages.stop.negative;
  }
  
  const numValue = parseInt(value);
  if (numValue < 1 || numValue > 999) {
    return messages.stop.range;
  }
  
  return "";
}

export function validateRoutes(amRoute: boolean, pmRoute: boolean): string {
  if (!amRoute && !pmRoute) {
    return messages.route;
  }
  return "";
}

export function validateDuplicateStudent(
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
  return isDuplicate ? messages.duplicate : "";
}