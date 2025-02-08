import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  setFavorites: () => {},
  addFavorite: () => {},
  deleteFavorite: () => {},
});

const baseUrl =
  "https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const getUserFavorites = () => {
    const user_id = 1;
    fetch(`${baseUrl}/user/${user_id}/favorites`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error("Error fetching favorites:", error));
  };

  const addFavorite = (user_id, external_id, name, type) => {
    fetch(`${baseUrl}/user/${user_id}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, external_id, name, type }),
    })
      .then((res) => res.json())
      .then(() => getUserFavorites())
      .catch((error) => console.error("Error adding favorite:", error));
  };

  const deleteFavorite = (id, user_id) => {
    fetch(`${baseUrl}/user/${user_id}/favorites/${id}`, {
      method: "DELETE",
    }).then(() => {
      getUserFavorites();
    });
  };

  useEffect(() => {
    getUserFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, addFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
