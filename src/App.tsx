import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>List of todos</div>} />
        <Route path="/todos/:id" element={<div>Todo with id</div>} />
      </Routes>
    </Router>
  );
}

export default App;
