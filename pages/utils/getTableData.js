import { useState, useEffect, useReducer } from "react";

import axios from "axios";

function dataReducer(state, action) {
  console.log(state);
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INIT":
      return { ...state };
    case "FETCH_SUCCESS":
      return { isLoading: false, isError: false, payload };
    case "FETCH_FAILURE":
      return {
        isLoading: false,
        isError: true,
        message: "Failed to retrieve data"
      };
    default:
      throw new Error();
  }
}

export default function useFetchData(API) {
  const [data, dispatch] = useReducer(dataReducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  useEffect(() => {
    let didCancel = false;
    async function getData() {
      if (!didCancel) {
        try {
          let result = await axios.get("https://pokeapi.co/api/v2/pokemon");
          console.log(result);
          dispatch({ type: "FETCH_SUCCESS", payload: result });
        } catch (error) {
          console.log(error);
        }
      }
    }

    getData();
  }, []);

  return [data];
}
