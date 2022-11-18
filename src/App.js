import { Routes, Route, Navigate } from 'react-router-dom';
import NoMatch from './pages/noMatch';
import SignIn from './pages/signIn';
import PrivateRoute from './routes/PrivateRoute';
import appRoutes from './routes/routes';

function App() {
  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={<PrivateRoute>{route.element}</PrivateRoute>}
      >
        {route.subnavs &&
          route.subnavs.map((subRoute, index) => (
            <Route
              key={index}
              path={subRoute.path}
              element={
                <PrivateRoute roles={subRoute.roles}>
                  {subRoute.element}
                </PrivateRoute>
              }
            ></Route>
          ))}
      </Route>
    ));

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/signin" replace={true} />}
        ></Route>
        <Route index path="/signin" element={<SignIn />}></Route>
        {renderRoutes(appRoutes)}
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </>
  );
}

export default App;
