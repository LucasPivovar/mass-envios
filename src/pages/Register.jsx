import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Register({ onLogin }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    setError('');
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/register`, { username: name.trim(), email: email.trim(), password, plan });
      if (!response.data.token) throw new Error('Não foi possível concluir seu cadastro.');
      onLogin(response.data.token);
    } catch (err) { setError(err.response?.data?.message || err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-outer login-screen register-screen auth-refined"><div className="authShell">
    <section className="authShowcase"><div className="login-brand"><img src="/metaflow-mark.svg" width="36" height="36" alt="" /><strong>MetaFlow</strong></div><img className="auth-illustration" src="/auth-flow.svg" alt="Mensagens conectadas a campanhas e resultados" /><h1>Conecte sua mensagem.<br />Amplie seu alcance.</h1><p>Organize seus contatos e campanhas de WhatsApp em um só lugar.</p></section>
    <section className="auth-container"><div className="login-brand"><img src="/metaflow-mark.svg" width="36" height="36" alt="" /><strong>MetaFlow</strong></div><h2 className="login-welcome">{step === 1 ? 'Crie sua conta' : 'Escolha seu plano'}</h2><p className="auth-description">{step === 1 ? 'Preencha seus dados para começar.' : 'Selecione a opção para sua operação.'}</p>
      <ol className="signup-steps"><li aria-current={step === 1 ? 'step' : undefined}>1. Seus dados</li><li aria-current={step === 2 ? 'step' : undefined}>2. Seu plano</li></ol>
      <form onSubmit={submit}>{step === 1 ? <>
        <div className="input-group"><label htmlFor="signup-name">Nome completo</label><input id="signup-name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Como podemos chamar você?" /></div>
        <div className="input-group"><label htmlFor="signup-email">E-mail</label><input id="signup-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@empresa.com" /></div>
        <div className="input-group"><label htmlFor="signup-password">Senha</label><div className="auth-password"><input id="signup-password" type={visible ? 'text' : 'password'} autoComplete="new-password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Pelo menos 8 caracteres" /><button className="eye-btn" type="button" onClick={() => setVisible(!visible)}>{visible ? 'Ocultar' : 'Mostrar'}</button></div></div>
      </> : <fieldset className="signup-plans"><legend>Plano disponível</legend><label className="signup-plan"><input type="radio" name="plan" value="pro" checked={plan === 'pro'} onChange={e => setPlan(e.target.value)} required /><span><strong>Plano Pro</strong><small>Contatos, campanhas e relatórios em uma central.</small><small>Valores e condições a definir. Nenhuma cobrança nesta demonstração.</small></span></label></fieldset>}
        {error && <p role="alert" className="error-message">{error}</p>}<button className="auth-primary" type="submit" disabled={loading}>{loading ? 'Criando sua conta…' : step === 1 ? 'Escolher plano →' : 'Concluir cadastro'}</button>{step === 2 && <button className="auth-back" type="button" disabled={loading} onClick={() => { setStep(1); setError(''); }}>Voltar aos meus dados</button>}
      </form><p className="auth-footer">Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </section></div></div>;
}
