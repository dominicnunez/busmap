import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useErrorManager, ErrorTypes } from "./useErrorManager";

export function useFormSubmissionValidation() {
  const { setError, clearError } = useErrorManager();
  const students = useSelector((state) => state.students.students);

  const validateStudentForm = useCallback(
    ({ student, editingStudent = null }) => {
      // Clear any previous submission errors
      clearError(ErrorTypes.API);

      // Check for duplicate student names
      const isDuplicate = students.some(
        (existingStudent) =>
          existingStudent.firstName.toLowerCase() === student.firstName.toLowerCase() &&
          existingStudent.lastName.toLowerCase() === student.lastName.toLowerCase() &&
          existingStudent.id !== editingStudent?.id
      );

      if (isDuplicate) {
        setError(
          ErrorTypes.API,
          null,
          "A student with this name already exists"
        );
        return false;
      }

      return true;
    },
    [students, setError, clearError]
  );

  return {
    validateStudentForm,
  };
}