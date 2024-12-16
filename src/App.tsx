import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { StudentManagementView } from "./modules/views/StudentManagementView";
import { StudentFormView } from "./modules/views/StudentFormView";

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Toaster richColors closeButton position="top-center"/>
        <Routes>
          <Route path="/" element={<StudentManagementView />} />
          <Route path="/student/new" element={<StudentFormView />} />
          <Route path="/student/:id" element={<StudentFormView />} />
        </Routes>
    </div>
  );
}

export default App;