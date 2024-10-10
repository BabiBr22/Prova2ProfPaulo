import React, { useState } from "react";
import PlayerList from "./PlayerList";
import './TeamList.css';

const TeamList = ({ teams }) => {
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
  };

  return (
    <div className="team-list">
      {teams.map((team) => (
        <div key={team.id} className="team-card" onClick={() => handleTeamClick(team.id)}>
          <img src={team.escudos["60x60"]} alt={`${team.nome} escudo`} />
          <h3>{team.nome}</h3>
        </div>
      ))}
      {selectedTeamId && <PlayerList teamId={selectedTeamId} />}
    </div>
  );
};

export default TeamList;
