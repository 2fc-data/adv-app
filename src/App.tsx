import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';
import './App.css';

interface User {
  email: string;
  role: string;
}

interface RootState {
  auth: {
    user: User | null;
  };
}

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="home-container">
      <h2>Bem-vindo à Plataforma Jurídica!</h2>
      {user ? (
        <div>
          <p>Olá, {user.email} ({user.role})!</p>
          <button onClick={handleLogout}>Sair</button>
          {/* Adicionar links para áreas restritas aqui */}
        </div>
      ) : (
        <div>
          <p>Por favor, faça login ou cadastre-se para acessar o conteúdo.</p>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastro</Link>
          </nav>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

