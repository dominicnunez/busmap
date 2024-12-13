// types/student.ts
export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    stopNumber: string;
    amRoute: boolean;
    pmRoute: boolean;
    siblings: string[];
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface StudentState {
    students: Student[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    lastUpdated?: Date;
  }
  
  export type StudentFormData = Omit<Student, 'id' | 'createdAt' | 'updatedAt'>;
  
  export interface EditStudentPayload {
    updatedStudent: Student;
    originalStudent: Student;
  }