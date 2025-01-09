import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";

export const FilmPage = () => {
  let { starship } = useParams();

  const [starshipProperties, setStarshipProperties] = useState([]);
  const [starshipDescription, setStarshipDescription] = useState([]);
  const getStarshipData = () => {
    fetch(`https://www.swapi.tech/api/starships/${starship}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setStarshipProperties(response.result.properties);
        setStarshipDescription(response.result.description);
      });
  };
  useEffect(() => {
    getStarshipData();
  }, []);
  return (
    <Card>
      <Container className="d-flex">
        <Image src="https://placehold.co/800x600" />
        <div className="text-center m-3">
          <h3>{starshipProperties.name}</h3>
          <p>{starshipDescription}</p>
        </div>
      </Container>
      <Container className="d-flex justify-content-between mt-2">
        <div>
          <h4>Name</h4>
          <p>{starshipProperties.name}</p>
        </div>
        <div>
          <h4>Passengers</h4>
          <p>{starshipProperties.passengers}</p>
        </div>
        <div>
          <h4>Cost In Credits</h4>
          <p>{starshipProperties.cost_in_credits}</p>
        </div>
        <div>
          <h4>Consumables</h4>
          <p>{starshipProperties.consumables}</p>
        </div>
        <div>
          <h4>Max Speed</h4>
          <p>{starshipProperties.max_atmosphering_speed}</p>
        </div>
      </Container>
    </Card>
  );
};
