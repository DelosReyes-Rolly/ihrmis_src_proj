import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./../reducers/users_slice";
import mobileViewReducer from "./../reducers/mobile_view_slice";
import popupResponceReducer from "../reducers/popup_response";
import errorHandlerSlice from "../reducers/error_handler_slice";
import jvscrwReducer from "../reducers/jvscrw_slice";
import plantillaItemReducer from "../reducers/plantilla_item_slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    mobileView: mobileViewReducer,
    popupResponse: popupResponceReducer,
    error: errorHandlerSlice,
    jvsform: jvscrwReducer,
    plantillaItem: plantillaItemReducer,
  },
});

export default store;
