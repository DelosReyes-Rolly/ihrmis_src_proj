import { configureStore } from "@reduxjs/toolkit";
import userReducer from './../reducers/users_slice';
import mobileViewReducer from './../reducers/mobile_view_slice';
import loadingReducer from './../reducers/loading_slice';
import popupResponceReducer from "../reducers/popup_response";

const store = configureStore({
    reducer: {
        user: userReducer,
        mobileView: mobileViewReducer,
        load: loadingReducer,
        popupResponse: popupResponceReducer,
    }
}); 

export default store;
