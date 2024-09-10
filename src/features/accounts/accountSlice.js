const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    //MY OWN CODE WHICH IS BEAUTIFUL
    //   if (state.loan < 1) return state;
    //   return {
    //     ...state,
    //     loan: state.loan - action.payload.amount,
    //     balance: state.balance - action.payload.amount,
    //     loanPurpose: "",
    //   };

    default:
      return state;
  }
}

export const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
export const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
export const requestLoan = (amount, purpose) => {
  return { type: "account/requestLoan", payload: { amount, purpose } };
};
export const payLoan = () => {
  return { type: "account/payLoan" };
};
