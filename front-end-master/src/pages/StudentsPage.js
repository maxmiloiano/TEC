import React, { useState } from "react";
import "../AdminStudents.css";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

function StudentsPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [studentForm, setStudentForm] = useState({
    id: "",
    fullName: "",
    npm: "",
    email: "",
  });

  const filteredStudents = students.filter(student =>
    student.id.toString().includes(searchTerm.toLowerCase()) ||
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.npm.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId === null) {
      // Menambahkan siswa baru
      setStudents(prev => [...prev, { ...studentForm, id: parseInt(studentForm.id) }]);
    } else {
      // Edit siswa
      setStudents(prev =>
        prev.map(s => (s.id === editingId ? { ...studentForm, id: editingId } : s))
      );
    }

    setStudentForm({ id: "", fullName: "", npm: "", email: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setStudentForm({ ...student });
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="logo-title">
          <img src="/logoukdc.png" alt="Logo" className="dashboard-logo" />
          <h1>TEC UKDC</h1>
        </div>
        <nav className="admin-nav">
          <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/exams")}>Exams</button>
          <button className="nav-btn" onClick={() => navigate("/questions")}>Questions</button>
          <button className="nav-btn active">Students</button>
        </nav>
        <div className="admin-info">
          <strong>ADMIN</strong>
          <span>JOHN DOE</span>
        </div>
      </header>

      <main className="admin-content">
        <h2 className="page-title">All Students</h2>
        <div className="exam-actions">
          <button className="add-btn" onClick={() => {
            setStudentForm({ id: "", fullName: "", npm: "", email: "" });
            setEditingId(null);
            setShowForm(true);
          }}>+ Add a Student</button>

          <div className="filter-search">
            <button className="filter-btn"><FaFilter /> <span>▼</span></button>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-bar"
                placeholder="Search students"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {showForm && (
          <form className="question-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>ID:</label>
              <input
                type="number"
                name="id"
                value={studentForm.id}
                onChange={handleInputChange}
                required
                disabled={editingId !== null} // ID tidak bisa diubah saat edit
              />
            </div>
            <div className="form-row">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={studentForm.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>NPM:</label>
              <input
                type="text"
                name="npm"
                value={studentForm.npm}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={studentForm.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="add-btn">
              {editingId === null ? "Simpan" : "Update"}
            </button>
          </form>
        )}

        <table className="exam-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>NPM</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.fullName}</td>
                <td>{student.npm}</td>
                <td>{student.email}</td>
                <td>
                  <button className="edit-btn yellow" onClick={() => handleEdit(student)}><FaEdit /></button>
                  <button className="delete-btn red" onClick={() => handleDelete(student.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <div className="page-buttons">
            <button className="page-btn">«</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn">»</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentsPage;
