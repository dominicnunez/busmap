import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StudentTable({ students, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stop #</TableHead>
              <TableHead>AM</TableHead>
              <TableHead>PM</TableHead>
              <TableHead>Siblings</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id ? student.id.slice(0, 8) : ''}</TableCell>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.stopNumber}</TableCell>
                  <TableCell>{student.amRoute ? '✓' : '✗'}</TableCell>
                  <TableCell>{student.pmRoute ? '✓' : '✗'}</TableCell>
                  <TableCell className="hover:cursor-pointer hover:text-blue-600">
                    {student.siblings?.length || 0}
                  </TableCell>
                  <TableCell>{student.active ? '✓' : '✗'}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => onEdit(student.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};