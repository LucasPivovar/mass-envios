const KEY = 'metaflow-flow-library-v1';
export function readFlowStore() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { flows: [], assignments: {} };
  const value = JSON.parse(raw);
  if (!Array.isArray(value.flows) || !value.assignments) throw new Error('Biblioteca de flows inválida.');
  return value;
}
export function saveFlow(flow) {
  const store = readFlowStore();
  const saved = { ...flow, updatedAt: new Date().toISOString() };
  store.flows = [...store.flows.filter(item => item.id !== flow.id), saved];
  localStorage.setItem(KEY, JSON.stringify(store));
  return saved;
}
export function assignFlow(campaignId, flow) {
  const store = readFlowStore();
  if (flow) {
    if (!store.flows.some(item => item.id === flow.id)) store.flows.push(flow);
    store.assignments[campaignId] = flow.id;
  } else delete store.assignments[campaignId];
  localStorage.setItem(KEY, JSON.stringify(store));
}
