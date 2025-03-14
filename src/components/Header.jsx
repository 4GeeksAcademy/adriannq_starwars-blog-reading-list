import { useContext } from "react";
import {
  Image,
  DropdownButton,
  Dropdown,
  Navbar,
  Nav,
  Container,
  Badge,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";
import { UserContext } from "../context/UserContext";
import { isEmpty } from "lodash";

export const Header = () => {
  let navigate = useNavigate();

  const { favorites, deleteFavorite } = useContext(FavoritesContext);
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand
            onClick={() => {
              navigate(`/`);
            }}
            style={{ cursor: "pointer" }}
          >
            <Image
              style={{ width: "70px", height: "40px" }}
              src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/57A0EA5BFA41EA7991E8629C6563BC178462B0399E733A6249F8150F93ACFED8/scale?width=600&aspectRatio=1.78&format=webp"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav>
            {!isEmpty(user) ? (
              <Button variant="danger" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}
            <DropdownButton title={`Favorites`} variant="primary">
              {!isEmpty(favorites) ? (
                favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="d-flex align-items-center justify-content-between px-3"
                  >
                    <Dropdown.Item
                      onClick={() =>
                        navigate(`/${favorite.type}/${favorite.id}`)
                      }
                    >
                      {favorite.name}
                    </Dropdown.Item>
                    <Badge
                      bg="danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteFavorite(favorite.id)}
                    >
                      X
                    </Badge>
                  </div>
                ))
              ) : (
                <Dropdown.Item disabled>No favorites added yet</Dropdown.Item>
              )}
            </DropdownButton>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
