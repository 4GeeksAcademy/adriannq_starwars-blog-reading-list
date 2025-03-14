import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import { baseUrl } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

export const FilmList = () => {
  let navigate = useNavigate();
  const [filmsList, setFilmList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getFilmList = () => {
    fetch(`${baseUrl}/films`, { method: "GET" })
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
          filmsList.map((film) => {
            const isFavorite = favorites.some(
              (fav) => fav.id === film.id && fav.type === "Films",
            );
            return (
              <Card
                key={film.id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
              >
                <Card.Img
                  className="img-fluid"
                  variant="top"
                  src={film.url || "https://placehold.co/600x400"}
                  alt={film.title}
                />
                <Card.Body>
                  <Card.Title>{film.title}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/films/${film.id}`)}
                  >
                    Learn more!
                  </Button>
                  <Button
                    variant={isFavorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      isFavorite
                        ? deleteFavorite(film.id)
                        : addFavorite(film.id, film.name, "Films");
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
            No Films Available
          </div>
        )}
      </div>
    </>
  );
};
