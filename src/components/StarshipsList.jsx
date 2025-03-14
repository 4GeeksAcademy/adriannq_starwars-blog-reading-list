import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import { baseUrl } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

export const StarshipsList = () => {
  let navigate = useNavigate();
  const [starshipList, setStarshipList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getStarshipList = () => {
    fetch(`${baseUrl}/starships`, { method: "GET" })
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
            const isFavorite = favorites.some(
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
                    variant={isFavorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      isFavorite
                        ? deleteFavorite(starship.id, "Starships")
                        : addFavorite(starship.id, starship.name, "Starships");
                    }}
                  >
                    {isFavorite ? "❤" : "♡"}
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
