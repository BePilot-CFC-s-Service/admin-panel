import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './presentation/layouts/AdminLayout';
import DashboardPage from './presentation/pages/PendingValidation/DashboardPage';
import ReviewInstructorPage from './presentation/pages/PendingValidation/ReviewInstructorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Redireciona a raiz para as pendências */}
        <Route index element={<Navigate to="/pending" replace />} />
        
        {/* Rotas de Validação */}
        <Route path="/pending" element={<DashboardPage />} />
        <Route path="/pending/:id" element={<ReviewInstructorPage />} />
        
        {/* Outras rotas futuras */}
        <Route path="/active" element={<div style={{padding: '32px'}}>Página de Instrutores Ativos (Em breve)</div>} />
      </Route>
    </Routes>
  );
}

export default App;
