import { configureStore } from "@reduxjs/toolkit";
import userReducer from './../reducers/users_slice';
import mobileViewReducer from './../reducers/mobile_view_slice';
import loadingReducer from './../reducers/loading_slice';

const store = configureStore({
    reducer: {
        user: userReducer,
        mobileView: mobileViewReducer,
        load: loadingReducer,
    }
}); 


export default store;
