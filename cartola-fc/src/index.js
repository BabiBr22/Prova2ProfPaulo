import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa o ReactDOM da biblioteca
import App from './App'; // Importa o componente principal do aplicativo
import './index.css'; // Importa o CSS global

// Cria um contêiner para o aplicativo
const root = ReactDOM.createRoot(document.getElementById('root')); // Obtém o elemento DOM com ID 'root'

// Renderiza o aplicativo dentro do contêiner
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
