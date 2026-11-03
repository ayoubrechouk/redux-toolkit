import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit2, FiImage, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import {
  filtrerParCategorie,
  rechercherProduit,
  supprimerProduit,
} from '../Création-Slice';

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px',
    color: '#172033',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '24px',
  },
  title: { margin: 0, fontSize: '28px', fontWeight: 700 },
  addButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#2563eb',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '18px',
  },
  search: {
    position: 'relative',
    flex: '1 1 260px',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    color: '#64748b',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '42px',
    padding: '10px 12px 10px 38px',
    border: '1px solid #dbe2ea',
    borderRadius: '8px',
    background: '#fff',
    color: '#172033',
    font: 'inherit',
  },
  select: {
    minHeight: '42px',
    minWidth: '180px',
    padding: '10px 12px',
    border: '1px solid #dbe2ea',
    borderRadius: '8px',
    background: '#fff',
    color: '#172033',
    font: 'inherit',
  },
  tableCard: {
    overflowX: 'auto',
    border: '1px solid #e5eaf0',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  heading: {
    padding: '14px 16px',
    borderBottom: '1px solid #e5eaf0',
    background: '#f8fafc',
    color: '#64748b',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  cell: {
    padding: '14px 16px',
    borderBottom: '1px solid #eef2f6',
    fontSize: '14px',
    verticalAlign: 'middle',
  },
  thumbnail: {
    position: 'relative',
    display: 'grid',
    width: '56px',
    height: '56px',
    placeItems: 'center',
    overflow: 'hidden',
    borderRadius: '8px',
    background: '#f1f5f9',
    color: '#94a3b8',
  },
  productImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  category: {
    display: 'inline-block',
    padding: '5px 9px',
    borderRadius: '999px',
    background: '#eff6ff',
    color: '#1d4ed8',
    fontSize: '12px',
    fontWeight: 600,
  },
  actions: { display: 'flex', gap: '8px' },
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    border: '1px solid #dbe2ea',
    borderRadius: '8px',
    background: '#fff',
    color: '#475569',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  deleteButton: {
    color: '#dc2626',
  },
  emptyState: {
    padding: '32px 16px',
    color: '#64748b',
    textAlign: 'center',
  },
};

export default function List() {
  const dispatch = useDispatch();
  const { produits, categorieFiltre, searchQuery } = useSelector(
    (state) => state.produits,
  );
  const produitsFiltres = produits.filter((produit) => {
    const matchCategorie = categorieFiltre
      ? produit.categorie === categorieFiltre
      : true;
    const matchRecherche = searchQuery
      ? (produit.intutile ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchCategorie && matchRecherche;
  });

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Liste des produits</h1>
        <Link to="/add" style={styles.addButton}>
          <FiPlus aria-hidden="true" />
          Ajouter un produit
        </Link>
      </header>

      <section style={styles.toolbar} aria-label="Filtres des produits">
        <label style={styles.search}>
          <FiSearch style={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            placeholder="Rechercher par intitulé..."
            aria-label="Rechercher par intitulé"
            value={searchQuery}
            onChange={(event) => dispatch(rechercherProduit(event.target.value))}
            style={styles.input}
          />
        </label>
        <select
          aria-label="Filtrer par catégorie"
          value={categorieFiltre}
          onChange={(event) => dispatch(filtrerParCategorie(event.target.value))}
          style={styles.select}
        >
          <option value="">Toutes les catégories</option>
          <option value="Informatique">Informatique</option>
          <option value="Meuble">Meuble</option>
        </select>
      </section>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th scope="col" style={styles.heading}>Photo</th>
              <th scope="col" style={styles.heading}>Réf</th>
              <th scope="col" style={styles.heading}>Intitulé</th>
              <th scope="col" style={styles.heading}>Prix</th>
              <th scope="col" style={styles.heading}>Catégorie</th>
              <th scope="col" style={styles.heading}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produitsFiltres.map((produit) => (
              <tr key={produit.ref}>
                <td style={styles.cell}>
                  <div style={styles.thumbnail}>
                    <FiImage aria-hidden="true" />
                    <img
                      src={produit.photo}
                      alt={produit.intutile}
                      style={styles.productImage}
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  </div>
                </td>
                <td style={styles.cell}>{produit.ref}</td>
                <td style={styles.cell}>{produit.intutile}</td>
                <td style={styles.cell}>{produit.prix} DH</td>
                <td style={styles.cell}>
                  <span style={styles.category}>{produit.categorie}</span>
                </td>
                <td style={styles.cell}>
                  <div style={styles.actions}>
                    <Link
                      to={`/edit/${produit.ref}`}
                      aria-label={`Modifier ${produit.intutile}`}
                      title="Modifier"
                      style={styles.actionButton}
                    >
                      <FiEdit2 aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Supprimer ${produit.intutile}`}
                      title="Supprimer"
                      onClick={() => dispatch(supprimerProduit(produit.ref))}
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                    >
                      <FiTrash2 aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {produitsFiltres.length === 0 && (
              <tr>
                <td colSpan="6" style={styles.emptyState}>
                  Aucun produit ne correspond à votre recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}