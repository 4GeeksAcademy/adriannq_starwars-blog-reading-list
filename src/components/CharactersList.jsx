import { useContext, useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";

export const CharacterList = () => {
  let navigate = useNavigate();

  const [characterList, setCharacterList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getCharacterList = () => {
    fetch("https://www.swapi.tech/api/people/", { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        setCharacterList(response.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCharacterList();
  }, []);

  const isFavorite = (uid) =>
    favorites.some((fav) => fav.uid === uid && fav.type === "people");

  return (
    <>
      <h2 className="text-danger">Characters</h2>
      <div className="d-flex overflow-auto gap-3">
        {characterList.map((people) => {
          return (
            <Card style={{ minWidth: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://placehold.co/600x400"
                alt="Placeholder"
              />
              <Card.Body>
                <Card.Title>{people.name}</Card.Title>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/people/${people.uid}`);
                  }}
                >
                  Learn more!
                </Button>
                <Button
                  variant={
                    isFavorite(people.uid) ? "warning" : "outline-warning"
                  }
                  onClick={() => {
                    !isFavorite(people.uid, "people")
                      ? addFavorite(people.uid, people.name, "people")
                      : deleteFavorite(people.uid);
                  }}
                >
                  {isFavorite(people.uid, "people") ? "❤" : "♡"}
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </>
  );
};
