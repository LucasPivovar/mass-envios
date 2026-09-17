export default function AuthShowcase() {
  return (
    <section className="authShowcase auth-showcase-light" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Dot Matrix Background */}
      <div className="auth-dot-matrix" aria-hidden="true" />

      {/* Ambient Animated Glowing Blobs ("manchas que se movem") */}
      <div className="auth-ambient-orb auth-ambient-orb--1" aria-hidden="true" />
      <div className="auth-ambient-orb auth-ambient-orb--2" aria-hidden="true" />
      <div className="auth-ambient-orb auth-ambient-orb--3" aria-hidden="true" />

      {/* Subtle Floating Particles */}
      <div className="auth-particles" aria-hidden="true">
        {[
          [9, 16, 5], [27, 9, 3], [56, 17, 6], [83, 11, 4],
          [92, 30, 3], [14, 34, 3], [76, 40, 4], [7, 67, 4],
          [28, 78, 6], [53, 87, 3], [79, 73, 5], [93, 91, 4]
        ].map(([x, y, size], index) => (
          <span
            key={index}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              animationDelay: `${-index * 1.3}s`,
              animationDuration: `${12 + (index % 5) * 2}s`
            }}
          />
        ))}
      </div>

      <div className="auth-showcase-copy" style={{ position: 'relative', zIndex: 2 }}>
        <span className="auth-eyebrow">AUTOMAÇÃO PARA WHATSAPP</span>
        <h1>Disparos que seguem<br /><em>o seu fluxo.</em></h1>
        <p>Organize campanhas, automações e resultados em uma central feita para a sua operação.</p>

        {/* Modern Interactive Tech Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.75rem' }}>
          <div className="auth-floating-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>99.4% Taxa de Entrega</span>
          </div>
          <div className="auth-floating-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Multi-contas Cloud API</span>
          </div>
        </div>
      </div>
    </section>
  );
}
