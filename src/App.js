import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import RootLayout from './layouts/RootLayout';
import TournamentLayout from './layouts/TournamentLayout';
import CreateTournament from './pages/Admin/Tournament/CreateTournament';
import Login from './pages/Login';
import Register from './pages/Register';
import Tournaments from './pages/Admin/Tournament/Tournaments';
import Users from './pages/Admin/User/Users';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="users" element={<Users />} />
        <Route path="tournaments" element={<TournamentLayout />}>
          <Route path="" element={<Tournaments />} />
          <Route path="create-tournament" element={<CreateTournament />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
