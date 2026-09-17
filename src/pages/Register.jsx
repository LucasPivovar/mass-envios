import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShowcase from '../components/AuthShowcase';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!created) return undefined;
    const redirect = window.setTimeout(() => navigate('/plans'), 3000);
    const ticker = window.setInterval(() => setCountdown(value => Math.max(1, value - 1)), 1000);
    return () => { window.clearTimeout(redirect); window.clearInterval(ticker); };
  }, [created, navigate]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    await new Promise(resolve => window.setTimeout(resolve, 650));
    setLoading(false);
    setCreated(true);
  }

  return <div className="auth-outer login-screen register-screen auth-refined"><div className="authShell">
    <AuthShowcase />
    <section className="auth-container auth-decorated">
      {created ? <div className="signup-success" role="status">
        <span className="signup-success-icon">✓</span>
        <img className="auth-product-logo" src="/metaflow-logo.png" alt="MetaFlow" />
        <h2>Conta criada com sucesso!</h2>
        <p>Seu acesso está pronto. Agora escolha o plano ideal para sua operação.</p>
        <strong>Redirecionando em {countdown}s</strong>
        <span className="signup-countdown"><i /></span>
      </div> : <>
        <img className="auth-product-logo" src="/metaflow-logo.png" alt="MetaFlow" />
        <h2 className="login-welcome">Crie sua conta</h2>
        <p className="auth-description">Preencha seus dados para começar.</p>
        <form onSubmit={submit}>
          <div className="input-group"><label htmlFor="signup-name">Nome completo</label><input id="signup-name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Como podemos chamar você?" /></div>
          <div className="input-group"><label htmlFor="signup-email">E-mail</label><input id="signup-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@empresa.com" /></div>
          <div className="input-group"><label htmlFor="signup-password">Senha</label><div className="auth-password"><input id="signup-password" type={visible ? 'text' : 'password'} autoComplete="new-password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Pelo menos 8 caracteres" /><button className="eye-btn" type="button" onClick={() => setVisible(!visible)}>{visible ? 'Ocultar' : 'Mostrar'}</button></div></div>
          <button className="auth-primary" type="submit" disabled={loading}>{loading ? 'Criando sua conta…' : 'Registrar'}</button>
        </form>
        <Link className="auth-login-back secondary" to="/login">Voltar ao login</Link>
      </>}
    </section>
  </div></div>;
}
