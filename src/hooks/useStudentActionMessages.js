import { toast } from "sonner";

export function useStudentActionMessages() {
  const getStudentFullName = (student) =>
    student && student.firstName && student.lastName
      ? `${student.firstName} ${student.lastName}`
      : null;

  const returnVerb = (action) => {
    return action === "update" ? "updated" : "added";
  };

  const buildMessage = (type, action, student, error) => {
    const verb = returnVerb(action);
    const fullName = getStudentFullName(student) || "Student";

    if (type === "success") {
      return `${fullName} ${verb} successfully`;
    }

    // For errors:
    if (error) {
      return error;
    }

    if (action === "validation") {
      return "Please fix all errors in the form before submitting.";
    }

    // For add/update errors without custom error:
    return action === "add"
      ? `Failed to add ${fullName}`
      : `Failed to update ${fullName}`;
  };

  const showActionMessage = ({ type, action, student, error = null }) => {
    const message = buildMessage(type, action, student, error);
    type === "success" ? toast.success(message) : toast.error(message);
    return message;
  };

  return {
    showActionMessage,
    getStudentFullName,
  };
}
