import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { StudentList } from "./pages/StudentList";
import { StudentForm } from "./pages/StudentForm";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Toaster richColors closeButton position="top-center"/>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/new" element={<StudentForm />} />
          <Route path="/student/:id" element={<StudentForm />} />
        </Routes>
    </div>
  );
}
