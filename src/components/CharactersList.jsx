import { useContext, useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";
import { isEmpty } from "lodash";

export const CharacterList = () => {
  let navigate = useNavigate();

  const [characterList, setCharacterList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getCharacterList = () => {
    fetch(
      "https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/characters",
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((response) => {
        setCharacterList(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCharacterList();
  }, []);

  return (
    <>
      <h2 className="text-danger">Characters</h2>
      <div className="d-flex overflow-auto gap-3">
        {!isEmpty(characterList) ? (
          characterList.map((people) => {
            const favorite = favorites.find(
              (fav) => fav.external_id === people.id && fav.type === "People",
            );

            return (
              <Card
                key={people.id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
              >
                <Card.Img
                  style={{ maxHeight: "20rem", minHeight: "16rem" }}
                  variant="top"
                  src={people.url || "https://placehold.co/600x400"}
                  alt={people.name}
                />
                <Card.Body>
                  <Card.Title>{people.name}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/characters/${people.id}`)}
                  >
                    Learn more!
                  </Button>
                  <Button
                    variant={favorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      favorite
                        ? deleteFavorite(favorite.id, 1)
                        : addFavorite(1, people.id, people.name, "People");
                    }}
                  >
                    {favorite ? "❤" : "♡"}
                  </Button>
                </Card.Footer>
              </Card>
            );
          })
        ) : (
          <div className="alert alert-warning text-center">
            No Characters Available
          </div>
        )}
      </div>
    </>
  );
};
