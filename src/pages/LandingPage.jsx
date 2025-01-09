import { CharacterList } from "../components/CharactersList";
import { StarshipsList } from "../components/StarshipsList";
import { PlanetList } from "../components/PlanetList";

export const LandingPage = () => {
  return (
    <>
      <CharacterList />
      <PlanetList />
      <StarshipsList />
    </>
  );
};
