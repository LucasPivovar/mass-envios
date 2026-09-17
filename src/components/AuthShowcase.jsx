export default function AuthShowcase() {
  return <section className="authShowcase auth-showcase-light">
    <div className="auth-particles" aria-hidden="true">
      {[ [9, 16, 5], [27, 9, 3], [56, 17, 6], [83, 11, 4], [92, 30, 3], [14, 34, 3], [76, 40, 4], [7, 67, 4], [28, 78, 6], [53, 87, 3], [79, 73, 5], [93, 91, 4] ].map(([x, y, size], index) => (
        <span key={index} style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDelay: `${-index * 1.3}s`, animationDuration: `${12 + index % 5 * 2}s` }} />
      ))}
    </div>
    <div className="auth-showcase-copy">
      <span className="auth-eyebrow">AUTOMAÇÃO PARA WHATSAPP</span>
      <h1>Disparos que seguem<br /><em>o seu fluxo.</em></h1>
      <p>Organize campanhas, automações e resultados em uma central feita para a sua operação.</p>
    </div>
  </section>;
}
