import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  addStudent,
  editStudent as editStudentAction,
} from "@/store/studentSlice";

export function AddStudent({ open, onClose, editId }) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const editStudent = students.find((s) => s.id === editId);

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
    if (editStudent) {
      setStudent({
        ...editStudent,
        siblings: editStudent.siblings ?? [],
      });
    } else {
      setStudent({
        id: null,
        firstName: "",
        lastName: "",
        stopNumber: "",
        amRoute: true,
        pmRoute: true,
        siblings: [],
        active: true,
      });
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStudent) {
      dispatch(
        editStudentAction({
          updatedStudent: student,
          originalStudent: editStudent,
        })
      );
    } else {
      dispatch(addStudent(student));
    }
    setStudent({
      id: null,
      firstName: "",
      lastName: "",
      stopNumber: "",
      amRoute: true,
      pmRoute: true,
      siblings: [],
      active: true,
    });
    onClose();
  };

  const handleOverlayClick = (event) => {
    // Prevent the dialog from closing when clicking outside
    event.preventDefault();
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onInteractOutside={handleOverlayClick}>
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>
              first and last name, stop number, and AM/PM routing
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
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
          <Button type="submit" className="w-full">
            {editStudent ? "Save Changes" : "Add Student"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddStudent.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editId: PropTypes.string,
};
