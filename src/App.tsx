import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
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
import i18n from './i18/i18n';

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
      <I18nextProvider i18n={i18n}>
        <MainThemeProvider>
          <ThemedApp />
        </MainThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
