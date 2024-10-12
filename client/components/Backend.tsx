'use client';
// Exemple dans un composant React
import { useEffect, useState } from 'react';

// Définir une interface pour les éléments du catalogue
interface CatalogueItem {
  Num: number;
  Nom: string;
}

// Exporter le tableau de cartes
export const cataloguecards: { num: number; nom: string }[] = [];

export default function Backend() {
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]); // Typage des éléments ici

  useEffect(() => {
    fetch('http://localhost:5000/api/catalogue')
      .then((res) => res.json())
      .then((data: CatalogueItem[]) => { // Typage des données récupérées
        setCatalogueItems(data);
        // Formater les données pour l'export
        const formattedData = data.map((item: CatalogueItem) => ({ // Typage ici aussi
          num: item.Num,
          nom: item.Nom,
        }));
        // Exporter les données
        cataloguecards.push(...formattedData); // Ajoutez les données formatées au tableau cataloguecards
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='h-screen w-full justify-center relative flex flex-col items-center'>
      {catalogueItems.map((item) => (
        <div key={item.Num}>
          <p>{item.Nom}, {item.Num}</p>
          
        </div>
      ))}
    </div>
  );
}
