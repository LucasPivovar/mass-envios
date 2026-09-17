import KpiCard from '../components/KpiCard';
import React, { useState, useEffect } from 'react';

const Financeiro = () => {
  // Dados simulados
  const [balance] = useState(12450.00);
  const [spent] = useState(3420.50);
  const [plan] = useState('Plano Pro (100k Disparos)');
  const [renewalDate] = useState('15/10/2026');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const transactions = [
    { id: 1, date: '10/08/2026', description: 'Recarga de Créditos', amount: -500.00, status: 'Concluído' },
    { id: 2, date: '01/08/2026', description: 'Assinatura Mensal MetaFlow', amount: -299.90, status: 'Concluído' },
    { id: 3, date: '28/07/2026', description: 'Bônus Promocional', amount: 150.00, status: 'Creditado' },
    { id: 4, date: '15/07/2026', description: 'Recarga de Créditos', amount: -500.00, status: 'Concluído' },
    { id: 5, date: '10/07/2026', description: 'Estorno de Envio Com Erro', amount: 45.80, status: 'Creditado' },
    { id: 6, date: '01/07/2026', description: 'Assinatura Mensal MetaFlow', amount: -299.90, status: 'Concluído' },
    { id: 7, date: '18/06/2026', description: 'Recarga de Créditos', amount: -250.00, status: 'Concluído' }
  ];

  // Filtering transactions
  const filteredTransactions = transactions.filter(t => {
    const descMatch = t.description.toLowerCase().includes(search.toLowerCase());
    const statusMatch = !statusFilter || t.status === statusFilter;
    return descMatch && statusMatch;
  });

  // Calculate total pages
  const totalPages = Math.max(Math.ceil(filteredTransactions.length / itemsPerPage), 1);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="page-container">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1>Financeiro</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', margin: 0 }}>
          Gerencie seu saldo, assinaturas e acompanhe o histórico de transações.
        </p>
      </div>

<div className="kpi-grid kpi-grid--financial">
<KpiCard label="Saldo atual (créditos)" value={balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon="money" />
<KpiCard label="Gasto no mês" value={spent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon="chart" tone="purple" />
<KpiCard label="Plano atual" value={plan} detail={`Renova em ${renewalDate}`} icon="plan" tone="amber" />
<KpiCard label="Custo por disparo" value="R$ 0,08" detail="Baseado no último ciclo" icon="money" tone="cyan" />
</div>
      {/* Progress & limits */}
      <div style={{ ...styles.statCard, marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Consumo do Plano</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>14.280 de 100.000 disparos inclusos usados</p>
          </div>
          <span style={{ fontWeight: '700', color: '#1677e8' }}>14%</span>
        </div>
        <div style={{ height: '8px', background: '#eaf3ff', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ width: '14%', height: '100%', background: '#1677e8', borderRadius: '99px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <button className="primary" style={{ width: 'fit-content' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Adicionar Créditos
        </button>
        <button className="secondary" style={{ width: 'fit-content' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Baixar Relatório Fiscal
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Histórico de Transações</h2>
        
        {/* Filters Section */}
        <div style={styles.filterSection}>
          <div style={styles.filterInputGroup}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar transações..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="no-border-input"
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterInputGroup}>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="no-border-select"
              style={styles.selectFilter}
            >
              <option value="">Status: Todos</option>
              <option value="Concluído">Concluído</option>
              <option value="Creditado">Creditado</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map(t => (
              <tr key={t.id}>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.date}</td>
                <td style={{ fontWeight: '600' }}>{t.description}</td>
                <td style={{ 
                  color: t.amount > 0 ? '#34d399' : '#f87171', 
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  fontSize: '1rem'
                }}>
                  {t.amount > 0 ? '+' : ''}R$ {Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <span className="badge" style={{ 
                    background: t.status === 'Concluído' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                    color: t.status === 'Concluído' ? '#34d399' : '#ffffff',
                    border: t.status === 'Concluído' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-secondary)' }}>
                  Nenhuma transação encontrada para o filtro atual.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && (
          <div style={styles.paginationContainer}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="secondary"
              style={styles.paginationBtn}
              aria-label="Página anterior"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <span style={styles.paginationInfo}>
              Página {currentPage} de {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="secondary"
              style={styles.paginationBtn}
              aria-label="Próxima página"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '1rem',
    marginBottom: '2.5rem'
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid rgba(11,61,145,0.14)',
    borderRadius: '14px',
    padding: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    boxShadow: 'var(--shadow-sm)',
    transition: 'border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease'
  },
  statIconContainer: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    background: '#eaf3ff',
    border: '1px solid rgba(22,119,232,0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    display: 'block',
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    fontWeight: '700',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '6px'
  },
  statVal: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#102a43',
    letterSpacing: '-0.02em'
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  filterInputGroup: {
    display: 'flex',
    alignItems: 'center',
    background: '#ffffff',
    border: '1px solid var(--border-glass)',
    borderRadius: '8px',
    padding: '0.4rem 0.75rem',
    minWidth: '180px'
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
    padding: '0.15rem 0.25rem',
    fontSize: '0.85rem'
  },
  selectFilter: {
    border: 'none',
    background: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
    cursor: 'pointer',
    fontSize: '0.85rem',
    padding: '0.15rem 0'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.25rem',
    padding: '1rem',
    borderTop: '1px solid var(--border-glass)',
    background: '#f7faff'
  },
  paginationBtn: {
    padding: '0.45rem',
    fontSize: '1.2rem',
    borderRadius: '8px',
    boxShadow: 'none',
    minWidth: '42px',
    width: '42px',
    height: '38px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationInfo: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  }
};

export default Financeiro;
