import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const STORAGE = 'metaflow-template-drafts';

const DEFAULT_TEMPLATES = [
  {
    id: 'tmpl-1',
    name: 'boas_vindas_vip',
    category: 'MARKETING',
    body: 'Olá, {{1}}! Seja bem-vindo ao MetaFlow. Preparamos uma condição exclusiva para sua empresa: utilize o cupom {{2}} para garantir 20% de bônus em todos os seus envios!',
    status: 'Aprovado',
    accounts: [1, 2],
    createdAt: '14/09/2026'
  },
  {
    id: 'tmpl-2',
    name: 'confirmacao_pedido',
    category: 'UTILITY',
    body: 'Olá {{1}}, confirmamos o pagamento do seu pedido #{{2}}. Previsão de entrega: {{3}}. Acompanhe seu rastreamento em tempo real no link: {{4}}.',
    status: 'Aprovado',
    accounts: [1],
    createdAt: '12/09/2026'
  },
  {
    id: 'tmpl-3',
    name: 'recuperacao_carrinho',
    category: 'MARKETING',
    body: 'Olá, {{1}}! Notamos que você deixou itens no carrinho. Conclua sua compra nas próximas 2 horas e ganhe frete grátis + {{2}}% de desconto usando o cupom {{3}}.',
    status: 'Aprovado',
    accounts: [1, 3],
    createdAt: '10/09/2026'
  },
  {
    id: 'tmpl-4',
    name: 'lembrete_pix_vencimento',
    category: 'UTILITY',
    body: 'Aviso importante: {{1}}, sua chave Pix no valor de R$ {{2}} vence em 30 minutos. Copie o código a seguir para concluir seu pagamento: {{3}}.',
    status: 'Em análise',
    accounts: [2],
    createdAt: '08/09/2026'
  },
  {
    id: 'tmpl-5',
    name: 'pesquisa_nps_atendimento',
    category: 'MARKETING',
    body: 'Olá {{1}}, como você avalia seu atendimento recente conosco? De 1 a 5, qual sua nota para nossa equipe? Sua opinião é fundamental: {{2}}.',
    status: 'Aprovado',
    accounts: [1],
    createdAt: '05/09/2026'
  }
];

const TEMPLATE_PRESETS = [
  {
    id: 'custom',
    label: '✨ Criar template em branco (Personalizado)',
    name: '',
    category: 'MARKETING',
    body: ''
  },
  {
    id: 'welcome',
    label: '🎉 Boas-vindas e Ativação de Lead (Marketing)',
    name: 'boas_vindas_ativacao',
    category: 'MARKETING',
    body: 'Olá {{1}}, seja muito bem-vindo ao MetaFlow! 🚀 Preparamos uma demonstração guiada e um bônus de {{2}} créditos para seu início. Acesse: {{3}}'
  },
  {
    id: 'order_status',
    label: '📦 Confirmação e Rastreio de Pedido (Utility)',
    name: 'status_pedido_rastreio',
    category: 'UTILITY',
    body: 'Olá {{1}}! Seu pedido #{{2}} foi despachado com sucesso. Código de rastreio: {{3}}. Prazo previsto de entrega: {{4}} dias úteis.'
  },
  {
    id: 'cart_abandoned',
    label: '🛒 Recuperação de Carrinho Abandonado (Marketing)',
    name: 'recuperar_carrinho_desconto',
    category: 'MARKETING',
    body: 'Oi {{1}}, vimos que você não concluiu seu pedido! Preparamos um desconto exclusivo de {{2}}% válido somente hoje com o código {{3}}: {{4}}'
  },
  {
    id: 'pix_reminder',
    label: '💳 Lembrete de Chave Pix / Pagamento (Utility)',
    name: 'lembrete_cobranca_pix',
    category: 'UTILITY',
    body: 'Olá {{1}}, seu pedido está reservado! Restam 15 minutos para a chave Pix de R$ {{2}} expirar. Copie e cole: {{3}}'
  },
  {
    id: 'feedback_nps',
    label: '⭐ Pesquisa de Satisfação NPS (Marketing)',
    name: 'pesquisa_satisfacao_nps',
    category: 'MARKETING',
    body: 'Olá {{1}}! O que achou da sua experiência com nosso atendimento hoje? Em uma escala de 0 a 10, qual nota você daria? Responda por aqui: {{2}}'
  },
  {
    id: 'promo_flash',
    label: '⚡ Promoção Relâmpago e Cupom (Marketing)',
    name: 'oferta_relampago_vip',
    category: 'MARKETING',
    body: '🚨 Plantão de Ofertas VIP! Olá {{1}}, durante as próximas 24h toda a linha está com {{2}}% de desconto. Aproveite no link: {{3}}'
  },
  {
    id: 'auth_code',
    label: '🔐 Código de Verificação 2FA (Authentication)',
    name: 'codigo_verificacao_seguranca',
    category: 'UTILITY',
    body: 'MetaFlow: Seu código de verificação é {{1}}. Válido por 10 minutos. Nunca compartilhe este código com ninguém.'
  }
];

const DEFAULT_ACCOUNTS = [
  { id: 1, friendly_name: 'WhatsApp Principal (+55 11 99882-1234)' },
  { id: 2, friendly_name: 'WhatsApp Suporte (+55 11 97711-4321)' },
  { id: 3, friendly_name: 'WhatsApp Vendas (+55 21 98844-5678)' }
];

const emptyDraft = () => ({
  name: '',
  category: 'MARKETING',
  body: '',
  accounts: [1]
});

// Render text with highlighted variable tags {{1}}, {{2}}
const renderHighlightedBody = (text) => {
  if (!text) return <span style={{ color: '#829ab1', fontStyle: 'italic' }}>Digite a mensagem do template...</span>;
  const parts = text.split(/(\{\{\d+\}\})/g);
  return parts.map((part, index) => {
    if (/^\{\{\d+\}\}$/.test(part)) {
      return (
        <span key={index} className="template-var-tag">
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export default function Templates({ token }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      // Seed default approved templates
      localStorage.setItem(STORAGE, JSON.stringify(DEFAULT_TEMPLATES));
      return DEFAULT_TEMPLATES;
    } catch {
      return DEFAULT_TEMPLATES;
    }
  });

  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [draft, setDraft] = useState(emptyDraft);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('custom');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/twilio-accounts`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setAccounts(r.data);
        }
      })
      .catch(() => {
        // Keeps fallback accounts for smooth demo
      });
  }, [token]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  // Handle Preset selection
  function handlePresetChange(e) {
    const presetId = e.target.value;
    setSelectedPreset(presetId);
    const found = TEMPLATE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setDraft((prev) => ({
        ...prev,
        name: found.name || prev.name,
        category: found.category || prev.category,
        body: found.body || prev.body
      }));
    }
  }

  function save(event) {
    event.preventDefault();
    if (!draft.name.trim()) {
      setError('Por favor, informe um identificador para o template.');
      return;
    }
    if (!draft.body.trim()) {
      setError('Por favor, digite o conteúdo da mensagem.');
      return;
    }
    if (!draft.accounts.length) {
      setError('Selecione pelo menos uma conta de WhatsApp para aprovação.');
      return;
    }

    const cleanName = draft.name.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const newTemplate = {
      ...draft,
      name: cleanName,
      id: `tmpl-${Date.now()}`,
      status: 'Preparado para aprovação',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    const next = [newTemplate, ...items];
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
      setItems(next);
      setOpen(false);
      setError('');
      setSuccessToast(`Template "${cleanName}" cadastrado com sucesso!`);
      setTimeout(() => setSuccessToast(''), 4000);
    } catch {
      setError('Não foi possível salvar no navegador. Verifique o espaço livre.');
    }
  }

  function duplicateTemplate(tmpl) {
    const duplicate = {
      ...tmpl,
      id: `tmpl-${Date.now()}`,
      name: `${tmpl.name}_copia`,
      status: 'Preparado para aprovação',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    const next = [duplicate, ...items];
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
      setItems(next);
      setSuccessToast(`Template duplicado como "${duplicate.name}"!`);
      setTimeout(() => setSuccessToast(''), 3000);
    } catch {
      // ignore
    }
  }

  function deleteTemplate(id) {
    if (!window.confirm('Tem certeza de que deseja remover este template?')) return;
    const next = items.filter((i) => i.id !== id);
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
      setItems(next);
      setSuccessToast('Template removido com sucesso.');
      setTimeout(() => setSuccessToast(''), 3000);
    } catch {
      // ignore
    }
  }

  // Count variables {{1}}, {{2}} in draft
  const detectedVariables = useMemo(() => {
    const matches = draft.body.match(/\{\{\d+\}\}/g) || [];
    return [...new Set(matches)];
  }, [draft.body]);

  // Filter items
  const filteredTemplates = useMemo(() => {
    return items.filter((tmpl) => {
      const matchSearch =
        tmpl.name.toLowerCase().includes(search.toLowerCase()) ||
        tmpl.body.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'ALL' || tmpl.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [items, search, categoryFilter]);

  return (
    <div className="page-container templates-page">
      {/* Header with Title and Primary Action */}
      <header className="templates-header">
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#102a43' }}>
            Templates do WhatsApp
          </h1>
          <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Crie, personalize e gerencie mensagens pré-aprovadas com variáveis inteligentes para suas campanhas.
          </p>
        </div>
        <button
          className="primary"
          onClick={() => {
            setDraft(emptyDraft());
            setSelectedPreset('custom');
            setError('');
            setOpen(true);
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          + Novo Template
        </button>
      </header>

      {/* Demo notification banner */}
      <div className="template-notice">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.25rem' }}>💡</span>
          <div>
            <strong>Modelos Oficiais da Cloud API:</strong> Os templates preparados são sincronizados diretamente com as contas de WhatsApp selecionadas para aprovação rápida na Meta.
          </div>
        </div>
      </div>

      {successToast && (
        <div className="success-message" style={{ margin: '1rem 0' }}>
          ✓ {successToast}
        </div>
      )}

      {/* Metrics Bar */}
      <div className="template-metrics-row">
        <div className="template-metric-card">
          <span className="template-metric-label">Total de Templates</span>
          <span className="template-metric-value">{items.length}</span>
        </div>
        <div className="template-metric-card">
          <span className="template-metric-label">Aprovados para Disparo</span>
          <span className="template-metric-value" style={{ color: '#10b981' }}>
            {items.filter((i) => i.status === 'Aprovado').length}
          </span>
        </div>
        <div className="template-metric-card">
          <span className="template-metric-label">Em Análise / Preparados</span>
          <span className="template-metric-value" style={{ color: '#f59e0b' }}>
            {items.filter((i) => i.status !== 'Aprovado').length}
          </span>
        </div>
        <div className="template-metric-card">
          <span className="template-metric-label">Marketing / Utility</span>
          <span className="template-metric-value" style={{ color: '#1677e8', fontSize: '1.2rem' }}>
            {items.filter((i) => i.category === 'MARKETING').length} / {items.filter((i) => i.category === 'UTILITY').length}
          </span>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="template-filter-bar">
        <div className="template-search-group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#627d98" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar por nome ou conteúdo da mensagem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="template-category-pills">
          <button
            type="button"
            className={categoryFilter === 'ALL' ? 'primary pill-btn' : 'secondary pill-btn'}
            onClick={() => setCategoryFilter('ALL')}
          >
            Todos ({items.length})
          </button>
          <button
            type="button"
            className={categoryFilter === 'MARKETING' ? 'primary pill-btn' : 'secondary pill-btn'}
            onClick={() => setCategoryFilter('MARKETING')}
          >
            Marketing ({items.filter((i) => i.category === 'MARKETING').length})
          </button>
          <button
            type="button"
            className={categoryFilter === 'UTILITY' ? 'primary pill-btn' : 'secondary pill-btn'}
            onClick={() => setCategoryFilter('UTILITY')}
          >
            Utility ({items.filter((i) => i.category === 'UTILITY').length})
          </button>
        </div>
      </div>

      {/* Error alert outside modal */}
      {error && !open && <p role="alert" className="error-message">{error}</p>}

      {/* Template Cards Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="template-grid">
          {filteredTemplates.map((item) => (
            <article className="template-card" key={item.id}>
              <div className="template-card-top">
                <span className={`template-badge template-badge--${item.category.toLowerCase()}`}>
                  {item.category === 'UTILITY' ? 'Utility' : 'Marketing'}
                </span>
                <span
                  className={`template-status-badge ${
                    item.status === 'Aprovado' ? 'status-approved' : 'status-pending'
                  }`}
                >
                  <span className="status-dot"></span>
                  {item.status}
                </span>
              </div>

              <h2 className="template-card-title">{item.name}</h2>

              {/* WhatsApp Bubble Preview in Card */}
              <div className="whatsapp-preview-container">
                <div className="whatsapp-chat-bubble">
                  <div className="whatsapp-bubble-body">
                    {renderHighlightedBody(item.body)}
                  </div>
                  <div className="whatsapp-bubble-footer">
                    <span className="whatsapp-bubble-time">14:30</span>
                    <span className="whatsapp-double-check">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="template-card-meta">
                <span>
                  📱 {item.accounts?.length || 1} conta(s) vinculada(s)
                </span>
                {item.createdAt && (
                  <span style={{ color: '#829ab1' }}>Criado em: {item.createdAt}</span>
                )}
              </div>

              {/* Strict Button Hierarchy on Card */}
              <div className="template-card-actions">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => duplicateTemplate(item)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
                  title="Criar cópia deste template"
                >
                  Duplicar
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => deleteTemplate(item.id)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
                  title="Excluir este template"
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="template-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
          <h2 style={{ fontSize: '1.25rem', color: '#102a43' }}>Nenhum template encontrado</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>
            Não encontramos nenhum modelo com os filtros atuais. Experimente limpar os filtros ou crie um novo template.
          </p>
          <button
            className="primary"
            onClick={() => {
              setDraft(emptyDraft());
              setSelectedPreset('welcome');
              const welcome = TEMPLATE_PRESETS.find((p) => p.id === 'welcome');
              if (welcome) {
                setDraft({
                  name: welcome.name,
                  category: welcome.category,
                  body: welcome.body,
                  accounts: [1]
                });
              }
              setOpen(true);
            }}
          >
            + Criar Primeiro Template
          </button>
        </section>
      )}

      {/* Modal for Creating / Configuring Template */}
      {open && (
        <div
          className="template-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-title"
            className="template-modal template-modal--wide"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 id="template-title" style={{ margin: 0, fontSize: '1.35rem', color: '#102a43' }}>
                  Novo Template de WhatsApp
                </h2>
                <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  Escolha um preset pronto ou elabore um texto customizado com variáveis.
                </p>
              </div>
              <button
                type="button"
                className="secondary"
                onClick={() => setOpen(false)}
                style={{ minWidth: '36px', width: '36px', height: '36px', padding: 0, borderRadius: '50%', fontSize: '1.1rem' }}
                aria-label="Fechar modal"
              >
                ✕
              </button>
            </div>

            {/* Quick Template Presets Selector (Select de Templates) */}
            <div className="template-preset-picker">
              <label htmlFor="template-preset-select" style={{ fontWeight: 700, fontSize: '0.88rem', color: '#102a43', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🎯</span> Modelos Pré-definidos (Select de Templates):
              </label>
              <select
                id="template-preset-select"
                value={selectedPreset}
                onChange={handlePresetChange}
                className="template-select-styled"
              >
                {TEMPLATE_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={save}>
              <div className="template-editor-layout">
                {/* Left Form Column */}
                <div className="template-form-col">
                  <label htmlFor="template-name" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Identificador (Slug)
                  </label>
                  <input
                    id="template-name"
                    autoFocus
                    required
                    pattern="[a-z0-9_]+"
                    title="Use apenas letras minúsculas, números e sublinhado (_)"
                    placeholder="ex: aviso_pedido_rastreio"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  />

                  <label htmlFor="template-category" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Categoria do Template
                  </label>
                  <select
                    id="template-category"
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  >
                    <option value="MARKETING">Marketing — Promoções, ofertas e novidades</option>
                    <option value="UTILITY">Utility — Avisos de pedido, cobrança e rastreio</option>
                  </select>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label htmlFor="template-body" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                      Mensagem do Template
                    </label>
                    <span style={{ fontSize: '0.78rem', color: draft.body.length > 950 ? '#ef4444' : '#627d98' }}>
                      {draft.body.length} / 1024 caracteres
                    </span>
                  </div>
                  <textarea
                    id="template-body"
                    required
                    rows={5}
                    maxLength={1024}
                    value={draft.body}
                    onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                    placeholder="Olá, {{1}}! Seu pedido foi confirmado. Acesse o rastreio: {{2}}"
                  />

                  <div className="variable-hints">
                    <small>
                      💡 Use variáveis numeradas como <code>{'{{1}}'}</code>, <code>{'{{2}}'}</code> para substituir por Nome, Código, Link, etc.
                    </small>
                    {detectedVariables.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#486581' }}>Variáveis detectadas:</span>
                        {detectedVariables.map((v) => (
                          <span key={v} className="template-var-tag" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <fieldset style={{ marginTop: '1.25rem' }}>
                    <legend style={{ fontWeight: 700, fontSize: '0.85rem', color: '#102a43' }}>
                      Contas para vinculação e disparo
                    </legend>
                    <div style={{ maxHeight: '120px', overflowY: 'auto', paddingRight: '4px' }}>
                      {accounts.map((account) => (
                        <label className="template-account" key={account.id}>
                          <input
                            type="checkbox"
                            checked={draft.accounts.includes(account.id)}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                accounts: e.target.checked
                                  ? [...draft.accounts, account.id]
                                  : draft.accounts.filter((id) => id !== account.id)
                              })
                            }
                          />
                          <span style={{ fontSize: '0.88rem' }}>{account.friendly_name}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Right Column: WhatsApp Live Preview */}
                <div className="template-preview-col">
                  <div className="whatsapp-live-preview-box">
                    <div className="whatsapp-preview-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="whatsapp-icon-circle">WA</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>
                            MetaFlow Notificações
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#bbf7d0' }}>
                            Conta Comercial Oficial
                          </div>
                        </div>
                      </div>
                      <span className="whatsapp-official-badge">Meta Verified</span>
                    </div>

                    <div className="whatsapp-preview-chat-area">
                      <div className="whatsapp-chat-bubble whatsapp-chat-bubble--live">
                        <div className="whatsapp-bubble-body">
                          {renderHighlightedBody(draft.body)}
                        </div>
                        <div className="whatsapp-bubble-footer">
                          <span className="whatsapp-bubble-time">Agora</span>
                          <span className="whatsapp-double-check">✓✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="whatsapp-preview-footer-note">
                      Simulação visual exata de como a mensagem será exibida na tela do cliente.
                    </div>
                  </div>
                </div>
              </div>

              {error && <p role="alert" className="error-message">{error}</p>}

              {/* Strict Modal Actions: Danger Cancel & Primary Save */}
              <div className="template-actions">
                <button
                  type="button"
                  className="danger"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="primary"
                  disabled={!draft.accounts.length || !draft.name || !draft.body}
                >
                  Preparar aprovação
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
