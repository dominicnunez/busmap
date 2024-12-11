import { useState } from "react";

export function useStudentFormValidation() {
  const [errors, setErrors] = useState({});

  const validateStudent = (student) => {
    const newErrors = {};

    // Name validations
    if (!student.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (student.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s-']+$/.test(student.firstName)) {
      newErrors.firstName = "First name can only contain letters, spaces, hyphens and apostrophes";
    }

    if (!student.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (student.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s-']+$/.test(student.lastName)) {
      newErrors.lastName = "Last name can only contain letters, spaces, hyphens and apostrophes";
    }

    // Stop number validations
    if (!student.stopNumber) {
      newErrors.stopNumber = "Stop number is required";
    } else if (parseInt(student.stopNumber) < 1) {
      newErrors.stopNumber = "Stop number must be greater than 0";
    } else if (parseInt(student.stopNumber) > 999) {
      newErrors.stopNumber = "Stop number cannot exceed 999";
    }

    // Route validation
    if (!student.amRoute && !student.pmRoute) {
      newErrors.route = "Student must be assigned to at least one route";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldError = (fieldName) => errors[fieldName];

  const clearErrors = () => setErrors({});

  return {
    validateStudent,
    getFieldError,
    clearErrors,
    errors
  };
}