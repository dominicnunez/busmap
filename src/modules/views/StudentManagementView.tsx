import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentDataGrid } from '../components/StudentDataGrid';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const StudentManagementView: FC = () => {
  const navigate = useNavigate();

  const handleAddStudent = (): void => {
    navigate('/student/new');
  };

  const handleEditStudent = (id: string): void => {
    navigate(`/student/${id}`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bus Map</h1>
        <Button onClick={handleAddStudent}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      <StudentDataGrid onEdit={handleEditStudent} />
    </div>
  );
};