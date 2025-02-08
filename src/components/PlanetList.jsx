import { useContext, useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";
import { isEmpty } from "lodash";

export const PlanetList = () => {
  let navigate = useNavigate();

  const [planetList, setPlanetList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getPlanetList = () => {
    fetch(
      "https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/planets",
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((response) => {
        setPlanetList(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPlanetList();
  }, []);

  return (
    <>
      <h2 className="text-danger">Planets</h2>
      <div className="d-flex overflow-auto gap-3">
        {!isEmpty(planetList) ? (
          planetList.map((planet) => {
            const favorite = favorites.find(
              (fav) => fav.external_id === planet.id && fav.type === "Planets",
            );

            return (
              <Card
                key={planet.id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
              >
                <Card.Img
                  style={{ maxHeight: "20rem", minHeight: "16rem" }}
                  variant="top"
                  src={planet.url || "https://placehold.co/600x400"}
                  alt={planet.name}
                />
                <Card.Body>
                  <Card.Title>{planet.name}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/planets/${planet.id}`)}
                  >
                    Learn more!
                  </Button>
                  <Button
                    variant={favorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      favorite
                        ? deleteFavorite(favorite.id, 1)
                        : addFavorite(1, planet.id, planet.name, "Planets");
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
            No Planets Available
          </div>
        )}
      </div>
    </>
  );
};
