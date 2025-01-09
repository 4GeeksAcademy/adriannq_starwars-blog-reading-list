import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  deleteFavorite: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (uid, name, type) => {
    setFavorites([
      ...favorites,
      {
        uid: uid,
        name: name,
        type: type,
      },
    ]);
  };
  const deleteFavorite = (uid) => {
    setFavorites(() => favorites.filter((favorite) => favorite.uid !== uid));
  };
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
