import React, { useEffect, useState } from 'react';
import axios from 'axios';

const STORAGE = 'metaflow-template-drafts';
const emptyDraft = () => ({ name: '', category: 'UTILITY', body: '', accounts: [] });
export default function Templates({ token }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE) || '[]'); } catch { return []; } });
  const [accounts, setAccounts] = useState([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/twilio-accounts`, { headers: { Authorization: `Bearer ${token}` } }).then(r => setAccounts(r.data)).catch(() => setError('Não foi possível carregar as contas. Tente novamente.'));
  }, [token]);
  useEffect(() => { if (!open) return; const close = e => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [open]);
  function save(event) {
    event.preventDefault();
    if (!draft.accounts.length) { setError('Selecione pelo menos uma conta.'); return; }
    const next = [...items, { ...draft, id: crypto.randomUUID(), status: 'Preparado para aprovação' }];
    try { localStorage.setItem(STORAGE, JSON.stringify(next)); setItems(next); setOpen(false); } catch { setError('Não foi possível salvar. Verifique o armazenamento do navegador.'); }
  }
  return <div className="templates-page"><header className="templates-header"><div><h1>Templates</h1><p>Prepare mensagens e selecione as contas de WhatsApp para aprovação.</p></div><button onClick={() => { setDraft(emptyDraft()); setError(''); setOpen(true); }}>+ Novo template</button></header>
    <p className="template-notice">Demonstração: os templates ficam salvos neste navegador. O envio para aprovação será conectado à integração.</p>
    {error && !open && <p role="alert" className="error-message">{error}</p>}
    {items.length ? <div className="template-grid">{items.map(item => <article className="template-card" key={item.id}><span className="badge">{item.category === 'UTILITY' ? 'Utility' : 'Marketing'}</span><h2>{item.name}</h2><p className="template-body">{item.body}</p><p>{item.accounts.length} conta(s) selecionada(s)</p><small>{item.status}</small></article>)}</div> : <section className="template-card"><h2>Suas mensagens começam aqui</h2><p>Crie um template Utility ou Marketing, revise o conteúdo e escolha as contas.</p></section>}
    {open && <div className="template-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}><section role="dialog" aria-modal="true" aria-labelledby="template-title" className="template-modal"><h2 id="template-title">Novo template</h2><form onSubmit={save}>
      <label htmlFor="template-name">Nome</label><input id="template-name" autoFocus required pattern="[a-z0-9_]+" title="Use letras minúsculas, números e sublinhado" placeholder="aviso_de_pedido" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
      <label htmlFor="template-category">Categoria</label><select id="template-category" value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}><option value="UTILITY">Utility — atualizações e avisos</option><option value="MARKETING">Marketing — ofertas e campanhas</option></select>
      <label htmlFor="template-body">Mensagem</label><textarea id="template-body" required rows={5} maxLength={1024} value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} placeholder="Olá, {{1}}! Seu pedido foi atualizado." />
      <fieldset><legend>Contas para aprovação</legend>{accounts.map(account => <label className="template-account" key={account.id}><input type="checkbox" checked={draft.accounts.includes(account.id)} onChange={e => setDraft({ ...draft, accounts: e.target.checked ? [...draft.accounts, account.id] : draft.accounts.filter(id => id !== account.id) })} />{account.friendly_name}</label>)}{!accounts.length && <p>Cadastre uma conta em Configurações para continuar.</p>}</fieldset>
      {error && <p role="alert" className="error-message">{error}</p>}<div className="template-actions"><button className="danger" type="button" onClick={() => setOpen(false)}>Cancelar</button><button type="submit" disabled={!accounts.length}>Preparar aprovação</button></div>
    </form></section></div>}
  </div>;
}
