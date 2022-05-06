import { createSlice } from '@reduxjs/toolkit';
import { implodeArray } from '../../helpers/explode_implode';

export const recruitmentSlice = createSlice({

    initialState: {
        data: [],
        email_recepients: "",

    }
});
