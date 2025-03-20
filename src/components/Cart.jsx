import { useState, useEffect } from "react";
import { getSmartphones } from "./Smartphone";
import { supprimerSmartphone } from "./Smartphone";
import {editSmartphone} from "./Smartphone";

const Cart = () => {
    const [products, setProducts] = useState([]); // État pour stocker les smartphones
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // Fonction pour récupérer les smartphones
    const fetchSmartphones = async () => {
        try {
            const data = await getSmartphones(); // Attente des données
            setProducts(data); // Stockage dans l'état
        } catch (error) {
            console.error("Erreur lors de la récupération des smartphones :", error);
        }
    };

    // Charger les smartphones au montage du composant
    useEffect(() => {
        fetchSmartphones();
    }, []);

    // Fonction Edit Click
    const handleEditClick = (product) => {
        setEditingProduct(product);
    };

    // Evenement d'edition
    const handleSubmit = async () => {
        await editSmartphone(editingProduct.id, editingProduct);
        setEditingProduct(null);
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    };

    //Evenement de suppression
    const handleDelete = async (event, id) => {
        event.preventDefault(); // Empêche le rafraîchissement de la page

        const isConfirmed = window.confirm("Voulez-vous vraiment supprimer ce smartphone ?");

        if (isConfirmed) {
            try {
                await supprimerSmartphone(id); // Appelle la fonction de suppression
                setProducts(products.filter(product => product.id !== id)); // Met à jour la liste après suppression
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };


    return (
        <main>
            {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="shadow-lg md:h-80 sm:h-full rounded-md">
                            <a href="#" onClick={() => setSelectedProduct(product)}>
                                <img src={product.image} alt={product.nom} className="md:h-50 w-full object-contain sm:h-30 p-3 hover:p-0" />
                            </a>
                            <div className="p-4">
                                <div className="flex justify-between">
                                    <p>{product.nom}</p>
                                    <p>{product.prix} FCFA</p>
                                </div>
                                <div className="flex justify-end">
                                    <a href="#" onClick={(e) => handleDelete(e, product.id)}
                                        className="inline-block px-3 py-2 mt-5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 shadow-sm">
                                        Supprimer
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>*/}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-sky-900 text-white text-left">
                                <th className="p-3 border">Nom</th>
                                <th className="p-3 border">Prix</th>
                                <th className="p-3 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-100 transition-all">
                                    <td className="p-3 border"><a href="#" onClick={() => setSelectedProduct(product)}>{product.nom}</a></td>
                                    <td className="p-3 border">{product.prix} FCFA</td>
                                    <td className="p-3 border text-center flex items-center justify-center space-x-2">
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition-all"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, product.id)}
                                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={() => setSelectedProduct(null)}>
                    <div className="w-110 bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md items-center justify-around gap-6 relative">
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded-full">X</button>
                        <div className="w-full overflow-x-auto mt-10">
                            <table className="w-full border-collapse">
                                <tr><th className="border p-3 bg-sky-600 text-white">Caractéristique</th><th className="border p-3 bg-sky-600 text-white">Détails</th></tr>
                                <tr><td className="border p-3"><strong>Nom</strong></td><td className="border p-3">{selectedProduct.nom}</td></tr>
                                <tr><td className="border p-3"><strong>Prix</strong></td><td className="border p-3">{selectedProduct.prix} FCFA</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} >
                    <div className="bg-white p-2 rounded-lg shadow-lg w-200 max-h-full">
                        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 md:p-8"> {/*SUBMIT ECOUTE */}
                            <div className="space-y-6 sm:space-y-8">
                                <div className="border-b border-gray-700 pb-6 sm:pb-8">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Informations du Smartphone</h2>
                                    <p className="mt-2 text-sm text-gray-400">Renseignez les détails du smartphone à modifier.</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                                        <div className="col-span-1 sm:col-span-2">
                                            <label for="nom" className="block text-sm font-medium text-gray-100">Nom</label>
                                            <input type="text" id="nom" name="nom"
                                                className="mt-1 sm:mt-2 block w-full rounded-md bg-gray-700 px-3 py-2 sm:px-4 text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Nom du smartphone" value={editingProduct.nom}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, nom: e.target.value })} />
                                        </div>

                                        <div>
                                            <label for="prix" class="block text-sm font-medium text-gray-100">Prix
                                                (FCFA)</label>
                                            <input type="number" id="prix" name="prix"
                                                className="mt-1 sm:mt-2 block w-full rounded-md bg-gray-700 px-3 py-2 sm:px-4 text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                                value={editingProduct.prix}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, prix: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center sm:justify-end">
                                    <button type="submit"
                                        className="w-full sm:w-auto rounded-md bg-blue-500 px-4 py-2 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Modifier
                                    </button>
                                </div>
                            </div>
                        </form>
                        <button className="px-4 py-2 my-3 text-white bg-red-500 rounded hover:bg-red-600" onClick={() => setEditingProduct(null)}>Fermer</button>
                    </div>
                </div>)}
                {/* <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Modifier le téléphone</h2>

                        <label className="block mb-2">Nom :</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            value={editingProduct.nom}
                            onChange={(e) => setEditingProduct({ ...editingProduct, nom: e.target.value })}
                        />

                        <label className="block mt-4 mb-2">Prix :</label>
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={editingProduct.prix}
                            onChange={(e) => setEditingProduct({ ...editingProduct, prix: e.target.value })}
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>*/}
            
        </main>
    );
};

export default Cart;

