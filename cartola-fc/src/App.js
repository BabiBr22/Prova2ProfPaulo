import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch teams from the API
        const fetchTeams = async () => {
            try {
                const response = await axios.get('https://api.cartola.globo.com/clubes');
                console.log('Dados dos times:', response.data); // Verifique a estrutura dos dados aqui
                setTeams(response.data); // Atualiza o estado com os dados retornados
            } catch (error) {
                console.error("Erro ao buscar times:", error);
            }
        };
        fetchTeams();
    }, []);

    const handleTeamClick = async (team) => {
        setSelectedTeam(team);
        try {
            const response = await axios.get(`https://api.cartola.globo.com/atletas/${team.id}`);
            setPlayers(response.data.atletas); // Atualiza o estado com os jogadores do time selecionado
        } catch (error) {
            console.error("Erro ao buscar jogadores:", error);
        }
    };

    // Filtra os times com base no termo de busca
    const filteredTeams = Array.isArray(teams) ? teams.filter((team) =>
        team.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="app-container">
            <header className="header">
                <h1>Cartola FC</h1>
                <input
                    type="text"
                    placeholder="Buscar time..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </header>
            <div className="teams-list">
                {filteredTeams.map((team) => (
                    <div key={team.id} className="team" onClick={() => handleTeamClick(team)}>
                        <h2>{team.nome}</h2>
                    </div>
                ))}
            </div>
            {selectedTeam && (
                <div className="players-list">
                    <h2>Jogadores do {selectedTeam.nome}</h2>
                    {players.map((player) => (
                        <div key={player.id} className="player">
                            <img
                                src={`https://s.sde.globo.com/media/person_role/2023/03/08/photo_${player.foto}.png`} // Corrigido para "foto"
                                alt={player.nome}
                                className="player-photo"
                            />
                            <h3>{player.nome}</h3>
                            <p>Posição: {player.posicao}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
