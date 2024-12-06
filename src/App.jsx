import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
        prevStudents.map((student) =>
          student.id === editStudent.id ? { ...newStudent, id: student.id } : student
        )
      );
      setEditStudent(null);
    } else {
      setStudents((prevStudents) => [...prevStudents, { ...newStudent, id: uuidv4() }]);
    }
    setIsAddStudentOpen(false);
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditStudent(studentToEdit);
    setIsAddStudentOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
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
      <StudentTable 
        students={students} 
        onEdit={handleEditStudent} 
        onDelete={handleDeleteStudent}
      />
      <AddStudent 
        open={isAddStudentOpen} 
        onClose={() => {
          setIsAddStudentOpen(false);
          setEditStudent(null);
        }}
        onAdd={handleAddStudent}
        editStudent={editStudent}
      />
    </div>
  );
}