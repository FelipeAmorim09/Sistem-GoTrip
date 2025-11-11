

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UserManagement() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    name: '', // Mudei de 'nome' para 'name'
    email: ''
  });
  const [mensagem, setMensagem] = useState('');

  // Carregar usuários do localStorage
  useEffect(() => {
    const carregarUsuarios = () => {
      const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios') || '[]');
      setUsuarios(usuariosSalvos);
    };
    
    carregarUsuarios();
  }, []);

  // Função para deletar usuário
  const deletarUsuario = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const usuariosAtualizados = usuarios.filter(user => user.id !== id);
      setUsuarios(usuariosAtualizados);
      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
      setMensagem('Usuário excluído com sucesso!');
      
      setTimeout(() => setMensagem(''), 3000);
    }
  };

  // Função para iniciar edição
  const iniciarEdicao = (usuario) => {
    setUsuarioEditando(usuario);
    setFormEdit({
      name: usuario.name, // Mudei de 'nome' para 'name'
      email: usuario.email
    });
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setUsuarioEditando(null);
    setFormEdit({ name: '', email: '' });
  };

  // Função para salvar edição
  const salvarEdicao = () => {
    if (!formEdit.name || !formEdit.email) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    // Verificar se email já existe (excluindo o usuário atual)
    const emailExistente = usuarios.find(
      user => user.email === formEdit.email && user.id !== usuarioEditando.id
    );
    
    if (emailExistente) {
      setMensagem('Este email já está em uso!');
      return;
    }

    const usuariosAtualizados = usuarios.map(user =>
      user.id === usuarioEditando.id
        ? { 
            ...user, 
            name: formEdit.name, // Mudei de 'nome' para 'name'
            email: formEdit.email 
          }
        : user
    );

    setUsuarios(usuariosAtualizados);
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    setMensagem('Usuário atualizado com sucesso!');
    setUsuarioEditando(null);
    
    setTimeout(() => setMensagem(''), 3000);
  };

  const handleEditChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1 bg-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">Gerenciar Usuários</h1>
                <Link to="/register" className="btn btn-primary">
                  + Novo Usuário
                </Link>
              </div>

              {mensagem && (
                <div className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`}>
                  {mensagem}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setMensagem('')}
                  ></button>
                </div>
              )}

              {usuarios.length === 0 ? (
                <div className="text-center py-5">
                  <h3 className="text-muted">Nenhum usuário cadastrado</h3>
                  <p className="text-muted">Cadastre o primeiro usuário para começar</p>
                  <Link to="/register" className="btn btn-primary">
                    Cadastrar Usuário
                  </Link>
                </div>
              ) : (
                <div className="card shadow">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Data de Cadastro</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                              <td>{usuario.id}</td>
                              <td>
                                {usuarioEditando?.id === usuario.id ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name" // Mudei de 'nome' para 'name'
                                    value={formEdit.name}
                                    onChange={handleEditChange}
                                  />
                                ) : (
                                  usuario.name // Mudei de 'nome' para 'name'
                                )}
                              </td>
                              <td>
                                {usuarioEditando?.id === usuario.id ? (
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formEdit.email}
                                    onChange={handleEditChange}
                                  />
                                ) : (
                                  usuario.email
                                )}
                              </td>
                              <td>
                                {usuario.dataCadastro ? 
                                  new Date(usuario.dataCadastro).toLocaleDateString('pt-BR') : 
                                  'Data não disponível'
                                }
                              </td>
                              <td>
                                {usuarioEditando?.id === usuario.id ? (
                                  <div className="btn-group">
                                    <button 
                                      className="btn btn-success btn-sm"
                                      onClick={salvarEdicao}
                                    >
                                      Salvar
                                    </button>
                                    <button 
                                      className="btn btn-secondary btn-sm"
                                      onClick={cancelarEdicao}
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                ) : (
                                  <div className="btn-group">
                                    <button 
                                      className="btn btn-warning btn-sm"
                                      onClick={() => iniciarEdicao(usuario)}
                                    >
                                      Editar
                                    </button>
                                    <button 
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deletarUsuario(usuario.id)}
                                    >
                                      Excluir
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}