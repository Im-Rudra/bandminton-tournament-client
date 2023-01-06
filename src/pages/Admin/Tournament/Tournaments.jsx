import { Button, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import TournamentCard from './TournamentCard';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  const getTournaments = () => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'getAllTournaments', null, {
        withCredentials: true
      })
      .then((res) => res.data)
      .then((data) => {
        setTournaments(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return (
    <div>
      {/* <p>This is tournaments page</p>
      <p>Here you can see all the tournaments</p>
      <div className="w-full px-4 py-3 shadow mb-1 rounded">
        <p className="text-xl text-cyan-800 cursor-pointer">
          Tournament Name | {<Tag color="green">Open</Tag>}
        </p>
        <p>Total teams: 4 | Single: 2 | Double: 2</p>
        <Button type="primary">Close Tournament</Button>
      </div> */}
      {tournaments.length > 0 &&
        tournaments.map((tournament, i) => {
          return <TournamentCard key={tournament._id} tournament={tournament} />;
        })}
    </div>
  );
};

export default Tournaments;
