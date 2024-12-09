import { useState } from 'react';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { StudentTable } from './components/tables/StudentTable';
import { AddStudent } from './components/modals/AddStudent';
import { LinkSiblings } from './components/modals/LinkSiblings';

export default function App() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isLinkSiblingsOpen, setIsLinkSiblingsOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  const handleEdit = (id) => {
    setEditStudent(id);
    setIsAddStudentOpen(true);
  }

  const handleCloseAddStudent = () => {
    setIsAddStudentOpen(false);
    setEditStudent(null);
  }

  const handleCloseLinkSiblings = () => {
    setIsLinkSiblingsOpen(false);
    setCurrentStudent(null);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BusMap</h1>
        <Button onClick={() => setIsAddStudentOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      <StudentTable
        onEdit={handleEdit}
      />
      <AddStudent
        open={isAddStudentOpen}
        onClose={handleCloseAddStudent}
        editId={editStudent}
      />
      <LinkSiblings
        open={isLinkSiblingsOpen}
        onClose={handleCloseLinkSiblings}
        currentStudent={currentStudent}
      />
    </div>
  );
}