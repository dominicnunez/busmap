import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useErrorManager, ErrorTypes } from "../../hooks/useErrorManager";
import { 
  validateName, 
  validateStopNumber, 
  validateRoutes,
  validateDuplicateStudent 
} from "../../validation/validationRules";
import { Student, StudentFormData } from "../../types/student";
import { RootState } from "../../store/store";

interface ValidationParams {
  student: StudentFormData;
  editingStudent?: Student | null;
}

export function useFormValidation() {
  const { setError, clearError } = useErrorManager();
  const students = useSelector((state: RootState) => state.students.students);

  const validateStudentForm = useCallback(
    ({ student, editingStudent = null }: ValidationParams): boolean => {
      clearError(ErrorTypes.API);

      const nameError = validateName(student.firstName, "First name") || 
                       validateName(student.lastName, "Last name");
      if (nameError) {
        setError(ErrorTypes.API, null, nameError);
        return false;
      }

      const stopError = validateStopNumber(student.stopNumber);
      if (stopError) {
        setError(ErrorTypes.API, null, stopError);
        return false;
      }

      const routeError = validateRoutes(student.amRoute, student.pmRoute);
      if (routeError) {
        setError(ErrorTypes.API, null, routeError);
        return false;
      }

      const duplicateError = validateDuplicateStudent(student, students, editingStudent?.id);
      if (duplicateError) {
        setError(ErrorTypes.API, null, duplicateError);
        return false;
      }

      return true;
    },
    [students, setError, clearError]
  );

  return { validateStudentForm };
}