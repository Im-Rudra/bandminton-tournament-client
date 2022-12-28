import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
