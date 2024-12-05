import { useState } from 'react';
import { StudentTable } from './components/tables/StudentTable';
import { AddStudent } from './components/modals/AddStudent';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function App() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const handleAddStudent = (newStudent) => {
    if (editStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student, index) =>
          index == editStudent.index ? newStudent : student
        )
      );
      setEditStudent(null);
    } else {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  }
  setIsAddStudentOpen(false);
};

  const handleEditStudent = (index) => {
    setEditStudent({ ...students[index], index });
    setIsAddStudentOpen(true);
  };

  const handleDeleteStudent = (index) => {
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BusMap</h1>
        <Button onClick={() => setIsAddStudentOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      <StudentTable students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent}/>
      <AddStudent open={isAddStudentOpen} onClose={() => {setIsAddStudentOpen(false); setEditStudent(null)}} onAdd={handleAddStudent} editStudent={editStudent}/>
    </div>
  );
}