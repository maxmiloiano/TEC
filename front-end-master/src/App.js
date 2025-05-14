import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ExamsPage from './pages/ExamsPage';
import QuestionsPage from "./pages/QuestionsPage";
import StudentsPage from "./pages/StudentsPage";


import StudentDashboard from "./pages/StudentDashboard";
import Test1 from "./pages/test"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/test1" element={<Test1/>} />
      </Routes>
    </Router>
  );
}

export default App;
