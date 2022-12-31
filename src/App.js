import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="users" element={<Users />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
