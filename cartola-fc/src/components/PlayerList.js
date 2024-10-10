import React, { useState, useEffect } from "react";
import axios from "axios";
import './PlayerList.css';

const PlayerList = ({ teamId }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`https://api.cartola.globo.com/atletas/mercado/${teamId}`);
        setPlayers(response.data.atletas);
      } catch (error) {
        console.error("Error fetching players", error);
      }
    };

    if (teamId) {
      fetchPlayers();
    }
  }, [teamId]);

  return (
    <div className="player-list">
      {players.length > 0 ? (
        players.map((player) => (
          <div key={player.id} className="player-card">
            <img
              src={`https://s.sde.globo.com/media/person_role/2023/03/08/photo_220x220_${player.slug}.png`}
              alt={player.apelido}
            />
            <h4>{player.apelido}</h4>
          </div>
        ))
      ) : (
        <p>Carregando jogadores...</p>
      )}
    </div>
  );
};

export default PlayerList;
