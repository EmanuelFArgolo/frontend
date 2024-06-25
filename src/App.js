import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Login from './views/LOGIN/Login';
import CentrosView from './views/CentrosView';
import UsersView from './views/VIEW_USUARIOS/usuarios_view';
import PaginaInicial from './views/PAGINA_INICIAL/pagina_inicial';
import AlbumPartilha from './views/AlbumPartilha/AlbumPartilha';
import PublicacoesView from './views/PUBLICACOES/publicacao_view';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className={isAuthenticated ? "container" : "login-container"}>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/pagina_inicial" /> : <Login onLogin={handleLogin} />
          } />
          {isAuthenticated && (
            <>
              <Route path="/listar_centros" element={<CentrosView />} />
              <Route path="/listar_users" element={<UsersView />} />
              <Route path="/criar_publicacao" element={<PublicacoesView />} />
              <Route path="/pagina_inicial" element={<PaginaInicial />} />
              <Route path="/album_partilha" element={<AlbumPartilha />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
