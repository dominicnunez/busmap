import { toast } from "sonner";
import { Student } from "@/modules/types/student";

type ActionType = "success" | "error";
type ActionVerb = "update" | "add" | "validation";

interface ActionToastParams {
  type: ActionType;
  action: ActionVerb;
  student?: Student;
  error?: string | null;
}

export function useActionToast() {
  const getStudentFullName = (student?: Student): string =>
    student?.firstName && student?.lastName
      ? `${student.firstName} ${student.lastName}`
      : "Student";

  const returnVerb = (action: "update" | "add"): string =>
    action === "update" ? "updated" : "added";

  const buildMessage = (params: ActionToastParams): string => {
    const { type, action, student, error } = params;
    const verb = action === "validation" ? "" : returnVerb(action);
    const fullName = getStudentFullName(student);

    if (type === "success") {
      return `${fullName} ${verb} successfully`;
    }

    if (error) return error;
    if (action === "validation") return "Please fix all errors in the form before submitting.";
    
    return action === "add"
      ? `Failed to add ${fullName}`
      : `Failed to update ${fullName}`;
  };

  const showActionMessage = (params: ActionToastParams): string => {
    const message = buildMessage(params);
    params.type === "success" ? toast.success(message) : toast.error(message);
    return message;
  };

  return {
    showActionMessage,
    getStudentFullName,
  };
}