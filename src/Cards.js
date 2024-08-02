import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Cards.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
// import DetailedCard from "./DetailedCard";

function Cards({ msg }) {
  const [imgUrl, setImgUrl] = useState(0);
  const [pokData, setPokData] = useState([]);
  const [show, setShow] = useState(false);
  const [pokDetailData, setPokDetailData] = useState({
    PokeName: "",
    type: [],
    Abilities: [],
    states: [],
  });
  const [inputName, setInputName] = useState("");
  // console.log(msg);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* ------------------------------- PAGINATION ------------------------------- */
  const handleDecreasePage = () => {
    if (imgUrl > 0) {
      setImgUrl(imgUrl - 12);
      // console.log(imgUrl);
    }
  };

  const handleIncreasePage = () => {
    setImgUrl(imgUrl + 12);
    // console.log(imgUrl);
  };
  /* ----------------------------------- --- ---------------------------------- */

  /* ----------------------------- GET CARD POPUP ----------------------------- */
  const handledetailPopUp = async (pokeName) => {
    // console.log(pokeName);
    setShow(true);

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );

    setPokDetailData((curr) => {
      return {
        ...curr,
        PokeName: response.data.name,
        type: response.data.types,
        Abilities: response.data.abilities,
        states: response.data.stats,
      };
    });
    // console.log(pokDetailData);
  };
  /* ----------------------------------- --- ---------------------------------- */

  /* --------------------------- SEARCH FOR POKEMON --------------------------- */
  const handleSubmit = async () => {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputName.toLowerCase()}`)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert("Data not found, please Check name of pokemon");
          window.location.reload();
        }
      });
    setPokData([response]);
    // console.log(response);
  };

  /* ----------------------------------- --- ---------------------------------- */

  /* ------------------------------ GET CARD LIST ----------------------------- */
  const pokeData = async () => {
    // const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    // const data = await response.json();

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${imgUrl}`
    );
    const Data = await axios.all(
      response.data.results.map((item) => axios.get(item.url))
    );
    setPokData(Data);
    // console.log(Data);
  };

  useEffect(() => {
    pokeData();
  }, [imgUrl]);
  /* ----------------------------------- --- ---------------------------------- */
  const [favData, setFavData] = useState([]);
  const handleFavourits = (prp) => {
    if (!favData.includes(prp)) {
      setFavData([...favData, prp]);
    }
    // console.log(favData);
  };
  /* ----------------------------------- --- ---------------------------------- */

  const handleFavData = async () => {
    const Data = await axios.all(
      favData.map((item) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${item}`)
      )
    );

    setPokData(Data);
  };

  useEffect(() => {
    if (msg === "Clicked") {
      handleFavData();
    }
  }, [msg]);

  return (
    <>
      <Container className="mt-5 ">
        <InputGroup className="m-auto w-75 shadow">
          <Form.Control
            aria-label="Text input with dropdown button"
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />

          <Button onClick={handleSubmit}>Click Here</Button>
        </InputGroup>
        <h5 className="text-center mt-4">Click on Card for More details!</h5>
      </Container>
      {pokData.length === 0 ? (
        <h1 className="text-center">No Favourits added!</h1>
      ) : (
        <Container style={{ marginTop: "10rem" }}>
          <Row xs={1} md={4} className="g-4">
            {pokData.map((item, idx) => (
              <Col key={idx}>
                <Card
                  className="zoom shadow"
                  style={{ marginBottom: "7rem", height: "75%" }}
                  onClick={() => {
                    handledetailPopUp(item.data.name);
                    handleShow(true);
                  }}
                >
                  <Image
                    src={item.data.sprites.other.home.front_default}
                    className="bg-dark bg-gradient border border-3 border-primary position-relative top-0 start-50 translate-middle"
                    style={{
                      borderRadius: "48% 52% 39% 61% / 64% 57% 43% 36%",
                      width: "60%",
                    }}
                  />
                  <Card.Body style={{ marginTop: "-4rem" }}>
                    <h2 className="text-center">{item.data.name}</h2>
                    <hr />
                    {/* <Card.Text>Height : {item.data.height/10} meter</Card.Text>
                <Card.Text>Weight : {item.data.weight/10} Kg</Card.Text> */}
                    <Card.Text>
                      Type :{" "}
                      {item.data.types.map((item) => item.type.name).join(", ")}
                    </Card.Text>
                    <Card.Text>
                      abilities :{" "}
                      {item.data.abilities
                        .map((item) => item.ability.name)
                        .join(", ")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Container className="d-flex justify-content-center mb-5">
            <Button
              variant="dark"
              className="me-2"
              onClick={handleDecreasePage}
            >
              Previous
            </Button>
            <Button variant="dark" onClick={handleIncreasePage}>
              Next
            </Button>
          </Container>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{pokDetailData.PokeName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Type :{" "}
                {pokDetailData.type.map((item) => item.type.name).join(", ")}
              </p>
              <p>
                Abilities :{" "}
                {pokDetailData.Abilities.map((item) => item.ability.name).join(
                  ", "
                )}
              </p>
              <p>Stats : </p>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {pokDetailData.states.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.stat.name}</td>
                      <td>{item.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={() => {
                  handleFavourits(pokDetailData.PokeName);
                  toast.success("Yay, Pokemon Captured 🎉", {
                    position: "top-center",
                    autoClose: 2000,
                  });
                }}
              >
                Add to Favourits
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
}

export default Cards;
