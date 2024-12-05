import { useState } from 'react';
import { StudentTable } from './components/tables/StudentTable';
import { AddStudent } from './components/modals/AddStudent';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function App() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
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
      <StudentTable students={students}/>
      <AddStudent open={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} onAdd={handleAddStudent} />
    </div>
  );
}