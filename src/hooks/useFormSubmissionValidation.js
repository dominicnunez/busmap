import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useErrorManager, ErrorTypes } from "./useErrorManager";
import { 
  validateName, 
  validateStopNumber, 
  validateRoutes,
  validateDuplicateStudent 
} from "../valdation/validationRules";

export function useFormSubmissionValidation() {
  const { setError, clearError } = useErrorManager();
  const students = useSelector((state) => state.students.students);

  const validateStudentForm = useCallback(
    ({ student, editingStudent = null }) => {
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