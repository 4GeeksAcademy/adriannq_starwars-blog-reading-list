import { Routes, Route } from "react-router";

import { routeConfig } from "./routing/routes";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route>
          {routeConfig.map((route) => {
            return (
              <Route key={route.name} path={route.path} element={route.page} />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
