import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { TodoListPage } from './pages/TodoListPage';
import { ToDoDetailsPage } from './pages/ToDoDetailsPage';
import { ToDoUpdatePage } from './pages/ToDoUpdatePage';
import { ToDoCreatePage } from './pages/ToDoCreatePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { UserListPage } from './pages/UserListPage';
import themes from './theme/themes';
import { MainThemeProvider, useTheme } from './context/MainThemeProvider';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchInterval: 30000,
    },
  },
});

function ThemedApp() {
  const { themeName } = useTheme(); // Hozzáférés a dinamikus themeName-hez

  return (
    <ThemeProvider theme={themes[themeName]}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todos/:id" element={<ToDoDetailsPage />} />
          <Route path="/todos/update/:id" element={<ToDoUpdatePage />} />
          <Route path="/todos/create" element={<ToDoCreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainThemeProvider>
        <ThemedApp />
      </MainThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
