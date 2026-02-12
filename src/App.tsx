import React from 'react';

import { Route, Routes } from 'react-router';
import ProductsPage from './pages/Products';
import ProductPage from './pages/Product';

function App() {
  return (
    <Routes>
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/" element={<ProductsPage />} />
    </Routes>
  );
}

export default App;
