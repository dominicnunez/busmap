import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  students: JSON.parse(localStorage.getItem('students')) || [],
};

const updateSiblings = (students, studentId, siblingsToAdd = [], siblingsToRemove = []) => {
    return students.map(student => {
      if (siblingsToAdd.includes(student.id)) {
        return {
          ...student,
          siblings: [...new Set([...(student.siblings || []), studentId])],
        };
      }
      if (siblingsToRemove.includes(student.id)) {
        return {
          ...student,
          siblings: student.siblings?.filter(id => id !== studentId),
        };
      }
      return student;
    });
  };

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent(state, action) {
      const newStudent = { ...action.payload, id: uuidv4() };
      state.students = updateSiblings(state.students, newStudent.id, newStudent.siblings);
      state.students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(state.students));
    },

    editStudent(state, action) {
      const { updatedStudent, originalStudent } = action.payload;

      state.students = state.students.map(student => {
        if (student.id === originalStudent.id) {
          return { ...updatedStudent, id: originalStudent.id };
        }
        return student;
      });

      // Update sibling relationships
      const siblingsToAdd = updatedStudent.siblings?.filter(
        id => !originalStudent.siblings?.includes(id)
      ) || [];
      const siblingsToRemove = originalStudent.siblings?.filter(
        id => !updatedStudent.siblings?.includes(id)
      ) || [];

      state.students = updateSiblings(state.students, originalStudent.id, siblingsToAdd, siblingsToRemove);
      localStorage.setItem('students', JSON.stringify(state.students));
    },

    deleteStudent(state, action) {
      const studentId = action.payload;

      // Remove student and update sibling relationships
      state.students = updateSiblings(state.students, studentId, [], [studentId]).filter(
        student => student.id !== studentId
      );

      localStorage.setItem('students', JSON.stringify(state.students));
    },

    linkSiblings(state, action) {
      const { studentId, siblingIds } = action.payload;
      state.students = updateSiblings(state.students, studentId, siblingIds);
      localStorage.setItem('students', JSON.stringify(state.students));
    },
  },
});

export const { addStudent, editStudent, deleteStudent, linkSiblings } = studentSlice.actions;
export default studentSlice.reducer;
