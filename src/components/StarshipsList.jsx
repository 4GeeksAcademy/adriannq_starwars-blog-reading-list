import { useContext, useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";
import { isEmpty } from "lodash";

export const StarshipsList = () => {
  let navigate = useNavigate();

  const [starshipList, setStarshipList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getStarshipList = () => {
    fetch(
      "https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/starships",
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((response) => {
        setStarshipList(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getStarshipList();
  }, []);

  return (
    <>
      <h2 className="text-danger">Starships</h2>
      <div className="d-flex overflow-auto gap-3">
        {!isEmpty(starshipList) ? (
          starshipList.map((starship) => {
            const favorite = favorites.find(
              (fav) =>
                fav.external_id === starship.id && fav.type === "Starships",
            );

            return (
              <Card
                key={starship.id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={starship.url || "https://placehold.co/600x400"}
                  alt={starship.name}
                />
                <Card.Body>
                  <Card.Title>{starship.name}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/starships/${starship.id}`)}
                  >
                    Learn more!
                  </Button>
                  <Button
                    variant={favorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      favorite
                        ? deleteFavorite(favorite.id, 1)
                        : addFavorite(
                            1,
                            starship.id,
                            starship.name,
                            "Starships",
                          );
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
            No Starships Available
          </div>
        )}
      </div>
    </>
  );
};
