import { useState, useEffect } from "react";
import { Skeleton, List, Card, Icon, Avatar, Modal } from "antd";

const { Meta } = Card;

export default function({ state }) {
  const { isLoading, isError } = state;
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      const { details } = state;
      // console.log(details);
      setPokemons(details);
    }
  }, [state]);

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

  return (
    <React.Fragment>
      <Modal visible={modal} onCancel={hideModal}>
        {/**
         *** SET MODAL DI SINI UNTUK MENCEGAH UNDEFINED PADA SAAT LOAD MODAL
         **/}
        {modal && (
          <Card
            style={{ width: 300 }}
            cover={<img alt="example" src={pokemon.profile_picture} />}
            actions={[<Icon type="setting" key="setting" />]}
          >
            <Meta
              avatar={<Avatar src={pokemon.detail.sprites.front_default} />}
              title={pokemon.name}
              description="This is the description"
              style={{ textTransform: "capitalize" }}
            />
          </Card>
        )}
      </Modal>
      <List
        style={{ paddingRight: 15 }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={isLoading ? dummy : pokemons}
        renderItem={item => (
          <List.Item
            onClick={() => showModal(item)}
            style={{ cursor: "pointer" }}
          >
            <Card>
              <Skeleton loading={isLoading} avatar active>
                <Meta
                  avatar={<Avatar src={item.profile_picture} />}
                  title={item.name}
                  description="This is the description"
                  style={{ textTransform: "capitalize" }}
                />
              </Skeleton>
            </Card>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
}
