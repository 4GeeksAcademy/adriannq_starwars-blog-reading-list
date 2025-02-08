import { CharacterList } from "../components/CharactersList";
import { StarshipsList } from "../components/StarshipsList";
import { PlanetList } from "../components/PlanetList";
import { FilmList } from "../components/films";

export const LandingPage = () => {
  return (
    <>
      <CharacterList />
      <PlanetList />
      <StarshipsList />
      <FilmList />
    </>
  );
};
