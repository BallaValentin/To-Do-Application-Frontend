import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';
import { ToDoDetailsPage } from './pages/ToDoDetailsPage';
import { ToDoUpdatePage } from './pages/ToDoUpdatePage';
import { ToDoCreatePage } from './pages/ToDoCreatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<ToDoDetailsPage />} />
        <Route path="/todos/update/:id" element={<ToDoUpdatePage />} />
        <Route path="/todos/create" element={<ToDoCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
