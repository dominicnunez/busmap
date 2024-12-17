import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { StudentManagement } from "@/modules/views/StudentManagement";
import { StudentForm } from "@/modules/views/StudentForm";

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Toaster richColors closeButton position="top-center"/>
        <Routes>
          <Route path="/" element={<StudentManagement />} />
          <Route path="/student/new" element={<StudentForm />} />
          <Route path="/student/:id" element={<StudentForm />} />
        </Routes>
    </div>
  );
}

export default App;