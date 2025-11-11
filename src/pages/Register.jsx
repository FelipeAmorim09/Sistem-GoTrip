import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setMensagem('As senhas não coincidem!');
      return;
    }

    // ✅ SALVAR NO LOCALSTORAGE
    try {
      // Recuperar usuários existentes
      const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Verificar se email já existe
      const emailJaExiste = usuariosExistentes.some(user => user.email === formData.email);
      if (emailJaExiste) {
        setMensagem('Este email já está cadastrado!');
        return;
      }

      // Criar novo usuário
      const novoUsuario = {
        id: Date.now(), // ID único
        name: formData.name,
        email: formData.email,
        password: formData.password, // ⚠️ Em app real, isso seria criptografado
        dataCadastro: new Date().toISOString()
      };

      // Adicionar à lista e salvar
      usuariosExistentes.push(novoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

      setMensagem('✅ Cadastro realizado com sucesso!');
      
      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Redirecionar para lista de usuários após 2 segundos
      setTimeout(() => {
        navigate('/admin/usuarios');
      }, 2000);

    } catch (error) {
      setMensagem('❌ Erro ao salvar usuário. Tente novamente.');
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <div className="register-page">
      <Header />
      
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Criar Conta</h2>
                
                {mensagem && (
                  <div className={`alert ${mensagem.includes('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
                    {mensagem}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setMensagem('')}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Cadastrar
                  </button>
                </form>

                <div className="text-center">
                  <p className="mb-2">
                    Já tem uma conta? <a href="/login" className="text-decoration-none">Faça login aqui</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;