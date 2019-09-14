import { useEffect, useState, useReducer } from "react";
import { Button, Icon, Row, Col, Modal } from "antd";

import useFetchData from "./utils/getTableData";
import { buttonsReducer } from "./utils/reducers";
import ListPokemon from "./components/List-Pokemon";

export default function App() {
  const [state, refetch] = useFetchData("https://pokeapi.co/api/v2/pokemon");
  const ButtonGroup = Button.Group;
  const [button, dispatchButton] = useReducer(buttonsReducer, {
    pokemon: [
      {
        key: 1,
        title: "Previous",
        type: "left",
        disabled: true
      },
      { key: 2, title: "Next", type: "right", disabled: false }
    ]
  });

  useEffect(() => {
    dispatchButton({ type: "INIT" });
  }, []);

  useEffect(() => {
    if (!state.isLoading && !state.isError) {
      const { previous, next } = state;
      dispatchButton({ type: "BUTTONS", refetch, previous, next });
    }
  }, [state]);

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
                {button.pokemon.map(item => (
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
          </Col>
          <Col
            span={20}
            style={{
              borderLeft: "1px solid red"
            }}
          >
            <ListPokemon state={state} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
