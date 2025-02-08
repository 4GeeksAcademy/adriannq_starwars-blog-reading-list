import { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { useParams } from "react-router";

export const FilmPage = () => {
  let { filmId } = useParams();

  const [film, setFilm] = useState([]);
  const getFilmData = () => {
    fetch(
      `https://supreme-xylophone-4jgrqx9q7445fjq9x-3000.app.github.dev/films/${filmId}`,
      {
        method: "GET",
      },
    )
      .then((res) => res.json())
      .then((response) => {
        setFilm(response);
      });
  };
  useEffect(() => {
    getFilmData();
  }, [filmId]);
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        className="p-4 shadow-lg rounded-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="d-flex align-items-center flex-column text-center">
          <Image
            src={film.url || "https://placehold.co/800x600"}
            alt={film.title}
            className="rounded-4 mb-3"
            style={{ maxWidth: "300px", width: "100%" }}
          />
          <h2 className="fw-bold text-primary">{film.title}</h2>
          <p className="text-muted">{film.opening_crawl}</p>
        </div>

        <Container className="d-flex flex-wrap justify-content-around mt-4">
          <InfoBlock label="Director" value={film.director} />
          <InfoBlock label="Producer" value={film.producer} />
          <InfoBlock label="Release Date" value={film.release_date} />
          <InfoBlock label="Episode ID" value={film.episode_id} />
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
