import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../infrastructure/supabase/supabase';
import { ArrowLeft, CheckCircle, XCircle, User, CreditCard, Car, FileText } from 'lucide-react';
import './ReviewInstructorPage.css';

export default function ReviewInstructorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => {
    fetchInstructor();
  }, [id]);

  const fetchInstructor = async () => {
    try {
      const { data, error } = await supabase
        .from('instructor')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setInstructor(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao buscar instrutor');
      navigate('/pending');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!window.confirm('Tem certeza que deseja APROVAR este instrutor? Ele terá acesso imediato ao aplicativo.')) return;
    
    try {
      const { error } = await supabase
        .from('instructor')
        .update({ is_blocked: false, block_reason: null })
        .eq('id', id);

      if (error) throw error;
      alert('Instrutor aprovado com sucesso!');
      navigate('/pending');
    } catch (err) {
      alert('Erro ao aprovar: ' + err.message);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Por favor, informe o motivo da recusa.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('instructor')
        .update({ is_blocked: true, block_reason: rejectReason })
        .eq('id', id);

      if (error) throw error;
      alert('Instrutor recusado. Ele será notificado sobre o motivo.');
      navigate('/pending');
    } catch (err) {
      alert('Erro ao recusar: ' + err.message);
    }
  };

  if (loading) return <div className="loading-state">Carregando perfil...</div>;
  if (!instructor) return null;

  return (
    <div className="review-container">
      <button className="btn-back" onClick={() => navigate('/pending')}>
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="review-header">
        <h1>Analisar Instrutor</h1>
        <div className="actions">
          {showRejectInput ? (
            <div className="reject-box">
              <input 
                type="text" 
                placeholder="Motivo da recusa (Ex: CNH ilegível)"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <button className="btn-confirm-reject" onClick={handleReject}>Confirmar Recusa</button>
              <button className="btn-cancel" onClick={() => setShowRejectInput(false)}>Cancelar</button>
            </div>
          ) : (
            <>
              <button className="btn-reject" onClick={() => setShowRejectInput(true)}>
                <XCircle size={20} /> Recusar
              </button>
              <button className="btn-approve" onClick={handleApprove}>
                <CheckCircle size={20} /> Aprovar Perfil
              </button>
            </>
          )}
        </div>
      </div>

      <div className="review-grid">
        <div className="card-info">
          <h2><User size={20} /> Dados Pessoais</h2>
          <div className="info-row"><span>Nome:</span> {instructor.name} {instructor.last_name}</div>
          <div className="info-row"><span>CPF:</span> {instructor.cpf}</div>
          <div className="info-row"><span>RG:</span> {instructor.rg}</div>
          <div className="info-row"><span>E-mail:</span> {instructor.email}</div>
          <div className="info-row"><span>Telefone:</span> {instructor.phone}</div>
          <div className="info-row"><span>Nascimento:</span> {new Date(instructor.birth_date).toLocaleDateString()}</div>
        </div>

        <div className="card-info">
          <h2><Car size={20} /> Detalhes da Habilitação</h2>
          <div className="info-row"><span>CNH:</span> {instructor.driver_license}</div>
          <div className="info-row"><span>Categoria:</span> {instructor.license_category}</div>
          <div className="info-row"><span>Chave Pix:</span> {instructor.pix_key}</div>
        </div>

        <div className="card-docs">
          <h2><FileText size={20} /> Documentos Enviados</h2>
          <p>Clique para visualizar os arquivos enviados pelo instrutor.</p>
          
          <div className="docs-list">
            <a href={instructor.doc_cnh_url} target="_blank" rel="noreferrer" className="doc-item">
              <FileText size={24} /> <span>Foto da CNH</span>
            </a>
            <a href={instructor.doc_certificate_url} target="_blank" rel="noreferrer" className="doc-item">
              <FileText size={24} /> <span>Certificado de Instrutor</span>
            </a>
            <a href={instructor.doc_criminal_tj_url} target="_blank" rel="noreferrer" className="doc-item">
              <FileText size={24} /> <span>Antecedentes TJ</span>
            </a>
            <a href={instructor.doc_criminal_fed_url} target="_blank" rel="noreferrer" className="doc-item">
              <FileText size={24} /> <span>Antecedentes Federais</span>
            </a>
            <a href={instructor.doc_cnpj_url} target="_blank" rel="noreferrer" className="doc-item">
              <FileText size={24} /> <span>Comprovante CNPJ</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
