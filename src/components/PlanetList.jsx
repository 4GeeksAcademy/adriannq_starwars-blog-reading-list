import { useEffect, useState, useContext } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";

export const PlanetList = () => {
  let navigate = useNavigate();

  const [characterList, setCharacterList] = useState([]);
  const { addFavorite } = useContext(FavoritesContext);

  const getPlanetList = () => {
    fetch("https://www.swapi.tech/api/planets/", { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        setCharacterList(response.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPlanetList();
  }, []);
  return (
    <>
      <h2 className="text-danger mt-3">Planets</h2>
      <div className="d-flex overflow-auto gap-3">
        {characterList.map((planet) => {
          return (
            <Card style={{ minWidth: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://placehold.co/600x400"
                alt="Placeholder"
              />
              <Card.Body>
                <Card.Title>{planet.name}</Card.Title>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/planets/${planet.uid}`);
                  }}
                >
                  Learn more!
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    addFavorite(planet.uid, planet.name, "planets");
                  }}
                >
                  ♡
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </>
  );
};
