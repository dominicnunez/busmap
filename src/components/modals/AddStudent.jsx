import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function AddStudent({ open, onClose, onAdd, editStudent }) {
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
      if (editStudent) {
        setStudent({
          ...editStudent,
          siblings: editStudent.siblings ?? []
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

  const handleChange = (field) => (e) => {
    setStudent((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckboxChange = (field) => (checked) => {
    setStudent((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(student);
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
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
  onAdd: PropTypes.func.isRequired,
  editStudent: PropTypes.object,
};
