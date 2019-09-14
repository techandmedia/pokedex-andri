import { useState, useEffect } from "react";
import { Skeleton, List, Card, Icon, Avatar } from "antd";

const { Meta } = Card;

export default function({ state }) {
  const { isLoading, isError } = state;
  const [pokemon, setPokomen] = useState([]);

  // next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"

  useEffect(() => {
    if (!isLoading && !isError) {
      const { count, next, previous, results, details } = state;
      console.log(details);
      setPokomen(details);
    }
  }, [state]);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(pokemon);
    }
  }, [pokemon]);

  const dummy = [];
  for (let i = 0; i < 20; i++) {
    dummy.push({ key: i, name: "", profile_picture: "" });
  }

  const gridStyle = {
    width: "25%",
    textAlign: "center"
  };

  return (
    <List
      style={{ paddingRight: 15 }}
      grid={{ gutter: 16, column: 4 }}
      dataSource={isLoading ? dummy : pokemon}
      renderItem={item => (
        <List.Item>
          <Card
            // style={{ width: 300, margin: 2 }}
            actions={[
              <Icon type="setting" key="setting" />,
              <Icon type="edit" key="edit" />,
              <Icon type="ellipsis" key="ellipsis" />
            ]}
          >
            <Skeleton loading={isLoading} avatar active>
              <Meta
                avatar={<Avatar src={item.profile_picture} />}
                title={item.name}
                description="This is the description"
              />
            </Skeleton>
          </Card>
        </List.Item>
      )}
    />
  );
}
