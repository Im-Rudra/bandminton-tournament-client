import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchUser = () => {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'getLoggedInUser', null, {
        withCredentials: true
      })
      .then((res) => {
        // console.log(res.data);
        res?.data?.id && setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    setUser
  };
};

export default useFetchUser;
