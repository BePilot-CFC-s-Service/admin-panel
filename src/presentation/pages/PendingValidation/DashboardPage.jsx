import React, { useEffect, useState } from 'react';
import { supabase } from '../../../infrastructure/supabase/supabase';
import { Eye, Clock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

export default function DashboardPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingInstructors();
  }, []);

  const fetchPendingInstructors = async () => {
    try {
      setLoading(true);
      // Busca todos os instrutores que estão bloqueados (pendentes de aprovação)
      const { data, error } = await supabase
        .from('instructor')
        .select('*')
        .eq('is_blocked', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInstructors(data || []);
    } catch (error) {
      console.error('Erro ao buscar instrutores:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Validações Pendentes</h1>
        <p>Analise os documentos dos novos instrutores para liberar o acesso à plataforma.</p>
      </div>

      <div className="table-card">
        {loading ? (
          <div className="loading-state">Carregando fila...</div>
        ) : instructors.length === 0 ? (
          <div className="empty-state">
            <ShieldCheck size={48} color="#D1D5DB" />
            <p>Nenhuma validação pendente no momento.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome do Instrutor</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Data do Cadastro</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((inst) => (
                <tr key={inst.id}>
                  <td className="bold-cell">{inst.name} {inst.last_name}</td>
                  <td>{inst.cpf}</td>
                  <td>{inst.email}</td>
                  <td>{formatDate(inst.created_at)}</td>
                  <td>
                    <span className="status-badge pending">
                      <Clock size={14} /> Em Análise
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-review"
                      onClick={() => navigate(`/pending/${inst.id}`)}
                    >
                      <Eye size={16} /> Analisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
