import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';
import { ToDoDetailsPage } from './pages/ToDoDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<ToDoDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
