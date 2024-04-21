import { useState } from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorizationPage from "../../containers/AuthorizationPage";
import ClientsPage from "../../containers/ClientsPage";
import { IClient } from '../../types/data';

const App: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route 
                path="/"
                element={<AuthorizationPage setClients={setClients} />}
            />
            <Route 
                path="/clients"
                element={<ClientsPage clients={clients} setClients={setClients}/>}
            />
          </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
