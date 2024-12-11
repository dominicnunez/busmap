import { useNavigate } from 'react-router-dom';
import { StudentTable } from '../components/tables/StudentTable';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function StudentList() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bus Map</h1>
        <Button onClick={() => navigate('/student/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      <StudentTable onEdit={(id) => navigate(`/student/${id}`)} />
    </div>
  );
}