import { useEffect, useState, useReducer } from "react";
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Table,
  Row,
  Col
} from "antd";

import useFetchData from "./utils/getTableData";
import ListPokemon from "./components/List-Pokemon";

const FormItem = Form.Item;
const Option = Select.Option;

export default function App() {
  const [state] = useFetchData("https://pokeapi.co/api/v2/pokemon");

  return (
    <div style={{ marginTop: 50 }}>
      <Row gutter={16}>
        <Col
          span={4}
          style={{
            borderRight: "1px solid red",
            paddingLeft: 30,
            paddingRight: 20
          }}
        >
          Filter Area
          <Form layout="horizontal">
            <FormItem label="Input Number">
              <InputNumber
                size="large"
                min={1}
                max={10}
                style={{ width: 100 }}
                defaultValue={3}
                name="inputNumber"
              />
              <a href="#">Link</a>
            </FormItem>

            <FormItem label="Select">
              <Select
                size="large"
                defaultValue="lucy"
                style={{ width: 192 }}
                name="select"
              >
                <Option value="jack">jack</Option>
                <Option value="lucy">lucy</Option>
                <Option value="disabled" disabled>
                  disabled
                </Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>
            </FormItem>

            <FormItem label="DatePicker">
              <DatePicker name="startDate" />
            </FormItem>
            <FormItem style={{ marginTop: 48 }}>
              <Button size="large" type="primary" htmlType="submit">
                OK
              </Button>
              <Button size="large" style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </FormItem>
          </Form>
        </Col>
        <Col span={20}>
          <ListPokemon state={state} />
        </Col>
      </Row>
    </div>
  );
}
