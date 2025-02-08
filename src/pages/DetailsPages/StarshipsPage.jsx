import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";

export const StarshipPage = () => {
  let { starshipId } = useParams();

  const [starship, setStarship] = useState([]);

  const getStarshipData = () => {
    fetch(
      `https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/starships/${starshipId}`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((response) => {
        setStarship(response);
      });
  };
  useEffect(() => {
    getStarshipData();
  }, []);
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="d-flex align-items-center flex-column text-center">
          <Image
            src={starship.url || "https://placehold.co/800x600"}
            alt={starship.name}
            className="rounded-4 mb-3"
            style={{ maxWidth: "300px", width: "100%" }}
          />
          <h2 className="fw-bold text-primary">{starship.name}</h2>
        </div>

        <Container className="d-flex flex-wrap justify-content-around mt-4">
          <InfoBlock label="Model" value={starship.model} />
          <InfoBlock label="Cost in Credits" value={starship.cost_in_credits} />
          <InfoBlock label="Consumables" value={starship.consumables} />
          <InfoBlock
            label="Max Speed"
            value={starship.max_atmosphering_speed}
          />
        </Container>
      </Card>
    </Container>
  );
};

const InfoBlock = ({ label, value }) => (
  <div className="text-center m-2">
    <h5 className="text-secondary">{label}</h5>
    <p className="fw-semibold">{value || "Unknown"}</p>
  </div>
);
