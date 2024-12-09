import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { linkSiblings } from "@/store/studentSlice";

export function LinkSiblings({ open, onClose, currentStudent }) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);

  const availableStudents = students.filter(
    (s) =>
      s.id !== currentStudent?.id &&
      !(currentStudent?.siblings || []).includes(s.id)
  );

  const handleSiblingSelect = (selectedId) => {
    dispatch(
      linkSiblings({
        studentId: currentStudent.id,
        siblingIds: [selectedId],
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link Siblings</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>
              Select a student to link as sibling
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}

LinkSiblings.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentStudent: PropTypes.object,
};
