import { useState, useEffect } from "react";
import { getSmartphones } from "./Smartphone";
import { supprimerSmartphone } from "./Smartphone";

const Cart = () => {
    const [products, setProducts] = useState([]); // État pour stocker les smartphones
    const [selectedProduct, setSelectedProduct] = useState(null);

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
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
                                        className="inline-block px-3 py-2 mt-5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 shadow-sm"
                                    >
                                        Supprimer
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="bg-white max-w-4xl mx-auto p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-around gap-6">
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded-full">X</button>
                        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                            <img src="" alt={selectedProduct.nom} className="rounded-lg w-48 md:w-64 hover:p-5 transition-all duration-300" />
                        </div>
                        <div className="w-full md:w-3/5 overflow-x-auto">
                            <table className="w-full border-collapse">
                                <tr><th className="border p-3 bg-sky-600 text-white">Caractéristique</th><th className="border p-3 bg-sky-600 text-white">Détails</th></tr>
                                <tr><td className="border p-3"><strong>Nom</strong></td><td className="border p-3">{selectedProduct.nom}</td></tr>
                                <tr><td className="border p-3"><strong>Prix</strong></td><td className="border p-3">{selectedProduct.prix} FCFA</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Cart;

