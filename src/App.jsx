import { useState } from 'react';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { StudentTable } from './components/tables/StudentTable';
import { AddStudent } from './components/modals/AddStudent';
// import { LinkSiblings } from './components/modals/LinkSiblings';

export default function App() {
  const closedModal = { isOpen: false, studentId: null }

  const [studentModalData, setStudentModalData] = useState(closedModal);
  // const [siblingModalData, setSiblingModalData] = useState(closedModal);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BusMap</h1>
        <Button onClick={() => setStudentModalData({ isOpen: true, studentId: null })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      <StudentTable
        onEdit={(id) => setStudentModalData({ isOpen: true, studentId: id })}
      />
      <AddStudent
        isOpen={studentModalData.isOpen}
        onClose={() => setStudentModalData(closedModal)}
      />
      {/* <LinkSiblings
        isOpen={siblingModalData.isOpen}
        onClose={() => setSiblingModalData(closedModal)}
      /> */}
    </div>
  );
}