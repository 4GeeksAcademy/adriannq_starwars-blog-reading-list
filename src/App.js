import { Routes, Route } from "react-router";

import { routeConfig } from "./routing/routes";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routeConfig.map((route) => {
          return <Route path={route.path} element={route.page} />;
        })}
      </Routes>
    </>
  );
}

export default App;
