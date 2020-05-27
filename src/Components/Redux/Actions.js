import * as Actions from './ActionTypes';
import Data from "../Assets/HomeProducts";
// export const baseURL = "https://api.jsonbin.io/b/5ece2154a2a6e10f7bc6be1b/";
// export const baseURL = "/HomeProducts.json";
//export const baseURL = "http://localhost:3001/";


export const fetchData = () => dispatch => {
    dispatch({
        type:Actions.MODIFY,
        payload:{
            errMess: "",
            data: Data.MainData
        }
    })
    // fetch(baseURL + "MainData")
    //     .then(res => res.json())
    //     .then(res => console.log(res.MainData))
    //     .then(r => dispatch({
    //         type: Actions.MODIFY,
    //         payload: {
    //             errMess: "",
    //             data: r
    //         }
    //     }))
        // .catch(e => dispatch({
        //     type: Actions.MODIFY,
        //     payload: {
        //         data: null,
        //         errMess: "Network Error Try again later."
        //     }
        // }));
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
