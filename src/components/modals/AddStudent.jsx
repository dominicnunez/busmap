import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogDescription } from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export function AddStudent({ open, onClose, onAdd, editStudent }) {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    stopNumber: ''
  });

  useEffect(() => {
    if (editStudent) {
        setStudent({
            firstName: editStudent.firstName,
            lastName: editStudent.lastName,
            stopNumber: editStudent.stopNumber
        })
    } else {
        setStudent({
            firstName: '',
            lastName: '',
            stopNumber: ''
        })
    }
    }, [editStudent])

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(student);
    setStudent({ firstName: '', lastName: '', stopNumber: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add Student</DialogTitle>
                <VisuallyHidden.Root>
                    <DialogDescription>Add Student</DialogDescription>
                </VisuallyHidden.Root>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="First Name"
                value={student.firstName}
                onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
                required
            />
            <Input
                placeholder="Last Name"
                value={student.lastName}
                onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
                required
            />
            <Input
                type="number"
                placeholder="Stop Number"
                value={student.stopNumber}
                onChange={(e) => setStudent({ ...student, stopNumber: e.target.value })}
                required
            />
            <Button type="submit" className="w-full">{editStudent ? "Save Changes" : "Add Student"}</Button>
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