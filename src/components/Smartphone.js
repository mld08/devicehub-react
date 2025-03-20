const API_URL = 'http://localhost:5000/smartphones';

// Ajouter un smartphone
export const ajouterSmartphone = async (smartphone) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smartphone),
      });
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de l'ajout du smartphone", error);
    }
};

// Lister smartphones
export async function getSmartphones() {
  const response = await fetch(API_URL);
  return response.json();
}

//Supprimer
export async function supprimerSmartphone(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
