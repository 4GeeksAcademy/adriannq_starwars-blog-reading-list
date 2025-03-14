import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { baseUrl } from "../../services/api";

export const CharacterPage = () => {
  let { characterId } = useParams();

  const [character, setCharacter] = useState([]);
  const getCharacterData = () => {
    fetch(`${baseUrl}/characters/${characterId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setCharacter(response);
      });
  };
  useEffect(() => {
    getCharacterData();
  }, []);
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="d-flex align-items-center flex-column text-center">
          <Image
            src={character.url || "https://placehold.co/800x600"}
            alt={character.name}
            className="rounded-4 mb-3"
            style={{ maxWidth: "300px", width: "100%" }}
          />
          <h2 className="fw-bold text-primary">{character.name}</h2>
        </div>

        <Container className="d-flex flex-wrap justify-content-around mt-4">
          <InfoBlock label="Birth Year" value={character.birth_year} />
          <InfoBlock label="Gender" value={character.gender} />
          <InfoBlock label="Height" value={`${character.height} cm`} />
          <InfoBlock label="Skin Color" value={character.skin_color} />
          <InfoBlock label="Eye Color" value={character.eye_color} />
        </Container>
      </Card>
    </Container>
  );
};

const InfoBlock = ({ label, value }) => (
  <div className="text-center m-2">
    <h5 className="text-secondary">{label}</h5>
    <p className="fw-semibold">{value}</p>
  </div>
);
