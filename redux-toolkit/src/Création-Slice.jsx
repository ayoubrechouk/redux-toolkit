import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  produits: [
    { ref: '1', intutile: 'PC Portable Dell', prix: 8500, categorie: 'Informatique', photo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=160&q=80' },
    { ref: '2', intutile: 'Bureau', prix: 1200, categorie: 'Meuble', photo: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=160&q=80' },
    { ref: '3', intutile: 'Chaise', prix: 300, categorie: 'Meuble', photo: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=160&q=80' },
    { ref: '4', intutile: 'Imprimante HP', prix: 1500, categorie: 'Informatique', photo: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=160&q=80' }
  ],
  categorieFiltre: '',
  searchQuery: ''
};
const produitSlice = createSlice({
  name: 'produits',
  initialState,
  reducers: {
    ajouterProduit: (state, action) => {
      state.produits.push(action.payload);
    },
    supprimerProduit: (state, action) => {
      state.produits = state.produits.filter(produit => produit.ref !== action.payload);
    },
    modifierProduit: (state, action) => {
      const index = state.produits.findIndex(produit => produit.ref === action.payload.ref);
      if (index !== -1) {
        state.produits[index] = action.payload;
      }
    },
    filtrerParCategorie: (state, action) => {
      state.categorieFiltre = action.payload;
    },
    rechercherProduit: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { ajouterProduit, supprimerProduit, modifierProduit, filtrerParCategorie, rechercherProduit } = produitSlice.actions;

export default produitSlice.reducer;