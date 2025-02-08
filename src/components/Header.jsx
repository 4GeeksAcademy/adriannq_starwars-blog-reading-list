import { useContext } from "react";
import {
  Image,
  DropdownButton,
  Dropdown,
  Navbar,
  Nav,
  Container,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { FavoritesContext } from "../context/FavoritesContext";

export const Header = () => {
  let navigate = useNavigate();

  const { favorites, deleteFavorite } = useContext(FavoritesContext);

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
            <DropdownButton title={`Favorites`} variant="primary">
              {favorites.length > 0 ? (
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
                      onClick={() => deleteFavorite(favorite.id, 1)}
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
