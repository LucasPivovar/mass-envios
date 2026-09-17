import { Link } from 'react-router-dom';

const plans = [
  { name: 'Essencial', price: 'R$ 89', description: 'Para começar seus primeiros fluxos.', features: ['5.000 disparos por mês', 'Até 3 campanhas ativas', '1 usuário', 'Relatórios essenciais'] },
  { name: 'Profissional', price: 'R$ 189', description: 'Para equipes que querem crescer.', featured: true, features: ['25.000 disparos por mês', 'Campanhas ilimitadas', 'Até 5 usuários', 'Construtor de fluxos completo', 'Relatórios avançados'] },
  { name: 'Escala', price: 'R$ 399', description: 'Para operações de alto volume.', features: ['100.000 disparos por mês', 'Campanhas ilimitadas', 'Até 15 usuários', 'Automações avançadas', 'Suporte prioritário'] }
];

export default function Plans() {
  return <main className="plans-page">
    <div className="plans-header">
      <img className="plans-logo" src="/metaflow-logo.png" alt="MetaFlow" />
      <span className="plans-kicker">ESCOLHA SEU PLANO</span>
      <h1>Um plano para cada momento da sua operação.</h1>
      <p>Esta é uma demonstração visual. Nenhuma cobrança será realizada.</p>
    </div>
    <section className="plans-grid" aria-label="Planos disponíveis">
      {plans.map(plan => <article className={`plan-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
        {plan.featured && <span className="plan-badge">Mais escolhido</span>}
        <h2>{plan.name}</h2><p>{plan.description}</p>
        <div className="plan-price"><strong>{plan.price}</strong><span>/mês</span></div>
        <ul>{plan.features.map(feature => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
        <Link className={plan.featured ? 'primary plan-button' : 'secondary plan-button'} to="/login">Escolher {plan.name}</Link>
      </article>)}
    </section>
    <Link className="plans-back" to="/login">Voltar ao login</Link>
  </main>;
}
