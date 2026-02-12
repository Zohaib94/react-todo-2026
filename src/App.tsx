import React from 'react';

import { Route, Routes } from 'react-router';
import TodosPage from './pages/Todos';
import TodoPage from './pages/Todo';

function App() {
  return (
    <Routes>
      <Route path="/todos/:id" element={<TodoPage />} />
      <Route path="/" element={<TodosPage />} />
    </Routes>
  );
}

export default App;
