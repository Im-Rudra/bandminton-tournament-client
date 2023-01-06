import { Button, Card, Divider, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OpenTournaments = () => {
  const [tournament, setTournament] = useState(null);

  const getTournament = () => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'getTournament', null, {
        withCredentials: true
      })
      .then((res) => res.data)
      .then((data) => {
        setTournament(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTournament();
  }, []);

  console.log(tournament);

  return (
    <div className="container">
      {tournament ? (
        <Card
          title={
            <Button type="link">
              <Link to={tournament._id}>{tournament.tournamentName}</Link>
            </Button>
          }
          bordered
          style={{
            width: 300
          }}
        >
          <p>
            Status: <Tag>{tournament.status}</Tag>
          </p>
          <Divider orientation="left">Created By</Divider>
          <div>{`${tournament.creator.firstName} ${tournament.creator.lastName}`}</div>
          <Divider orientation="left">Teams</Divider>
          <p>
            Total: {tournament.totalTeams} | Single: {tournament.singleTeams} | Double:{' '}
            {tournament.doubleTeams}
          </p>
        </Card>
      ) : (
        <div>No tournament found</div>
      )}
    </div>
  );
};

export default OpenTournaments;
