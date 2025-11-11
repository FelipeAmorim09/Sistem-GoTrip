import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="white" 
            className="me-2"
          >
            <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"/>
          </svg>
          GoTrip
        </Link>

        <div className="navbar-nav ms-auto flex-row">
          <Link className="nav-link text-white me-3" to="/login">
            Entrar
          </Link>
          <Link className="nav-link text-white" to="/register">
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
}