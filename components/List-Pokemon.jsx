import { useState, useEffect } from "react";
import { Skeleton, List, Card, Icon, Avatar, Modal } from "antd";

const { Meta } = Card;

export default function({ state, pokemons }) {
  const { isLoading, isError } = state;
  const [pokemon, setPokemon] = useState("");
  const [modal, setModal] = useState(false);

  // ADDING DUMMY TO CREATE A LOADING EFFECT
  const dummy = [];
  for (let i = 0; i < 20; i++) {
    dummy.push({ key: i, name: "", profile_picture: "" });
  }

  function showModal(item) {
    setModal(true);
    setPokemon(item);
    console.log(item);
  }

  function hideModal() {
    setModal(false);
  }

  const Description = () => {
    return (
      <React.Fragment>
        <p>Type: {pokemon.detail.types[0].type.name}</p>
        <p>Ability-1: {pokemon.detail.abilities[0].ability.name}</p>
        <p>Move-1: {pokemon.detail.moves[0].move.name}</p>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Modal visible={modal} onCancel={hideModal}>
        {/**
         *** SET MODAL DI SINI UNTUK MENCEGAH UNDEFINED PADA SAAT LOAD MODAL
         **/}
        {modal && (
          <Card
            // style={{ width: 300 }}
            cover={<img alt="example" src={pokemon.profile_picture} />}
            actions={[<Icon type="setting" key="setting" />]}
          >
            <Meta
              avatar={<Avatar src={pokemon.detail.sprites.front_default} />}
              title={pokemon.name}
              description={<Description />}
              style={{ textTransform: "capitalize" }}
            />
          </Card>
        )}
      </Modal>
      <List
        style={{ paddingRight: 15 }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={isLoading ? dummy : pokemons}
        renderItem={item => {
          console.log(item);
          return (
            <List.Item
              onClick={() => showModal(item)}
              style={{ cursor: "pointer" }}
            >
              <Card>
                <Skeleton loading={isLoading} avatar active>
                  <Meta
                    avatar={<Avatar src={item.profile_picture} />}
                    title={item.name}
                    description={
                      !isLoading && `Type: ${item.detail.types[0].type.name}`
                    }
                    style={{ textTransform: "capitalize" }}
                  />
                </Skeleton>
              </Card>
            </List.Item>
          );
        }}
      />
    </React.Fragment>
  );
}
