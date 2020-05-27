import * as Actions from "./ActionTypes.js";

export const addData = (state = { isLoading: true, errMess: "" }, action) => {
    switch (action.type) {
        case Actions.MODIFY:
            console.log("MOdify asked " + action.payload);
            return { isLoadig: false, data: action.payload.data, errMess: action.payload.errMess }
        default:
            return state;
    }
}
export const Selected = (state = { selected: "All" }, action) => {
    switch (action.type) {
        case Actions.SET_SELECTED:
            return { selected: action.payload }
        default:
            return state;
    }
}

export const Cart = (state = { inCartData: [], count: 0 }, action) => {
    switch (action.type) {
        case Actions.SET_IN_CART:
            return { inCartData: action.payload, count: action.payload.length }
        default:
            return state;
    }
}