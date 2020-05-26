import * as Actions from './ActionTypes';
import MyStore from './MyStore';
export const baseURL = "https://api.jsonbin.io/b/5ecd1f0c3beeed0a3f1a702f/";


export const fetchData = () => dispatch => {
    fetch(baseURL + "MainData")
        .then(res => res.json())
        .then(r => dispatch({
            type: Actions.MODIFY,
            payload: {
                errMess: "",
                data: r
            }
        }))
        .catch(e => dispatch({
            type: Actions.MODIFY,
            payload: {
                data: null,
                errMess: "Network Error Try again later."
            }
        }));
}

export const modify = c => dispatch => {
    let newData = c.filter(e => { return e.in_cart });
    dispatch(setCount(newData));
    return ({
        type: Actions.MODIFY,
        payload: {
            data: c,
            errMess: ""
        }
    })

}

export const setCount = (e) => {
    return ({
        type: Actions.SET_IN_CART,
        payload: e
    });
}

export const setSelected = s => {
    return ({
        type: Actions.SET_SELECTED,
        payload: s
    })
}