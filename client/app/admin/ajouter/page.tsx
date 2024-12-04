'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Link from 'next/link';

export default function Ajouter() {
  // Tous les hooks doivent être déclarés en haut du composant
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
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
  const [image, setImage] = useState<File | null>(null);
  const [removeBackground, setRemoveBackground] = useState(false); // Ajout du hook pour la case à cocher
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ppexclusive-server.vercel.app/api/login', { password });
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setError('');
    } catch {
      setError('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Accès Administrateur</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Connexion
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    );
  }

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
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
      formData.append('image', image);
    }
    formData.append('removeBackground', removeBackground.toString()); // Ajouter l'info sur la suppression de l'arrière-plan

    const response = await fetch('https://ppexclusive-server.vercel.app/api/catalogue', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    setIsLoading(false);

    if (response.ok) {
      setNom('');
      setDescription('');
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
      setImage(null);
      setRemoveBackground(false);

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      console.error("Erreur lors de l'ajout de l'élément");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-2">Ajouter</h1>

      <form onSubmit={handleAddItem} className="flex flex-col gap-2 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required className="border p-2 rounded" />
          <input type="text" value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} placeholder="CTA Link" required className="border p-2 rounded" />
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" required className="border p-2 rounded" />
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" required className="border p-2 rounded" />
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required className="border p-2 rounded" />
          <input type="text" value={kilometers} onChange={(e) => setKilometers(e.target.value)} placeholder="Kilometers" required className="border p-2 rounded" />
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" required className="border p-2 rounded" />
          <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="Fuel" required className="border p-2 rounded" />
          <input type="text" value={gearbox} onChange={(e) => setGearbox(e.target.value)} placeholder="Gearbox" required className="border p-2 rounded" />
          <input type="text" value={engine} onChange={(e) => setEngine(e.target.value)} placeholder="Engine" required className="border p-2 rounded" />
          <input type="text" value={doors} onChange={(e) => setDoors(e.target.value)} placeholder="Doors" required className="border p-2 rounded" />
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required className="border p-2 rounded" />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="border p-2 rounded h-24 resize-none"
        ></textarea>

        <div className="flex flex-col gap-2">
          <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} accept="image/*" required className="border p-2 rounded" />
          <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={removeBackground}
            onChange={(e) => setRemoveBackground(e.target.checked)}
            className="mr-2"
          />
          <label>Supprimer le fond</label>
        </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-40 mx-auto flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Ajouter"}
          </button>
        </div>
      </form>
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Élément ajouté avec succès !
        </div>
      )}
    </div>
  );
}
