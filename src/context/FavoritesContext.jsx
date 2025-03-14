import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { isEmpty } from "lodash";
import { baseUrl } from "../services/api";

export const FavoritesContext = createContext({
  favorites: [],
  setFavorites: () => {},
  deleteFavorite: (external_id, type) => {},
  addFavorites: (id, name, type) => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(UserContext);

  const getUserFavourites = () => {
    fetch(`${baseUrl}/favorites`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
      });
  };

  const deleteFavorite = async (external_id) => {
    fetch(`${baseUrl}/favorites/${external_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
      },
      credentials: "include",
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        getUserFavourites();
      });
  };

  const addFavorite = (externalId, name, type) => {
    fetch(`${baseUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_access_token"),
      },
      credentials: "include",
      body: JSON.stringify({
        external_id: externalId,
        name: name,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getUserFavourites();
      });
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      getUserFavourites();
    }
  }, [user]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, addFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
