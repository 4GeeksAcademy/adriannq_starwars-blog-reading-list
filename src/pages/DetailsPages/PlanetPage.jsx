import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";

export const PlanetPage = () => {
  let { planet } = useParams();

  const [planetsProperties, setplanetsProperties] = useState([]);
  const [planetsDescription, setplanetsDescription] = useState([]);
  const getplanetData = () => {
    fetch(`https://www.swapi.tech/api/planets/${planet}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setplanetsProperties(response.result.properties);
        setplanetsDescription(response.result.description);
      });
  };
  useEffect(() => {
    getplanetData();
  }, []);
  return (
    <Card>
      <Container className="d-flex">
        <Image src="https://placehold.co/800x600" />
        <div className="text-center m-3">
          <h3>{planetsProperties.name}</h3>
          <p>{planetsDescription}</p>
        </div>
      </Container>
      <Container className="d-flex justify-content-between mt-2">
        <div>
          <h4>Name</h4>
          <p>{planetsProperties.name}</p>
        </div>
        <div>
          <h4>Climate</h4>
          <p>{planetsProperties.climate}</p>
        </div>
        <div>
          <h4>Population</h4>
          <p>{planetsProperties.population}</p>
        </div>
        <div>
          <h4>Orbital Period</h4>
          <p>{planetsProperties.orbital_period}</p>
        </div>
        <div>
          <h4>Rotation Period</h4>
          <p>{planetsProperties.rotation_period}</p>
        </div>
        <div>
          <h4>Diameter</h4>
          <p>{planetsProperties.diameter}</p>
        </div>
      </Container>
    </Card>
  );
};
