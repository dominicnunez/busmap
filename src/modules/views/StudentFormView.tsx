import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentDataGrid } from '../components/StudentDataGrid';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const StudentFormView: FC = () => {
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
      <StudentDataGrid onEdit={(id: string) => navigate(`/student/${id}`)} />
    </div>
  );
};