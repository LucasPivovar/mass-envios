const benefits = [
  {
    title: 'Tudo em um só lugar',
    text: 'Organize contatos, campanhas e resultados em uma única central.',
    icon: <path d="M4 5h16v11H8l-4 4V5Zm4 4h8M8 12h5" />
  },
  {
    title: 'Ganhe tempo na rotina',
    text: 'Monte fluxos visuais e deixe sua operação pronta para escalar.',
    icon: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />
  },
  {
    title: 'Acompanhe resultados',
    text: 'Visualize entregas, leituras e desempenho de cada campanha.',
    icon: <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />
  }
];

export default function AuthShowcase() {
  return <section className="authShowcase auth-showcase-light">
    <div className="login-brand auth-showcase-brand"><img src="/metaflow-mark.svg" width="38" height="38" alt="" /><strong>MetaFlow</strong></div>
    <div className="auth-showcase-copy">
      <span className="auth-eyebrow">AUTOMAÇÃO PARA WHATSAPP</span>
      <h1>Disparos que seguem<br /><em>o seu fluxo.</em></h1>
      <p>Organize campanhas, automações e resultados em uma central feita para a sua operação.</p>
    </div>
    <div className="auth-benefits">
      {benefits.map(item => <article className="auth-benefit" key={item.title}>
        <span className="auth-benefit-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{item.icon}</svg></span>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
      </article>)}
    </div>
  </section>;
}
