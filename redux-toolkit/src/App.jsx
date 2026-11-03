import {Route, Routes, Navigate} from "react-router-dom";
import List from './components/List';
import ProductForm from './components/ProductForm';


export default function App() {
    return (
        <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:ref" element={<ProductForm />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
    }