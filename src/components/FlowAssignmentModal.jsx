import { useEffect, useRef, useState } from 'react';
import { assignFlow, readFlowStore } from '../flowStore';

export default function FlowAssignmentModal({ campaign, onClose, onSaved, onOpenBuilder }) {
  const dialog = useRef(null);
  const [library] = useState(() => { try { return readFlowStore(); } catch { return { flows: [], assignments: {} }; } });
  const [mode, setMode] = useState(() => { try { return readFlowStore().flows.length ? 'existing' : 'new'; } catch { return 'new'; } });
  const [selected, setSelected] = useState(() => { try { return readFlowStore().assignments[campaign.id] || ''; } catch { return ''; } });
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    dialog.current.showModal();
  }, []);
  function save(openBuilder = false) {
    const flow = mode === 'new'
      ? { id: crypto.randomUUID(), name: name.trim(), nodes: [], edges: [], updatedAt: new Date().toISOString() }
      : library.flows.find(item => item.id === selected);
    if (!flow || !flow.name) { setError('Informe o nome ou selecione um flow.'); return; }
    try { assignFlow(campaign.id, flow); onSaved(); if (openBuilder) onOpenBuilder(flow.id); else onClose(); }
    catch { setError('Não foi possível salvar. Verifique o armazenamento do navegador.'); }
  }
  return <dialog ref={dialog} className="mf-dialog" onCancel={onClose} onClick={e => { if (e.target === dialog.current) onClose(); }} aria-labelledby="flow-dialog-title">
    <form onSubmit={e => { e.preventDefault(); save(); }}>
      <h2 id="flow-dialog-title">Definir flow</h2><p className="muted">Campanha: {campaign.name}</p>
      <div className="segmented-control" aria-label="Origem do flow"><button type="button" className="secondary" aria-pressed={mode === 'existing'} onClick={() => setMode('existing')}>Selecionar existente</button><button type="button" className="secondary" aria-pressed={mode === 'new'} onClick={() => setMode('new')}>Criar novo</button></div>
      {mode === 'new' ? <div className="input-group"><label htmlFor="flow-name">Nome do flow</label><input id="flow-name" type="text" maxLength={80} required value={name} onChange={e => setName(e.target.value)} placeholder="Ex.: Boas-vindas aos novos clientes" /></div> : <div className="input-group"><label htmlFor="flow-choice">Flow salvo</label><select id="flow-choice" required value={selected} onChange={e => setSelected(e.target.value)}><option value="">Selecione um flow</option>{library.flows.map(flow => <option key={flow.id} value={flow.id}>{flow.name}</option>)}</select>{!library.flows.length && <p className="muted">Ainda não há flows salvos. Use “Criar novo”.</p>}</div>}
      <p className="muted">Salvar vincula o flow à campanha. Abra o builder para editar as etapas. Flows reutilizados compartilham as mesmas alterações.</p>
      {error && <p role="alert" className="error-message">{error}</p>}
      <div className="dialog-actions"><button type="button" className="danger" onClick={onClose}>Cancelar</button><button type="button" className="secondary" onClick={() => save(true)}>Salvar e abrir builder</button><button type="submit" className="primary">Salvar vínculo</button></div>
    </form>
  </dialog>;
}
