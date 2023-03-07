
import { combineReducers } from "redux";
import userReducers from '../features/userSlice';
import alertReducer from'../features/alertSlice';
const RootReducers = combineReducers({
    userReducers,
    alertReducer
});

export default RootReducers;