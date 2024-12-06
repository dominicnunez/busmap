import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription } from "@radix-ui/react-dialog";

export function LinkSiblings({
  open,
  onClose,
  onLink,
  students,
  currentStudent,
  mode = "dropdown", // "dropdown" or "checkbox"
}) {
  const [selectedSiblings, setSelectedSiblings] = useState([]);

  const availableStudents = students.filter(
    (s) =>
      s.id !== currentStudent?.id &&
      !(currentStudent?.siblings || []).includes(s.id)
  );

  const handleSiblingSelect = (selectedId) => {
    onLink(currentStudent.id, selectedId);
    onClose();
  };

  const handleCheckboxChange = (checked, studentId) => {
    setSelectedSiblings((prev) =>
      checked ? [...prev, studentId] : prev.filter((id) => id !== studentId)
    );
  };

  const handleDone = () => {
    if (selectedSiblings.length > 0) {
      onLink(currentStudent.id, selectedSiblings);
    }
    setSelectedSiblings([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link Siblings</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>
              first and last name, stop number, and AM/PM routing
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        {mode === "dropdown" ? (
          <Select onValueChange={handleSiblingSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select sibling" />
            </SelectTrigger>
            <SelectContent>
              {availableStudents.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="space-y-4">
            {availableStudents.map((student) => (
              <div key={student.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSiblings.includes(student.id)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, student.id)
                  }
                />
                <span>
                  {student.firstName} {student.lastName}
                </span>
              </div>
            ))}
            <Button onClick={handleDone} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

LinkSiblings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLink: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
  currentStudent: PropTypes.object,
  mode: PropTypes.oneOf(["dropdown", "checkbox"]),
};
