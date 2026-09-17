const paths = {
  contacts: <><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 4v3"/></>,
  send: <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>,
  chart: <path d="M5 20V10m7 10V4m7 16v-7"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  money: <><path d="M12 2v20M18 6H9a4 4 0 0 0 0 8h6a3 3 0 0 1 0 6H5"/></>,
  plan: <><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M8 6V3h8v3M3 12h18"/></>
};
export default function KpiCard({ label, value, detail, tone = 'blue', icon = 'chart' }) {
  return <article className="kpi-card"><span className={`kpi-icon kpi-icon--${tone}`}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[icon] || paths.chart}</svg></span><div className="kpi-copy"><h2 className="kpi-label">{label}</h2><p className="kpi-value">{value}</p>{detail && <p className="kpi-detail">{detail}</p>}</div></article>;
}
