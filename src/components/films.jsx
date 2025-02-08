import { useContext, useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";

import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";
import { isEmpty } from "lodash";

export const FilmList = () => {
  let navigate = useNavigate();

  const [filmsList, setFilmList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getFilmList = () => {
    fetch(
      "https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/films",
      { method: "GET" },
    )
      .then((res) => res.json())
      .then((response) => {
        setFilmList(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFilmList();
  }, []);

  return (
    <>
      <h2 className="text-danger">Films</h2>
      <div className="d-flex overflow-auto gap-3">
        {!isEmpty(filmsList) ? (
          filmsList.map((people) => {
            const favorite = favorites.find(
              (fav) => fav.external_id === people.id && fav.type === "Films",
            );

            return (
              <Card
                key={people.id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
              >
                <Card.Img
                  className="img-fluid"
                  variant="top"
                  src={people.url || "https://placehold.co/600x400"}
                  alt={people.title}
                />
                <Card.Body>
                  <Card.Title>{people.title}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/films/${people.id}`)}
                  >
                    Learn more!
                  </Button>
                  <Button
                    variant={favorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      favorite
                        ? deleteFavorite(favorite.id, 1)
                        : addFavorite(1, people.id, people.title, "Films");
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
            No Films Available
          </div>
        )}
      </div>
    </>
  );
};
