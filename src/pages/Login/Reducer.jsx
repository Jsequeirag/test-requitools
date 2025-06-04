export const initialState = {
  formValues: { employeeId: 784013, password: 123456 },
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_VALUES":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
