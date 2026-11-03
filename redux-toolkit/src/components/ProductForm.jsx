import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ajouterProduit, modifierProduit } from '../Création-Slice';

export default function ProductForm() {
    const { ref } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const produits = useSelector((state) => state.produits.produits);
    const [produit, setProduit] = useState(() => {
        if (ref) {
            const produitToEdit = produits.find((p) => p.ref === ref);
            if (produitToEdit) {
                return produitToEdit;
            }
        }
        
        return {
            ref: '',
            intutile: '',
            prix: '',
            categorie: '',
            photo: ''
        };
    });
    
    const handleChange = (e) => {
        setProduit({ ...produit, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ref) {
            dispatch(modifierProduit(produit));
        } else {
            dispatch(ajouterProduit(produit));
        }
        navigate('/');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="ref" value={produit.ref} onChange={handleChange} placeholder="Référence" required />
            <input type="text" name="intutile" value={produit.intutile} onChange={handleChange} placeholder="Intitulé" required />
            <input type="number" name="prix" value={produit.prix} onChange={handleChange} placeholder="Prix" required />
            <input type="text" name="categorie" value={produit.categorie} onChange={handleChange} placeholder="Catégorie" required />
            <input type="text" name="photo" value={produit.photo} onChange={handleChange} placeholder="Photo URL" required />
            <button type="submit">{ref ? 'Modifier' : 'Ajouter'}</button>
        </form>
    );




}