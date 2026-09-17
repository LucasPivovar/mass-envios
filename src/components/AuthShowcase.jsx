export default function AuthShowcase() {
  return (
    <section className="authShowcase auth-showcase-blue">
      {/* Floating Light Particles on Blue Background */}
      <div className="auth-particles" aria-hidden="true">
        {[
          [9, 16, 5], [27, 9, 3], [56, 17, 6], [83, 11, 4],
          [92, 30, 3], [14, 34, 3], [76, 40, 4], [7, 67, 4],
          [28, 78, 6], [53, 87, 3], [79, 73, 5], [93, 91, 4],
          [42, 50, 4], [68, 62, 5], [18, 88, 3], [85, 82, 4]
        ].map(([x, y, size], index) => (
          <span
            key={index}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              animationDelay: `${-index * 1.1}s`,
              animationDuration: `${10 + (index % 5) * 2.5}s`
            }}
          />
        ))}
      </div>

      <div className="auth-showcase-content">
        <div className="auth-showcase-copy">
          <span className="auth-eyebrow">AUTOMAÇÃO PARA WHATSAPP</span>
          <h1>Disparos que seguem<br /><em>o seu fluxo.</em></h1>
          <p>Organize campanhas, automações e resultados em uma central feita para a sua operação.</p>
        </div>

        {/* 3 Glassmorphism Feature Cards Side by Side */}
        <div className="auth-glass-cards">
          <div className="auth-glass-card">
            <div className="auth-glass-top">
              <div className="auth-glass-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L4.737 8.36a.5.5 0 0 0-.61-.61l5.783-9.394 4.221 4.22z"/>
                </svg>
              </div>
              <span className="auth-glass-pill">Cloud API</span>
            </div>
            <h4 className="auth-glass-title">Disparo em Massa</h4>
            <p className="auth-glass-desc">Alta entrega com rotatividade inteligente e múltiplos números.</p>
          </div>

          <div className="auth-glass-card">
            <div className="auth-glass-top">
              <div className="auth-glass-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z"/>
                </svg>
              </div>
              <span className="auth-glass-pill">Automação</span>
            </div>
            <h4 className="auth-glass-title">Fluxos & Bots</h4>
            <p className="auth-glass-desc">Respostas automáticas com botões e árvores sem código.</p>
          </div>

          <div className="auth-glass-card">
            <div className="auth-glass-top">
              <div className="auth-glass-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                </svg>
              </div>
              <span className="auth-glass-pill">Tempo Real</span>
            </div>
            <h4 className="auth-glass-title">Métricas ao Vivo</h4>
            <p className="auth-glass-desc">Rastreamento de leituras, engajamento e relatórios de conversão.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
