import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Modal, Button } from "react-bootstrap";

function Pagination() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { SearchBar } = Search;

  const ClearButton = (props) => {
    const handleClick = () => {
      props.onSearch("");
    };
    return (
      <Button
        variant="secondary"
        onClick={handleClick}
        style={{
          fontSize: "16px",
          padding: "5px",
          margin: "10px",
          height: "40px",
        }}
      >
        Clear
      </Button>
    );
  };

  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch("https://swapi.dev/api/people/");
      let data = await res.json();
      setPeople(data.results);
    }
    async function fetchPlanets() {
      let res = await fetch("https://swapi.dev/api/planets/?");
      let data2 = await res.json();
      setPlanets(data2.results);
    }

    fetchPeople();
    fetchPlanets();
  }, []);

  const columns = [{ dataField: "name", text: "Name" }];

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      toggleTureFalse();
    },
  };

  const toggleTureFalse = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>{modalInfo.name}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Details:</h2>
          <ul>
            <ol>Gender: {modalInfo.gender}</ol>
            <ol>Hair Color: {modalInfo.hair_color}</ol>
            <ol>Height: {modalInfo.height}</ol>
            <ol>Mass: {modalInfo.mass}</ol>
            <ol>Homeworld: {modalInfo.homeworld}</ol>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>

      <ToolkitProvider
        bootstrap4
        keyField="name"
        data={people}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <SearchBar
              {...props.searchProps}
              style={{ width: "400px", height: "40px" }}
            />
            <ClearButton {...props.searchProps} />
            <BootstrapTable
              {...props.baseProps}
              rowEvents={rowEvents}
              pagination={paginationFactory()}
              striped
              hover
            />
          </div>
        )}
      </ToolkitProvider>
      {show ? <ModalContent /> : null}
    </div>
  );
}
export default Pagination;
