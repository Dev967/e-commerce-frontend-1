import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { addData, Cart, Selected, addReviews } from './MainDataReducer';
import thunk from 'redux-thunk';
import { createForms } from 'react-redux-form';

const initailFormState = {
    FullName: "",
    Review: "",
    date: "",
    Rating: ""
}
const rootReducer = combineReducers({
    MainData: addData,
    Cart: Cart,
    Selected: Selected,
    ...createForms({
        ReviewForm: initailFormState
    })
});
const MyStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default MyStore;