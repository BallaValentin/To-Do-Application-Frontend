import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoListPage } from './pages/TodoListPage';
import { ToDoDetailsPage } from './pages/ToDoDetailsPage';
import { ToDoUpdatePage } from './pages/ToDoUpdatePage';
import { ToDoCreatePage } from './pages/ToDoCreatePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchInterval: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todos/:id" element={<ToDoDetailsPage />} />
          <Route path="/todos/update/:id" element={<ToDoUpdatePage />} />
          <Route path="/todos/create" element={<ToDoCreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
