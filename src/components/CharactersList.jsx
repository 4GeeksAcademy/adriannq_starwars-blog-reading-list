import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { isEmpty } from "lodash";
import { baseUrl } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

export const CharacterList = () => {
  let navigate = useNavigate();
  const [characterList, setCharacterList] = useState([]);
  const { favorites, addFavorite, deleteFavorite } =
    useContext(FavoritesContext);

  const getCharacterList = () => {
    fetch(`${baseUrl}/characters`, { method: "GET" })
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
          characterList.map((character) => {
            const isFavorite = favorites.some(
              (fav) =>
                fav.external_id === character.id && fav.type === "People",
            );

            return (
              <Card
                key={character.id}
                style={{ minWidth: "18rem", maxWidth: "18rem" }}
              >
                <Card.Img
                  style={{ maxHeight: "20rem", minHeight: "16rem" }}
                  variant="top"
                  src={character.url || "https://placehold.co/600x400"}
                  alt={character.name}
                />
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/characters/${character.id}`)}
                  >
                    Learn more!
                  </Button>
                  <Button
                    variant={isFavorite ? "warning" : "outline-warning"}
                    onClick={() => {
                      isFavorite
                        ? deleteFavorite(character.id)
                        : addFavorite(character.id, character.name, "People");
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
            No Characters Available
          </div>
        )}
      </div>
    </>
  );
};
