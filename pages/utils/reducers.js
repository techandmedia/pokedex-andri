function buttonsReducer(_, action) {
  // console.log(action);
  const { type, refetch, previous, next } = action;
  switch (type) {
    case "INIT":
      return {
        pokemon: [
          {
            key: 1,
            title: "Previous",
            type: "left",
            disabled: true
          },
          { key: 2, title: "Next", type: "right", disabled: false }
        ]
      };
    case "BUTTONS":
      if (previous === null) {
        return {
          pokemon: [
            {
              key: 1,
              title: "Previous",
              type: "left",
              disabled: true
            },
            {
              key: 2,
              title: "Next",
              type: "right",
              disabled: false,
              onclick: () => refetch(next)
            }
          ]
        };
      } else if (next === null) {
        return {
          pokemon: [
            {
              key: 1,
              title: "Previous",
              type: "left",
              disabled: false,
              onclick: () => refetch(previous)
            },
            {
              key: 2,
              title: "Next",
              type: "right",
              disabled: true
            }
          ]
        };
      } else {
        return {
          pokemon: [
            {
              key: 1,
              title: "Previous",
              type: "left",
              disabled: false,
              onclick: () => refetch(previous)
            },
            {
              key: 2,
              title: "Next",
              type: "right",
              disabled: false,
              onclick: () => refetch(next)
            }
          ]
        };
      }
    default:
      throw new Error();
  }
}

export { buttonsReducer };
