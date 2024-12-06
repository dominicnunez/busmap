import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StudentTable } from './components/tables/StudentTable';
import { AddStudent } from './components/modals/AddStudent';
import { LinkSiblings } from './components/modals/LinkSiblings';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function App() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isLinkSiblingsOpen, setIsLinkSiblingsOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (newStudent) => {
    if (editStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) => {
          if (student.id === editStudent.id) {
            // Update the edited student
            return { ...newStudent, id: student.id };
          }
          // Update sibling references for other students
          if (newStudent.siblings?.includes(student.id)) {
            return {
              ...student,
              siblings: [...(student.siblings || []), editStudent.id]
            };
          }
          // Remove sibling reference if it was removed from edited student
          if (student.siblings?.includes(editStudent.id) && !newStudent.siblings?.includes(student.id)) {
            return {
              ...student,
              siblings: student.siblings.filter(id => id !== editStudent.id)
            };
          }
          return student;
        })
      );
      setEditStudent(null);
    } else {
      const newId = uuidv4();
      setStudents((prevStudents) => {
        const newStudentWithId = { ...newStudent, id: newId };
        const updatedStudents = prevStudents.map(student => {
          if (newStudent.siblings?.includes(student.id)) {
            return {
              ...student,
              siblings: [...(student.siblings || []), newId]
            };
          }
          return student;
        });
        return [...updatedStudents, newStudentWithId];
      });
    }
    setIsAddStudentOpen(false);
  };

  const handleLinkSiblings = (studentId, siblingId) => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            siblings: [...new Set([...(student.siblings || []), siblingId])]
          };
        }
        if (student.id === siblingId) {
          return {
            ...student,
            siblings: [...new Set([...(student.siblings || []), studentId])]
          };
        }
        return student;
      })
    );
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditStudent(studentToEdit);
    setIsAddStudentOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map(student => ({
        ...student,
        siblings: (student.siblings || []).filter(siblingId => siblingId !== id)
      }));
      return updatedStudents.filter((student) => student.id !== id);
    });
  };

  const handleOpenLinkSiblings = (student) => {
    setCurrentStudent(student);
    setIsLinkSiblingsOpen(true);
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
        onLinkSiblings={handleOpenLinkSiblings}
      />
      <AddStudent
        open={isAddStudentOpen}
        onClose={() => {
          setIsAddStudentOpen(false);
          setEditStudent(null);
        }}
        onAdd={handleAddStudent}
        editStudent={editStudent}
        students={students}
      />
      <LinkSiblings
        open={isLinkSiblingsOpen}
        onClose={() => {
          setIsLinkSiblingsOpen(false);
          setCurrentStudent(null);
        }}
        onLink={handleLinkSiblings}
        students={students}
        currentStudent={currentStudent}
      />
    </div>
  );
}