import { LandingPage } from "../pages/LandingPage";
import { CharacterPage } from "../pages/DetailsPages/CharacterPage";
import { PlanetPage } from "../pages/DetailsPages/PlanetPage";
import { FilmPage } from "../pages/DetailsPages/FilmPage";
import { StarshipPage } from "../pages/DetailsPages/StarshipsPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import RegisterPage from "../pages/AuthPages/RegisterPage";

export const routeConfig = [
  {
    name: "Landing",
    path: "/",
    page: <LandingPage />,
  },
  {
    name: "CharacterPage",
    path: `/characters/:characterId`,
    page: <CharacterPage />,
  },
  {
    name: "PlanetPage",
    path: `/planets/:planetId`,
    page: <PlanetPage />,
  },
  {
    name: "FilmPage",
    path: `/films/:filmId`,
    page: <FilmPage />,
  },
  {
    name: "StarshipPage",
    path: `/starships/:starshipId`,
    page: <StarshipPage />,
  },
  {
    name: "Login",
    path: "/login",
    page: <LoginPage />,
  },
  {
    name: "Register",
    path: "/register",
    page: <RegisterPage />,
  },
];
