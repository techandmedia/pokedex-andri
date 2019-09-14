function buttonsReducer(state, action) {
  // console.log(action);
  const { type, refetch, previous, next } = action;
  switch (type) {
    case "INIT":
      return [
        {
          key: 1,
          title: "Previous",
          type: "left",
          disabled: true
        },
        { key: 2, title: "Next", type: "right", disabled: false }
      ];
    case "PREVIOUS_NULL":
      return [
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
      ];
    case "NEXT_NULL":
      return [
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
      ];
    case "NOT_NULL":
      return [
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
      ];

    default:
      throw new Error();
  }
}
// export default function JustInCase() {
//   return <h1>YO</h1>;
// }
export default buttonsReducer;
