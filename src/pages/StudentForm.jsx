import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useStudentFormValidation } from "../hooks/useStudentFormValidation";
import { useErrorManager, ErrorTypes } from "../hooks/useErrorManager";
import { addStudent, editStudent as editStudentAction } from "@/store/studentSlice";

export function StudentForm() {
  const { validateField, validateStudent, getValidationError } = useStudentFormValidation();
  const { setError, clearAllErrors, getError } = useErrorManager();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const editingStudent = students.find((s) => s.id === id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [student, setStudent] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStudent(student)) {
      setIsSubmitting(false);
      toast.error("Please fix all errors in the form before submitting.");
      return;
    }
    
    clearAllErrors();
    setIsSubmitting(true);
    
    try {
      const isDuplicate = students.some(
        (existingStudent) =>
          existingStudent.firstName.toLowerCase() === student.firstName.toLowerCase() &&
          existingStudent.lastName.toLowerCase() === student.lastName.toLowerCase() &&
          existingStudent.id !== editingStudent?.id
      );

      if (isDuplicate) {
        throw new Error("A student with this name already exists");
      }

      if (editingStudent) {
        await dispatch(
          editStudentAction({
            updatedStudent: student,
            originalStudent: editingStudent,
          })
        );
        toast.success(`${student.firstName} ${student.lastName} updated successfully`);
      } else {
        await dispatch(addStudent(student));
        toast.success(`${student.firstName} ${student.lastName} added successfully`);
      }
      navigate("/");
    } catch (err) {
      setError(ErrorTypes.API, null, err.message || "Failed to save student");
      toast.error(err.message || "Failed to save student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, isCheckbox = false) => (e) => {
    const value = isCheckbox ? e : e.target.value;
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

      {getError(ErrorTypes.API) && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{getError(ErrorTypes.API)}</AlertDescription>
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
            <p className="text-sm text-red-500 mt-1">{getValidationError("firstName")}</p>
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
            <p className="text-sm text-red-500 mt-1">{getValidationError("lastName")}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Stop Number"
            value={student.stopNumber}
            onChange={handleInputChange("stopNumber")}
            disabled={isSubmitting}
            className={
              (getValidationError("stopNumber") || getError(ErrorTypes.INPUT, "stopNumber"))
                ? "border-red-500"
                : ""
            }
          />
          {(getValidationError("stopNumber") || getError(ErrorTypes.INPUT, "stopNumber")) && (
            <p className="text-sm text-red-500 mt-1">
              {getValidationError("stopNumber") || getError(ErrorTypes.INPUT, "stopNumber")}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="am"
              checked={student.amRoute}
              onCheckedChange={handleInputChange("amRoute", true)}
            />
            <label htmlFor="am">AM Route</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pm"
              checked={student.pmRoute}
              onCheckedChange={handleInputChange("pmRoute", true)}
            />
            <label htmlFor="pm">PM Route</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={student.active}
              onCheckedChange={handleInputChange("active", true)}
            />
            <label htmlFor="active">Active</label>
          </div>
        </div>
        {getValidationError("amRoute") && (
          <p className="text-sm text-red-500 mt-1">{getValidationError("amRoute")}</p>
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
}