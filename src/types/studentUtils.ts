// types/studentUtils.ts

import { Student, StudentFormData } from './student';

// Type Guards
export function isValidStudent(value: unknown): value is Student {
  if (!value || typeof value !== 'object') return false;
  
  const student = value as Student;
  return (
    typeof student.id === 'string' &&
    typeof student.firstName === 'string' &&
    student.firstName.trim().length > 0 &&
    typeof student.lastName === 'string' &&
    student.lastName.trim().length > 0 &&
    typeof student.stopNumber === 'string' &&
    typeof student.amRoute === 'boolean' &&
    typeof student.pmRoute === 'boolean' &&
    Array.isArray(student.siblings) &&
    typeof student.active === 'boolean'
  );
}

export function isValidStudentFormData(value: unknown): value is StudentFormData {
  if (!value || typeof value !== 'object') return false;
  
  const formData = value as StudentFormData;
  return (
    typeof formData.firstName === 'string' &&
    formData.firstName.trim().length > 0 &&
    typeof formData.lastName === 'string' &&
    formData.lastName.trim().length > 0 &&
    typeof formData.stopNumber === 'string' &&
    typeof formData.amRoute === 'boolean' &&
    typeof formData.pmRoute === 'boolean' &&
    Array.isArray(formData.siblings) &&
    typeof formData.active === 'boolean'
  );
}

// Utility Types
export type StudentKeys = keyof Student;
export type StudentValidationErrors = Partial<Record<StudentKeys, string>>;

// Operation Results
export interface StudentOperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// Discriminated Unions for Student States
export type StudentLoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'failed'; error: string }
  | { status: 'succeeded'; lastUpdated: Date };

// Route Type
export type RouteType = 'AM' | 'PM' | 'BOTH' | 'NONE';

export function getRouteType(student: Student): RouteType {
  if (student.amRoute && student.pmRoute) return 'BOTH';
  if (student.amRoute) return 'AM';
  if (student.pmRoute) return 'PM';
  return 'NONE';
}

// Student Update Utilities
export type StudentUpdateData = Partial<StudentFormData>;

export interface StudentUpdateOptions {
  validate?: boolean;
  updateSiblings?: boolean;
}