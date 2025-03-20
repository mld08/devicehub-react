import { useState } from "react";
import { ajouterSmartphone } from "./Smartphone";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nom, setNom] = useState("");
    const [prix, setPrix] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nom || !prix) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const nouveauSmartphone = { nom, prix: parseFloat(prix) };
        await ajouterSmartphone(nouveauSmartphone);

        setNom(""); // Réinitialiser le formulaire
        setPrix("");
        setIsModalOpen(false); // Fermer le modal après ajout
    };

    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <h1 className="text-3xl font-bold tracking-tight text-white">DeviceHub</h1>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Smartphones</a>
                                <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setIsModalOpen(true)}>Ajouter</a>
                            </div>
                        </div>
                        {/* Bouton du menu hamburger */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                                <img src={isMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"} alt="Menu" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            <a href="/" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Smartphones</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setIsModalOpen(true)}>Ajouter</a>
                        </div>
                    </div>
                )}
            </nav>
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Listes smartphones</h1>
                    <button className="group ml-auto block max-w-xs space-y-3 rounded-lg bg-sky-600 p-4 shadow-lg ring-1 ring-gray-900/5 hover:bg-sky-800 hover:ring-sky-500" onClick={() => setIsModalOpen(true)}>
                        <div className="flex items-center space-x-3">
                            <div className="md:text-sm sm:text-xs font-semibold text-gray-900 group-hover:text-white dark:text-white">
                                Ajouter smartphone
                            </div>
                        </div>
                    </button>
                </div>
            </header>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} >
                    <div className="bg-white p-2 rounded-lg shadow-lg w-200 max-h-full">
                        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-3 sm:p-6 md:p-8"> {/*SUBMIT ECOUTE */}
                            <div className="space-y-6 sm:space-y-8">
                                <div className="border-b border-gray-700 pb-6 sm:pb-8">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Informations du Smartphone</h2>
                                    <p className="mt-2 text-sm text-gray-400">Renseignez les détails du smartphone à ajouter.</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                                        <div className="col-span-1 sm:col-span-2">
                                            <label for="nom" className="block text-sm font-medium text-gray-100">Nom</label>
                                            <input type="text" id="nom" name="nom"
                                                className="mt-1 sm:mt-2 block w-full rounded-md bg-gray-700 px-3 py-2 sm:px-4 text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Nom du smartphone" value={nom} onChange={(e) => setNom(e.target.value)}/>
                                        </div>

                                        <div>
                                            <label for="prix" class="block text-sm font-medium text-gray-100">Prix
                                                (FCFA)</label>
                                            <input type="number" id="prix" name="prix"
                                                className="mt-1 sm:mt-2 block w-full rounded-md bg-gray-700 px-3 py-2 sm:px-4 text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Prix en FCFA"value={prix} onChange={(e) => setPrix(e.target.value)} />
                                        </div>

                                        <div class="col-span-1 sm:col-span-2 lg:col-span-3">
                                            <label for="photo" class="block text-sm font-medium text-gray-100">Photo</label>
                                            <div
                                                class="mt-1 sm:mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-y-2 gap-x-3">
                                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"
                                                    aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <input type="file" id="photo" name="photo"
                                                    className="w-full rounded-md bg-gray-700 text-sm text-gray-100 file:border-0 file:bg-gray-600 file:px-3 file:py-2 sm:file:px-4 file:text-white hover:file:bg-gray-500 focus:ring-2 focus:ring-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center sm:justify-end">
                                    <button type="submit"
                                        className="w-full sm:w-auto rounded-md bg-blue-500 px-4 py-2 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </form>
                        <button className="px-4 py-2 my-3 text-white bg-red-500 rounded hover:bg-red-600" onClick={() => setIsModalOpen(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
