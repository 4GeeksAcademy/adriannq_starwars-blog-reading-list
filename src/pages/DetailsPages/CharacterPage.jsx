import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";

export const CharacterPage = () => {
  let { character } = useParams();

  const [charactersProperties, setCharactersProperties] = useState([]);
  const [charactersDescription, setCharactersDescription] = useState([]);
  const getCharacterData = () => {
    fetch(`https://www.swapi.tech/api/people/${character}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setCharactersProperties(response.result.properties);
        setCharactersDescription(response.result.description);
      });
  };
  useEffect(() => {
    getCharacterData();
  }, []);
  return (
    <Card>
      <Container className="d-flex">
        <Image src="https://placehold.co/800x600" />
        <div className="text-center m-3">
          <h3>{charactersProperties.name}</h3>
          <p>{charactersDescription}</p>
        </div>
      </Container>
      <Container className="d-flex justify-content-between mt-2">
        <div>
          <h4>Name</h4>
          <p>{charactersProperties.name}</p>
        </div>
        <div>
          <h4>Birth Year</h4>
          <p>{charactersProperties.birth_year}</p>
        </div>
        <div>
          <h4>Gender</h4>
          <p>{charactersProperties.gender}</p>
        </div>
        <div>
          <h4>Height</h4>
          <p>{charactersProperties.height}</p>
        </div>
        <div>
          <h4>Skin Color</h4>
          <p>{charactersProperties.skin_color}</p>
        </div>
        <div>
          <h4>Eye Color</h4>
          <p>{charactersProperties.eye_color}</p>
        </div>
      </Container>
    </Card>
  );
};
