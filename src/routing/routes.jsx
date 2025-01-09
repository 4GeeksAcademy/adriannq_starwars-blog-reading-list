import { LandingPage } from "../pages/LandingPage";
import { CharacterPage } from "../pages/DetailsPages/CharacterPage";
import { PlanetPage } from "../pages/DetailsPages/PlanetPage";
import { FilmPage } from "../pages/DetailsPages/StarshipsPage";

export const routeConfig = [
  {
    name: "Landing",
    path: "/",
    page: <LandingPage />,
  },
  {
    name: "CharacterPage",
    path: `/people/:character`,
    page: <CharacterPage />,
  },
  {
    name: "PanetPage",
    path: `/planets/:planet`,
    page: <PlanetPage />,
  },
  {
    name: "FilmPage",
    path: `/starships/:starship`,
    page: <FilmPage />,
  },
];
