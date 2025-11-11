
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [destinos, setDestinos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // API: Unsplash - Fonte das imagens de viagem
  // https://unsplash.com/developers
  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const accessKey = 'seu_access_key_aqui'; // Você precisa criar conta no Unsplash
        // Para teste, vou usar uma API pública de países
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region');
        const data = await response.json();
        
        // Seleciona alguns países como destinos
        const destinosSelecionados = data
          .filter(country => country.capital && country.capital[0])
          .slice(0, 12)
          .map(country => ({
            id: country.name.common,
            nome: country.name.common,
            local: country.capital[0],
            regiao: country.region,
            imagem: country.flags.png,
            descricao: `Descubra as belezas de ${country.capital[0]}, capital do ${country.name.common}`
          }));
        
        setDestinos(destinosSelecionados);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar destinos:', error);
        setCarregando(false);
      }
    };

    fetchDestinos();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <main className="flex-grow-1">
        {/* Hero Section com imagem de viagem */}
        <section className="container-fluid px-0">
          <div className="row">
            <div className="col-12">
              <img 
                src="https://feriasperfeitas.com/wp-content/uploads/2021/03/passagens-baratas-fernando-noronha-6-1536x1152.jpg" 
                alt="Paisagem de viagem" 
                className="img-fluid w-100 rounded-bottom-4"
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Seção de Destinos */}
        <section className="container my-5">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-primary">Destinos Incríveis</h2>
              <p className="lead text-muted">Descubra os melhores lugares para sua próxima aventura</p>
            </div>
          </div>

          {carregando ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2">Carregando destinos...</p>
            </div>
          ) : (
            <div className="row g-4">
              {destinos.map(destino => (
                <div key={destino.id} className="col-md-6 col-lg-4 col-xl-3">
                  <div className="card h-100 shadow-sm border-0">
                    <img 
                      src={destino.imagem} 
                      className="card-img-top" 
                      alt={destino.nome}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-primary">{destino.nome}</h5>
                      <p className="card-text text-muted">
                        <strong>{destino.local}</strong> - {destino.regiao}
                      </p>
                      <p className="card-text flex-grow-1">{destino.descricao}</p>
                      <button className="btn btn-primary mt-auto">
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          
        </section>
      </main>

      <Footer />
    </div>
  );
}