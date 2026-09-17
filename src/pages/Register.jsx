import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShowcase from '../components/AuthShowcase';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    await new Promise(resolve => window.setTimeout(resolve, 400));
    setLoading(false);
    navigate('/plans');
  }

  return (
    <div className="auth-outer login-screen register-screen auth-refined">
      <div className="authShell">
        <AuthShowcase />
        <section className="auth-container auth-decorated">
          <img className="auth-product-logo" src="/metaflow-logo.png" alt="MetaFlow" />
          <h2 className="login-welcome">Crie sua conta</h2>
          <p className="auth-description">Preencha seus dados para começar.</p>
          <form onSubmit={submit}>
            <div className="input-group">
              <label htmlFor="signup-name">Nome completo</label>
              <input id="signup-name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Como podemos chamar você?" />
            </div>
            <div className="input-group">
              <label htmlFor="signup-email">E-mail</label>
              <input id="signup-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@empresa.com" />
            </div>
            <div className="input-group">
              <label htmlFor="signup-password">Senha</label>
              <div className="auth-password">
                <input id="signup-password" type={visible ? 'text' : 'password'} autoComplete="new-password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Pelo menos 8 caracteres" />
                <button className="eye-btn" type="button" onClick={() => setVisible(!visible)}>{visible ? 'Ocultar' : 'Mostrar'}</button>
              </div>
            </div>
            <button className="auth-primary" type="submit" disabled={loading}>{loading ? 'Criando sua conta…' : 'Registrar'}</button>
          </form>
          <Link className="auth-login-back secondary" to="/login">Voltar ao login</Link>
        </section>
      </div>
    </div>
  );
}
