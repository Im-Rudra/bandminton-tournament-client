import { Button, Tag } from 'antd';
import React from 'react';

const TournamentCard = ({ tournament }) => {
  const { tournamentName, status, totalTeams, singleTeams, doubleTeams } = tournament;
  return (
    <div className="w-full px-4 py-3 shadow mb-1 rounded">
      <Button type="link" className="text-xl text-cyan-800 cursor-pointer mb-1">
        {tournamentName}
      </Button>
      <Tag color="green">{status}</Tag>
      <p className="mb-1">
        Total teams: {totalTeams} | Single: {singleTeams} | Double: {doubleTeams}
      </p>
      {status === 'Open' && <Button type="primary">Close Tournament</Button>}
    </div>
  );
};

export default TournamentCard;
