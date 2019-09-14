import { useState, useEffect, useReducer } from "react";

import axios from "axios";

function dataReducer(state, action) {
  // console.log(state);
  // console.log(action);
  const { type, payload, details } = action;
  switch (type) {
    case "FETCH_INIT":
      return { ...state };
    case "FETCH_SUCCESS":
      const { count, next, previous, results } = payload;
      return {
        isLoading: false,
        isError: false,
        count,
        next,
        previous,
        results,
        details
      };
    case "FETCH_FAILURE":
      return {
        isLoading: false,
        isError: true,
        message: "Failed to retrieve data",
        status: payload
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
        let result = await axios.get("https://pokeapi.co/api/v2/pokemon");
        try {
          // console.log(result);
          let details = await getDetails(result);
          dispatch({ type: "FETCH_SUCCESS", payload: result, details });
        } catch (error) {
          console.log(error);
          dispatch({ type: "FETCH_FAILURE", payload: result.status });
        }
      }
    }

    async function getDetails(results) {
      let pokemon_length = results.data.results.length;
      const pokemon_details = [];
      for (let i = 0; i < pokemon_length; i++) {
        let temp = await axios.get(results.data.results[i].url);
        pokemon_details.push({
          key: i,
          name: temp.data.name,
          detail: temp.data,
          profile_picture: temp.data.sprites.front_default
        });
      }
      // console.log(pokemon_details);
      return pokemon_details;
    }

    getData();

    return () => {
      didCancel = true;
    };
  }, []);

  return [data];
}
