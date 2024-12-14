import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<div>Todo with id</div>} />
      </Routes>
    </Router>
  );
}

export default App;
