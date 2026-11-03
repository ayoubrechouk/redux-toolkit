import {configureStore} from '@reduxjs/toolkit';
import produitReducer from './Création-Slice';


export const store = configureStore({
    reducer: {
        produits: produitReducer
    }
});

