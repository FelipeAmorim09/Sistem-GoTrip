import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    endereco: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${form.cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro) {
            setErro("CEP não encontrado");
            setForm({ ...form, endereco: "" });
          } else {
            setForm({
              ...form,
              endereco: `${data.logradouro}, ${data.localidade} - ${data.uf}`,
            });
            setErro("");
          }
        })
        .catch(() => setErro("Erro ao buscar o CEP"));
    }
  }, [form.cep]);

  const validarFormulario = () => {
    if (!form.nome || !form.email || !form.senha || !form.confirmarSenha) {
      setErro("Todos os campos são obrigatórios");
      return false;
    }
    if (!form.email.includes("@")) {
      setErro("E-mail inválido");
      return false;
    }
    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem");
      return false;
    }
    setErro("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setMensagem("Login realizado com sucesso!");
      localStorage.setItem("usuarioGoTrip", JSON.stringify(form));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="card-title text-center text-primary mb-4">
                    Entrar
                  </h2>
                  <form onSubmit={handleSubmit} className="d-grid gap-3">
                    <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" className="form-control" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="E-mail" className="form-control" />
                    <input name="senha" type="password" value={form.senha} onChange={handleChange} placeholder="Senha" className="form-control" />
                    <input name="confirmarSenha" type="password" value={form.confirmarSenha} onChange={handleChange} placeholder="Confirmar Senha" className="form-control" />
                    <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" className="form-control" />
                  
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-primary w-50 me-2">Entrar</button>
                      <button type="button" onClick={() => setForm({ nome: "", email: "", senha: "", confirmarSenha: "", cep: "", endereco: "" })} className="btn btn-secondary w-50 ms-2">Cancelar</button>
                    </div>
                  </form>
                  {erro && <p className="text-danger text-center mt-2">{erro}</p>}
                  {mensagem && <p className="text-success text-center mt-2">{mensagem}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
