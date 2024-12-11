import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addStudent, editStudent as editStudentAction } from "@/store/studentSlice";

export function StudentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector(state => state.students.students);
  const editingStudent = students.find(s => s.id === id);

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

  const availableStudents = students.filter(
    (s) => s.id !== student.id && !student.siblings?.includes(s.id)
  );

  const linkedSiblings = students.filter((s) =>
    student.siblings?.includes(s.id)
  );

  useEffect(() => {
    if (editingStudent) {
      setStudent({
        ...editingStudent,
        siblings: editingStudent.siblings ?? [],
      });
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      dispatch(
        editStudentAction({
          updatedStudent: student,
          originalStudent: editingStudent,
        })
      );
    } else {
      dispatch(addStudent(student));
    }
    navigate('/');
  };

  const handleChange = (field) => (e) => {
    setStudent((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckboxChange = (field) => (checked) => {
    setStudent((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSiblingSelect = (selectedId) => {
    setStudent((prev) => ({
      ...prev,
      siblings: [...prev.siblings, selectedId],
    }));
  };

  const handleRemoveSibling = (siblingId) => {
    setStudent((prev) => ({
      ...prev,
      siblings: prev.siblings.filter((id) => id !== siblingId),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>← Back</Button>
        <h1 className="text-2xl font-bold mt-4">
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="First Name"
          value={student.firstName}
          onChange={handleChange("firstName")}
          required
        />
        <Input
          placeholder="Last Name"
          value={student.lastName}
          onChange={handleChange("lastName")}
          required
        />
        <Input
          type="number"
          placeholder="Stop Number"
          value={student.stopNumber}
          onChange={handleChange("stopNumber")}
          required
        />
        {availableStudents.length > 0 && (
          <Select onValueChange={handleSiblingSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Link sibling" />
            </SelectTrigger>
            <SelectContent>
              {availableStudents.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {linkedSiblings.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Linked Siblings:</div>
            <div className="flex flex-wrap gap-2">
              {linkedSiblings.map((sibling) => (
                <div
                  key={sibling.id}
                  className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1"
                >
                  <span>
                    {sibling.firstName} {sibling.lastName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSibling(sibling.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="am"
              checked={student.amRoute}
              onCheckedChange={handleCheckboxChange("amRoute")}
            />
            <label htmlFor="am">AM Route</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pm"
              checked={student.pmRoute}
              onCheckedChange={handleCheckboxChange("pmRoute")}
            />
            <label htmlFor="pm">PM Route</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={student.active}
              onCheckedChange={handleCheckboxChange("active")}
            />
            <label htmlFor="active">Active</label>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {editingStudent ? "Save Changes" : "Add Student"}
          </Button>
        </div>
      </form>
    </div>
  );
}