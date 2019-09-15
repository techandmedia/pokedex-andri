import { useEffect, useState, useReducer } from "react";
import { Button, Icon, Row, Col, Modal, Input, Divider } from "antd";

import useFetchData from "../utils/getTableData";
import buttonsReducer from "../utils/reducers";
import ListPokemon from "../components/List-Pokemon";

import "../style/antd-custom-style.less";

export default function App() {
  const [state, refetch] = useFetchData("https://pokeapi.co/api/v2/pokemon");
  const [pokemons, setPokemons] = useState([]);
  const ButtonGroup = Button.Group;
  const [button, dispatchButton] = useReducer(buttonsReducer, [
    {
      key: 1,
      title: "Previous",
      type: "left",
      disabled: true
    },
    { key: 2, title: "Next", type: "right", disabled: false }
  ]);

  useEffect(() => {
    dispatchButton({ type: "INIT" });
  }, []);

  useEffect(() => {
    const { isLoading, isError } = state;
    if (!isLoading && !isError) {
      const { details } = state;
      console.log(details);
      setPokemons(details);
    }
  }, [state]);

  useEffect(() => {
    if (!state.isLoading && !state.isError) {
      const { previous, next } = state;
      console.log(state);
      if (previous === null) {
        dispatchButton({ type: "PREVIOUS_NULL", refetch, next });
      } else if (next === null) {
        dispatchButton({ type: "NEXT_NULL", refetch, previous });
      } else {
        dispatchButton({ type: "NOT_NULL", refetch, previous, next });
      }
    }
  }, [state]);

  function handleSearchPokemon(e) {
    const { details } = state;
    const type = e.target.value;
    let temp = details.filter(pokemon =>
      pokemon.detail.types[0].type.name
        .toLowerCase()
        .includes(type.toLowerCase())
    );
    setPokemons(temp);
  }

  return (
    <div style={{ marginTop: 50, height: "50vh" }}>
      <div style={{ overFlow: "auto" }}>
        <Row gutter={16}>
          <Col
            span={4}
            style={{
              paddingLeft: 30,
              paddingRight: 20
            }}
          >
            Pokemon
            <ButtonGroup>
              <Row gutter={16}>
                {button.map(item => (
                  <Col span={12} key={item.key}>
                    <Button
                      type="primary"
                      size="small"
                      onClick={item.onclick}
                      disabled={item.disabled}
                    >
                      <Icon type={item.type} />
                      {item.title}
                    </Button>
                  </Col>
                ))}
              </Row>
            </ButtonGroup>
            {/* <hr className="divider" /> */}
            <Divider />
            <Input
              placeholder="Find a Pokemon by Type"
              onChange={handleSearchPokemon}
            />
          </Col>
          <Col
            span={20}
            style={{
              borderLeft: "1px solid red"
            }}
          >
            <ListPokemon state={state} pokemons={pokemons} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
