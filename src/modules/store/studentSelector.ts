import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/modules/store/store';
// import { Student } from '../types/student';

const selectStudentState = (state: RootState) => state.students;

export const selectStudents = createSelector(
  [selectStudentState],
  (studentState) => studentState.students
);

export const selectStudentById = (id: string) => createSelector(
  [selectStudents],
  (students) => students.find(student => student.id === id)
);

export const selectFilteredStudents = (searchTerm: string) => createSelector(
  [selectStudents],
  (students) => {
    if (!searchTerm) return students;
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }
);

export const selectActiveStudents = createSelector(
  [selectStudents],
  (students) => students.filter(student => student.active)
);

export const selectStudentsBySibling = (siblingId: string) => createSelector(
  [selectStudents],
  (students) => students.filter(student => 
    student.siblings.includes(siblingId) && student.id !== siblingId
  )
);