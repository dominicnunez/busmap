import { FC, useState, useEffect, FormEvent, ChangeEvent, ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useActionToast } from "@/modules/hooks/useActionToast";
import { useFormValidation } from "@/modules/hooks/useFormValidation";
import { useInputValidation } from "@/modules/hooks/useInputValidation";
import { useErrorManager, ErrorTypes } from "@/modules/hooks/useErrorManager";
import { addStudent, editStudent as editStudentAction } from "@/modules/store/studentSlice";
import { Student, StudentFormData } from "@/modules/types/student";
import { RootState, AppDispatch } from "@/modules/store/store";

type FormField = keyof Omit<Student, 'id' | 'createdAt' | 'updatedAt'>;

interface FormState {
  id: string | null;
  firstName: string;
  lastName: string;
  stopNumber: string;
  amRoute: boolean;
  pmRoute: boolean;
  siblings: string[];
  active: boolean;
}

export const StudentForm: FC = () => {
  const { validateField, validateStudent, getValidationError } = useInputValidation();
  const { setError, clearAllErrors, getError } = useErrorManager();
  const { validateStudentForm } = useFormValidation();
  const { showActionMessage } = useActionToast();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.students.students);
  const editingStudent = students.find((s) => s.id === id);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [student, setStudent] = useState<FormState>({
    id: null,
    firstName: "",
    lastName: "",
    stopNumber: "",
    amRoute: true,
    pmRoute: true,
    siblings: [],
    active: true,
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent({
        ...editingStudent,
        siblings: editingStudent.siblings ?? [],
      });
    }
  }, [editingStudent]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateStudent(student)) {
      setIsSubmitting(false);
      showActionMessage({ type: 'error', action: 'validation' });
      return;
    }

    if (!validateStudentForm({ student, editingStudent })) {
      setIsSubmitting(false);
      showActionMessage({ type: 'error', action: 'validation' });
      return;
    }
    
    clearAllErrors();
    setIsSubmitting(true);
    
    try {
      if (editingStudent) {
        await dispatch(
          editStudentAction({
            updatedStudent: student as Student,
            originalStudent: editingStudent,
          })
        );
        showActionMessage({ type: 'success', action: 'update', student });
      } else {
        await dispatch(addStudent(student as StudentFormData));
        showActionMessage({ type: 'success', action: 'add', student });
      }
      navigate("/");
    } catch (error) {
      const errorMessage = showActionMessage({ 
        type: 'error', 
        action: editingStudent ? 'update' : 'add', 
        student,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
      setError(ErrorTypes.FORM, null, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: FormField) => (
    e: ChangeEvent<HTMLInputElement> | boolean
  ): void => {
    const value = typeof e === 'boolean' ? e : e.target.value;
    const updatedStudent = { ...student, [field]: value };
    setStudent(updatedStudent);
    validateField(field, value, updatedStudent);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/")} disabled={isSubmitting}>
          ← Back
        </Button>
        <h1 className="text-2xl font-bold mt-4">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h1>
      </div>

      {getError(ErrorTypes.FORM) && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{getError(ErrorTypes.FORM) as ReactNode}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="First Name"
            value={student.firstName}
            onChange={handleInputChange("firstName")}
            disabled={isSubmitting}
            className={getValidationError("firstName") ? "border-red-500" : ""}
          />
          {getValidationError("firstName") && (
            <p className="text-sm text-red-500 mt-1">{getValidationError("firstName") as ReactNode}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Last Name"
            value={student.lastName}
            onChange={handleInputChange("lastName")}
            disabled={isSubmitting}
            className={getValidationError("lastName") ? "border-red-500" : ""}
          />
          {getValidationError("lastName") && (
            <p className="text-sm text-red-500 mt-1">{getValidationError("lastName") as ReactNode}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Stop Number"
            value={student.stopNumber}
            onChange={handleInputChange("stopNumber")}
            disabled={isSubmitting}
            className={getValidationError("stopNumber") ? "border-red-500" : ""}
          />
          {getValidationError("stopNumber") && (
            <p className="text-sm text-red-500 mt-1">{getValidationError("stopNumber") as ReactNode}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="am"
              checked={student.amRoute}
              onCheckedChange={(checked: boolean) => handleInputChange("amRoute")(checked)}
            />
            <label htmlFor="am">AM Route</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pm"
              checked={student.pmRoute}
              onCheckedChange={(checked: boolean) => handleInputChange("pmRoute")(checked)}
            />
            <label htmlFor="pm">PM Route</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={student.active}
              onCheckedChange={(checked: boolean) => handleInputChange("active")(checked)}
            />
            <label htmlFor="active">Active</label>
          </div>
        </div>
        {getValidationError("amRoute") && (
          <p className="text-sm text-red-500 mt-1">{getValidationError("amRoute") as ReactNode}</p>
        )}

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {editingStudent ? "Saving..." : "Adding..."}
              </>
            ) : editingStudent ? (
              "Save Changes"
            ) : (
              "Add Student"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};