import { useEffect, useState, useContext } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";

export const StarshipsList = () => {
  let navigate = useNavigate();

  const [starshipsList, setStarshipsList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getStarshipsList = () => {
    fetch("https://www.swapi.tech/api/starships/", { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        setStarshipsList(response.results);
      })
      .catch((err) => console.error(err));
  };
  const isFavorite = (uid) =>
    favorites.some((fav) => fav.uid === uid && fav.type === "starships");

  useEffect(() => {
    getStarshipsList();
  }, []);
  return (
    <>
      <h2 className="text-danger mt-3">Starships</h2>
      <div className="d-flex overflow-auto gap-3">
        {starshipsList.map((starship) => {
          return (
            <Card style={{ minWidth: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://placehold.co/600x400"
                alt="Placeholder"
              />
              <Card.Body>
                <Card.Title>{starship.name}</Card.Title>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/starships/${starship.uid}`);
                  }}
                >
                  Learn more!
                </Button>
                <Button
                  variant={
                    isFavorite(starship.uid) ? "warning" : "outline-warning"
                  }
                  onClick={() => {
                    !isFavorite(starship.uid, "starships")
                      ? addFavorite(starship.uid, starship.name, "starships")
                      : deleteFavorite(starship.uid);
                  }}
                >
                  {isFavorite(starship.uid, "starships") ? "❤" : "♡"}
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </>
  );
};
