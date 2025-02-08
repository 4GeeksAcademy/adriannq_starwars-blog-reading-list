import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";

export const PlanetPage = () => {
  let { planetId } = useParams();

  const [planet, setplanet] = useState([]);

  const getplanetData = () => {
    fetch(
      `https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/planets/${planetId}`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((response) => {
        setplanet(response);
      });
  };
  useEffect(() => {
    getplanetData();
  }, []);
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="d-flex align-items-center flex-column text-center">
          <Image
            src={planet.url || "https://placehold.co/800x600"}
            alt={planet.name}
            className="rounded-4 mb-3"
            style={{ maxWidth: "300px", width: "100%" }}
          />
          <h2 className="fw-bold text-primary">{planet.name}</h2>
        </div>

        <Container className="d-flex flex-wrap justify-content-around mt-4">
          <InfoBlock label="Climate" value={planet.climate} />
          <InfoBlock label="Population" value={planet.population} />
          <InfoBlock
            label="Orbital Period"
            value={`${planet.orbital_period} days`}
          />
          <InfoBlock
            label="Rotation Period"
            value={`${planet.rotation_period} hours`}
          />
          <InfoBlock label="Diameter" value={`${planet.diameter} km`} />
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
