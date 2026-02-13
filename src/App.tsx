import React from 'react';

import { Route, Routes } from 'react-router';
import TodosPage from './pages/Todos';
import TodoPage from './pages/Todo';
import NewTodoPage from './pages/NewTodo';
import EditTodoPage from './pages/EditTodo';

function App() {
  return (
    <Routes>
      <Route path="/todos/new" element={<NewTodoPage />} />
      <Route path="/todos/:id/edit" element={<EditTodoPage />} />
      <Route path="/todos/:id" element={<TodoPage />} />
      <Route path="/" element={<TodosPage />} />
    </Routes>
  );
}

export default App;
