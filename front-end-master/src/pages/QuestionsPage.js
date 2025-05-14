import React, { useState } from "react";
import "../AdminQuestions.css";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

function QuestionsPage() {
  const [questions, setQuestions] = useState([
    
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [newQuestion, setNewQuestion] = useState({
    id: "",
    type: "",
    question: "",
    answers: "",
  });

  const navigate = useNavigate();

  const filteredQuestions = questions.filter((q) => {
    const search = searchTerm.toLowerCase();
  
    return (
      q.id.toString().includes(search) ||
      q.type.toLowerCase().includes(search) ||
      q.question.toLowerCase().includes(search) ||
      q.answers.toString().includes(search)
    );
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing
      const updated = [...questions];
      updated[editIndex] = {
        ...newQuestion,
        id: parseInt(newQuestion.id),
        answers: parseInt(newQuestion.answers),
      };
      setQuestions(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new
      setQuestions(prev => [
        ...prev,
        {
          ...newQuestion,
          id: parseInt(newQuestion.id),
          answers: parseInt(newQuestion.answers),
        },
      ]);
    }
    setNewQuestion({ id: "", type: "", question: "", answers: "" });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleEdit = (index) => {
    const q = questions[index];
    setNewQuestion({
      id: q.id,
      type: q.type,
      question: q.question,
      answers: q.answers,
    });
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
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
          <button className="nav-btn" onClick={() => navigate(questions)}>Questions</button>
          <button className="nav-btn" onClick={() => navigate("/students")}>Students</button>

          
          
        </nav>
        <div className="admin-info">
          <strong>ADMIN</strong>
          <span>JOHN DOE</span>
        </div>
      </header>

      <main className="admin-content">
        <h2 className="page-title">All Questions</h2>
        <div className="exam-actions">
          <button className="add-btn" onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setNewQuestion({ id: "", type: "", question: "", answers: "" });
          }}>
            + Add a Question
          </button>
          <div className="filter-search">
            <button className="filter-btn"><FaFilter /> <span>▼</span></button>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-bar"
                placeholder="Search questions"
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
              <input type="number" name="id" value={newQuestion.id} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <label>Type:</label>
              <input type="text" name="type" value={newQuestion.type} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <label>Question:</label>
              <input type="text" name="question" value={newQuestion.question} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <label>Answer Choices:</label>
              <input type="number" name="answers" value={newQuestion.answers} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="add-btn">{isEditing ? "Update" : "Simpan"}</button>
          </form>
        )}

        <table className="exam-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Question</th>
              <th>Answer Choices</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, idx) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.type}</td>
                <td>{q.question}</td>
                <td>{q.answers}</td>
                <td>
                  <button className="edit-btn yellow" onClick={() => handleEdit(idx)}><FaEdit /></button>
                  <button className="delete-btn red" onClick={() => handleDelete(idx)}><FaTrash /></button>
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

export default QuestionsPage;
