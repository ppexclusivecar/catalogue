// pages/catalogue.js
'use client';
import { useEffect, useState } from 'react';

// Définir une interface pour les éléments du catalogue
interface CatalogueItem {
  Num: number;
  Description: string;
  Nom: string;
  CtaText: string;
  CtaLink: string;
  Brand: string;
  Model: string;
  Price: string;
  Kilometers: string;
  Color: string;
  Fuel: string;
  Gearbox: string;
  Engine: string;
  Doors: string;
  Year: string;
  Image: string;
}

export default function CataloguePage() {
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaLink, setCtaLink] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [color, setColor] = useState('');
  const [fuel, setFuel] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [engine, setEngine] = useState('');
  const [doors, setDoors] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState<File | null>(null); // État pour l'image

  useEffect(() => {
    fetch('http://localhost:5000/api/catalogue')
      .then((res) => res.json())
      .then((data: CatalogueItem[]) => {
        setCatalogueItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(); // Utiliser FormData pour l'upload de fichiers
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('ctaText', ctaText);
    formData.append('ctaLink', ctaLink);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('price', price);
    formData.append('kilometers', kilometers);
    formData.append('color', color);
    formData.append('fuel', fuel);
    formData.append('gearbox', gearbox);
    formData.append('engine', engine);
    formData.append('doors', doors);
    formData.append('year', year);
    if (image) {
      formData.append('image', image); // Ajouter l'image au formData
    }

    const response = await fetch('http://localhost:5000/api/catalogue', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const newItem = await response.json();
      setCatalogueItems((prev) => [...prev, newItem]);
      // Réinitialiser tous les champs
      setNom('');
      setDescription('');
      setCtaText('');
      setCtaLink('');
      setBrand('');
      setModel('');
      setPrice('');
      setKilometers('');
      setColor('');
      setFuel('');
      setGearbox('');
      setEngine('');
      setDoors('');
      setYear('');
      setImage(null); // Réinitialiser le champ d'image
    } else {
      console.error('Erreur lors de l\'ajout de l\'élément');
    }
  };

  const handleDeleteItem = async (num: number) => {
    const response = await fetch(`http://localhost:5000/api/catalogue/${num}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setCatalogueItems((prev) => prev.filter((item) => item.Num !== num));
    } else {
      console.error('Erreur lors de la suppression de l\'élément');
    }
  };

  return (
    <div className='container'>
      <h1>Catalogue</h1>

      <form onSubmit={handleAddItem}>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="CTA Text" required />
        <input type="text" value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} placeholder="CTA Link" required />
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" required />
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" required />
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={kilometers} onChange={(e) => setKilometers(e.target.value)} placeholder="Kilometers" required />
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" required />
        <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="Fuel" required />
        <input type="text" value={gearbox} onChange={(e) => setGearbox(e.target.value)} placeholder="Gearbox" required />
        <input type="text" value={engine} onChange={(e) => setEngine(e.target.value)} placeholder="Engine" required />
        <input type="text" value={doors} onChange={(e) => setDoors(e.target.value)} placeholder="Doors" required />
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} accept="image/png" required />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {catalogueItems.map((item) => (
          <li key={item.Num}>
            <img src={`/assets/uploads/${item.Image}`} alt={item.Nom} style={{ width: '100px', height: '100px' }} />
            <p>{item.Nom}</p>
            <p>{item.Description}</p>
            <p>{item.Brand} {item.Model}</p>
            <p>{item.Price}</p>
            <p>{item.Kilometers}</p>
            <button onClick={() => handleDeleteItem(item.Num)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
