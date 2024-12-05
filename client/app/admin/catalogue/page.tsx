'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface CatalogueItem {
  Num: number;
  Description: string;
  Nom: string;
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

export default function Catalogue() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [catalogueItems, setCatalogueItems] = useState<CatalogueItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await axios.post('https://server-gilt-ten.vercel.app/api/login', { password });
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      setError('');
    } catch {
      setError('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCatalogueItems = async () => {
        try {
          const response = await fetch('https://server-gilt-ten.vercel.app/api/catalogue');
          const data: CatalogueItem[] = await response.json();
          setCatalogueItems(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchCatalogueItems();
    }
  }, [isAuthenticated]);

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

  const handleDeleteItem = async (num: number) => {
    setIsLoading(true);
    const response = await fetch(`https://server-gilt-ten.vercel.app/api/catalogue/${num}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    setIsLoading(false);
    if (response.ok) {
      setCatalogueItems((prev) => prev.filter((item) => item.Num !== num));
    } else {
      console.error("Erreur lors de la suppression de l'élément");
    }
  };

  const handleArchiveItem = async (num: number) => {
    setIsLoading(true);
    const response = await fetch(`https://server-gilt-ten.vercel.app/api/catalogue/archive/${num}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    setIsLoading(false);
    if (response.ok) {
      setCatalogueItems((prev) => prev.filter((item) => item.Num !== num));
    } else {
      console.error("Erreur lors de l'archivage de l'élément");
    }
  };

  return (
    <div className="container mx-auto p-4">
          {/* Bouton Retour */}
    <button
      onClick={() => (window.location.href = 'https://ppexclusivecars.com/admin')} // Redirection explicite
      className="absolute top-4 left-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Retour
    </button>
      <h1 className="text-3xl font-bold text-center mb-2">Catalogue</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {catalogueItems.map((item) => (
          <li key={item.Num} className="items-center border p-4 rounded flex flex-col h-full">
            <img src={item.Image} alt={item.Nom} className="w-24 h-24 object-cover mb-2 rounded" />
            <p className="font-bold text-lg">{item.Nom}</p>
            <p className="text-sm text-gray-600 mb-2">
              {item.Description.length > 50 ? `${item.Description.substring(0, 50)}...` : item.Description}
            </p>

            <div className="mt-auto flex flex-col items-center">
              <p className="text-gray-800">{item.Brand} {item.Model}</p>
              <p className="text-yellow-500 font-semibold">{item.Price}</p>
              <p className="text-gray-600 text-sm">{item.Kilometers} km</p>
              <button
                onClick={() => handleDeleteItem(item.Num)}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Supprimer"}
              </button>
              <button
                onClick={() => handleArchiveItem(item.Num)}
                className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Archiver"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
