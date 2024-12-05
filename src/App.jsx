import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BusMap</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
    </div>
  );
}